# 📄 Technical Design Document (TDD)  
**Produk:** Micro-Time Capsule (Kapsul Waktu Digital)  
**Tanggal:** 23 September 2025  
**Versi:** 1.0  
**Author:** Rhama  

---

## 1. 🧩 Overview

Micro-Time Capsule adalah aplikasi web ringan yang memungkinkan pengguna membuat "kapsul waktu digital" berisi teks, gambar, atau audio, yang hanya dapat dibuka pada tanggal dan waktu yang ditentukan di masa depan. Aplikasi ini mendukung tiga mode visibilitas: **Private**, **Shared (via link)**, dan **Public**. Sistem ini dirancang untuk skalabilitas minimal, keamanan dasar, dan pengalaman pengguna yang emosional dan viral-friendly.

---

## 2. 🏗️ Arsitektur Sistem

### Diagram Arsitektur Tingkat Tinggi

```
[User Browser]
       │
       ▼
[Vercel (Frontend Hosting)]
       │
       ▼
[Supabase Backend]
   ├── Auth (User Identity)
   ├── Database (PostgreSQL)
   ├── Storage (Media: images/audio)
   └── Edge Functions (Notifications, Scheduling)
       │
       ▼
[Resend API] ← Email Notifications
```

### Teknologi Stack

| Komponen        | Teknologi                     |
|-----------------|-------------------------------|
| Frontend        | HTML, CSS, JavaScript (Vanilla), TailwindCSS |
| State Management| LocalStorage + Supabase Realtime (opsional) |
| Backend         | Supabase (PostgreSQL + Auth + Storage) |
| Hosting         | Vercel                        |
| Notifikasi      | Resend (Email), Supabase Edge Functions |
| Scheduling      | Supabase cron-like via Edge Functions + DB polling |
| Keamanan        | Row-Level Security (RLS), UUID-based sharing, AES (opsional) |

---

## 3. 🗃️ Database Schema

### Tabel: `users`
| Kolom         | Tipe           | Keterangan                     |
|---------------|----------------|--------------------------------|
| id            | UUID (PK)      | Supabase Auth UID              |
| username      | TEXT (UNIQUE)  | Wajib, minimal 3 karakter      |
| avatar_url    | TEXT           | Opsional (URL dari Storage)    |
| created_at    | TIMESTAMPTZ    |                                |

> **RLS Policy:**  
> - `SELECT`: public  
> - `INSERT/UPDATE`: hanya user sendiri  

---

### Tabel: `capsules`
| Kolom             | Tipe           | Keterangan |
|-------------------|----------------|------------|
| id                | UUID (PK)      |            |
| user_id           | UUID (FK)      | Pembuat kapsul |
| title             | TEXT           | Opsional (default: "Kapsul Tanpa Judul") |
| content_text      | TEXT           | Isi pesan teks |
| media_url         | TEXT           | URL ke Supabase Storage (opsional) |
| media_type        | TEXT           | `image/jpeg`, `audio/mp3`, dll |
| mode              | TEXT           | `private` \| `shared` \| `public` |
| unlock_at         | TIMESTAMPTZ    | Waktu kapsul bisa dibuka |
| is_opened         | BOOLEAN        | `false` → `true` saat `now() >= unlock_at` |
| shared_token      | TEXT           | UUID v4 (hanya untuk mode `shared`) |
| created_at        | TIMESTAMPTZ    |            |
| opened_at         | TIMESTAMPTZ    | Null → diisi saat dibuka |

> **RLS Policy:**  
> - `private`: hanya `user_id = auth.uid()`  
> - `shared`: hanya bisa diakses via `shared_token`  
> - `public`: semua bisa baca **setelah** `unlock_at`  
> - Insert: hanya user terautentikasi  
> - Update: hanya pembuat  

---

### Tabel: `reactions`
| Kolom         | Tipe      |
|---------------|-----------|
| id            | UUID (PK) |
| capsule_id    | UUID (FK) |
| user_id       | UUID      |
| reaction_type | TEXT      | (`💖`, `😂`, `🤔`) |
| created_at    | TIMESTAMPTZ |

> **Constraint:** Satu user hanya bisa bereaksi sekali per kapsul.

---

## 4. 🔌 API & Integrasi

### Frontend → Supabase Interactions

#### Autentikasi
- Gunakan `supabase.auth.signInWithPassword({ email, password })`  
- Atau `signInWithOAuth('github')` (opsional di masa depan)
- Simpan session di browser (Supabase client handles ini)

#### Membuat Kapsul
```js
const { data, error } = await supabase
  .from('capsules')
  .insert({
    user_id: user.id,
    content_text: "Hai masa depan!",
    mode: "private",
    unlock_at: "2026-09-23T10:00:00Z",
    shared_token: mode === 'shared' ? crypto.randomUUID() : null
  });
```

#### Mengunggah Media
```js
const { data, error } = await supabase.storage
  .from('capsule-media')
  .upload(`${user.id}/${capsuleId}/${file.name}`, file);
```

#### Mendapatkan Kapsul Pribadi
```js
const { data } = await supabase
  .from('capsules')
  .select('*')
  .eq('user_id', user.id)
  .order('unlock_at', { ascending: true });
```

#### Mendapatkan Kapsul Publik (Feed)
```js
const { data } = await supabase
  .from('capsules')
  .select('*')
  .eq('mode', 'public')
  .gte('unlock_at', now) // sudah waktunya
  .order('unlock_at', { ascending: false });
```

#### Membuka Kapsul Shared
```js
const { data } = await supabase
  .from('capsules')
  .select('*')
  .eq('shared_token', token)
  .single();
```

---

## 5. ⏰ Sistem Penjadwalan & Notifikasi

### Masalah: Supabase tidak memiliki scheduler bawaan.

### Solusi: **Polling Ringan + Edge Function**

1. **Edge Function `check-unlockable-capsules`** dijalankan tiap jam via cron eksternal (misal: GitHub Actions, Cron-job.org, atau Upstash).
2. Fungsi ini:
   - Query kapsul dengan `unlock_at <= NOW()` dan `is_opened = false`
   - Update `is_opened = true`, `opened_at = NOW()`
   - Kirim notifikasi ke user via email (gunakan Resend)

### Notifikasi Email (via Resend)
- Template: “Kapsul Waktumu Sudah Bisa Dibuka!”
- Link langsung ke halaman detail kapsul
- Gunakan Supabase Edge Function sebagai trigger

> **Catatan:** Untuk MVP, notifikasi bisa diimplementasi di Phase 3.

---

## 6. 🔒 Keamanan & Privasi

| Fitur                     | Implementasi |
|--------------------------|--------------|
| Private Capsule          | RLS: hanya `user_id = auth.uid()` |
| Shared Capsule           | Akses hanya via UUID unik di URL (`/capsule/s/abc123`) |
| Public Capsule           | Hanya muncul di feed **setelah** `unlock_at` |
| Media Upload             | File disimpan di bucket privat; URL diakses via signed URL atau RLS |
| Enkripsi End-to-End      | **Opsional**: Jika diaktifkan, enkripsi di sisi klien (AES-GCM) sebelum simpan ke DB |
| Rate Limiting            | Gunakan middleware di Edge Function untuk batasi pembuatan kapsul publik (misal: 5/hari/user) |

---

## 7. 🎨 UI/UX Implementation Notes

### Frontend Structure
```
/src
  /components
    - CapsuleCard.js
    - CountdownTimer.js
    - OpeningAnimation.js
    - ReactionButtons.js
  /pages
    - index.html (Landing)
    - dashboard.html
    - create.html
    - capsule-detail.html
    - public-feed.html
  /utils
    - supabaseClient.js
    - timeUtils.js
    - notificationService.js
```

### Animasi Pembukaan
- Gunakan CSS + JavaScript sederhana:
  - Efek "pecah kaca": animasi `clip-path` atau `transform: scale(0)`
  - Suara *pop* opsional (Web Audio API)

### Responsif
- Mobile-first dengan TailwindCSS
- Grid kapsul di dashboard: 1 kolom (mobile), 2–3 kolom (desktop)

---

## 8. 📈 Monitoring & Metrics

### Metrik yang Diukur (via Supabase + Custom Logging)
- `capsules_created_daily`
- `capsules_opened_ratio = opened / total`
- `public_feed_engagement = reactions / views`
- `DAU` (via Supabase Auth logins harian)

> Bisa diintegrasikan dengan Plausible atau Simple Analytics untuk privasi.

---

## 9. 🚧 Roadmap Teknis

| Fase   | Fitur Teknis Utama |
|--------|--------------------|
| **MVP (2 bulan)** | - Supabase Auth + RLS<br>- CRUD kapsul teks<br>- Countdown client-side<br>- Private mode |
| **Phase 2 (4 bulan)** | - Upload media ke Storage<br>- Shared link (UUID)<br>- Public feed (tanpa notifikasi)<br>- Reaksi dasar |
| **Phase 3 (6 bulan)** | - Edge Function scheduler<br>- Email notifikasi (Resend)<br>- Badge & leaderboard (tabel `user_stats`)<br>- Enkripsi opsional |

---

## 10. ⚠️ Risiko & Mitigasi

| Risiko | Mitigasi |
|-------|--------|
| Pengguna lupa akun → kehilangan kapsul | Izinkan login via email (magic link) |
| Kapsul publik disalahgunakan (konten negatif) | Moderasi manual awal + flagging system |
| Waktu server vs client tidak sinkron | Selalu gunakan `unlock_at` dari server; countdown berbasis `new Date(serverTime)` |
| Biaya storage membengkak | Batasi ukuran file (max 5MB), auto-delete media kapsul setelah 1 tahun dibuka |

---

## 11. 📎 Lampiran

- **Supabase Project Setup Guide**  
- **TailwindCSS Config**  
- **Resend API Key Management**  
- **UUID Generation (client-side fallback)**

---

✅ Dokumen ini siap untuk implementasi tim pengembang.  
🔁 Revisi akan dilakukan setelah feedback MVP.