# Micro-Time Capsule

Implementasi awal aplikasi web ringan sesuai PRD `Capsule Time/PRD.md`. Fokus pada MVP berbasis frontend statis dengan integrasi Supabase.

## Struktur Folder

- **`src/pages/`**: Halaman utama (`index.html`, `dashboard.html`, `create.html`, `capsule-detail.html`, `public-feed.html`).
- **`src/components/`**: Komponen DOM vanilla reusable (`CapsuleCard.js`, `CountdownTimer.js`, `OpeningAnimation.js`, `ReactionButtons.js`).
- **`src/scripts/`**: Logic per halaman (`dashboard.js`, `create.js`, `capsule-detail.js`, `public-feed.js`) + konfigurasi Tailwind (`tailwind-config.js`) dan contoh env (`env.example.js`).
- **`src/utils/`**: Helper Supabase, waktu, UI, media, dan notifikasi.
- **`src/styles/`**: Styling global tambahan.
- **`src/assets/`**: Favicon SVG.

## Konfigurasi Supabase

1. **Setup Environment Variables**:
   - Copy `src/scripts/env.example.js` menjadi `src/scripts/env.js`
   - Isi `SUPABASE_URL` dan `SUPABASE_ANON_KEY` dengan credentials dari Supabase dashboard
   - **PENTING**: File `env.js` sudah ada di `.gitignore` - jangan commit file ini!

2. **Database Setup**:
   - Jalankan SQL schema dari `database/schema.sql` di Supabase SQL Editor
   - Jalankan migration dari `database/migrations/001_add_user_profile_trigger.sql` untuk auto-create user profiles

3. **Storage Setup**:
   - Buat bucket bernama `capsule-media` (case-sensitive, harus persis)
   - Set bucket sebagai **Private**
   - Tambahkan storage policies (lihat `docs/supabase-setup.md`)

4. **Troubleshooting**:
   - Lihat `docs/supabase-setup.md` untuk panduan lengkap
   - Jika ada error foreign key constraint, pastikan migration user profile sudah dijalankan
   - Jika error "Bucket not found", pastikan nama bucket persis `capsule-media`

## Pengembangan Lokal

1. Gunakan server statis (mis. `npx serve src` atau ekstensi Live Server VS Code).
2. Sertakan `env.js` melalui `<script src="../scripts/env.js"></script>` di setiap halaman bila dibutuhkan, atau sisipkan inline sebelum modul utama.
3. Tailwind memanfaatkan CDN dengan konfigurasi runtime via `tailwind-config.js`.

## Fitur MVP

- Autentikasi email/password via Supabase di `dashboard.html`.
- CRUD create kapsul (teks + opsional media) via `create.html`.
- Countdown client-side dan gating akses di `capsule-detail.html`.
- Feed publik dengan reaksi dasar di `public-feed.html`.
- Utilitas toast, countdown, signed URL, notifikasi trigger stub.

## Langkah Lanjutan

- **Edge Function & Cron**: Implementasi `check-unlockable-capsules` untuk auto-update `is_opened` dan kirim email Resend.
- **Reaksi**: Tambahkan agregasi jumlah reaksi per kapsul + pembatasan satu reaksi per user (constraint DB + UI state).
- **Validasi Form**: Tambah preview media dan batasan format.
- **Enkripsi Opsional**: Tambahkan layer AES-GCM sisi klien sesuai roadmap fase 3.
- **Testing**: Integrasi Playwright/Cypress untuk e2e dasar (auth + create + view kapsul).
