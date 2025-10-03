# 📄 Product Requirement Document (PRD)

## 1. Konsep Inti

- **Anonymous World Chat** adalah aplikasi obrolan global berbasis web.
- User cukup masuk dengan **nama/alias** tanpa registrasi email/password.
- Obrolan dibagi dalam beberapa **room** berbasis mood/topik (misalnya: Happy, Curhat Sedih, Diskusi Serius).
- Semua pesan **disimpan permanen**, tetapi identitas user tetap anonim.
- **Tidak ada informasi pribadi maupun IP address yang disimpan**.
- Aplikasi ringan, cepat diakses, dan dapat dipakai siapa saja di seluruh dunia.

---

## 2. Privasi & Anonimitas

- **Tidak menyimpan IP address** di database maupun log aplikasi.
- **Tidak ada email/password** → login hanya dengan alias atau alias otomatis (GuestXXXX).
- Identitas user hanya berupa **UUID** dari Supabase Auth Anonymous.
- **Alias snapshot** disimpan dalam setiap pesan agar historis tetap konsisten meskipun user mengganti alias.
- Tidak ada tracking fingerprint atau data identitas perangkat, hanya session token.

---

## 3. Moderasi & Keamanan

- **Moderasi User:**

  - User bisa **melaporkan pesan** (report) dengan alasan tertentu.
  - User bisa **block/mute** user lain (lokal, client-side).

- **Moderasi Admin:**

  - Admin dapat **menghapus pesan** dengan soft delete (`deleted_at`).
  - Admin panel sederhana untuk melihat report terbuka.

- **Keamanan Chat:**

  - **Rate limiting per session** → mencegah spam (misalnya 10 pesan/30 detik).
  - **Shadow-ban opsional** → spammer tetap melihat pesannya sendiri, tapi tidak ditampilkan ke orang lain.
  - **Konten filter sederhana** (regex untuk spam, link berbahaya, atau kata kasar).

---

# 🛠️ Technical Design Document (TDD)

## 1. Arsitektur Sistem

- **Frontend (Vercel)**

  - HTML, CSS, JS vanilla.
  - Supabase JS SDK untuk auth + realtime.

- **Backend (Supabase)**

  - Auth: **Anonymous Sign-in**.
  - DB: Postgres dengan tabel rooms, profiles, messages, reactions, reports.
  - **Supabase Realtime** untuk broadcast event chat.
  - **Row Level Security (RLS)** aktif untuk semua tabel.

---

## 2. Data Model (Tambahan Aspek Privasi)

- **profiles** → hanya menyimpan `user_id` dan `alias`.
- **messages** → tidak ada kolom IP, hanya `user_id` + `alias_snapshot`.
- **reports** → berisi `reporter_id` + `reason`, tidak ada data device/IP.

---

## 3. Privasi & Anonimitas (Tanpa IP)

- **Session**: setiap login anon di Supabase akan mendapat UUID unik.
- **Alias**: disimpan di `profiles`.
- **Pesan**: hanya menyimpan `user_id` + `alias_snapshot`.
- **Tidak ada IP logging**: baik di DB maupun di frontend.
- **Cookie**: hanya untuk session token (Supabase default).

---

## 4. Moderasi & Keamanan

- **Rate limiting**: diterapkan di sisi frontend (JS throttle) + opsional di edge function (serverless) jika butuh validasi lebih.
- **Soft delete**: pesan tidak dihapus total, hanya diberi `deleted_at`.
- **Report**: user bisa insert ke tabel `reports`. Admin memutuskan tindak lanjut.
- **Content filter**: sebelum pesan dikirim → jalankan regex untuk kata kasar/spam.
- **Shadow-ban (opsional)**: tambahkan kolom `is_shadow_banned` di profiles, sehingga pesan dari user itu tidak dikirim ke orang lain.

---

## 5. Flow Utama

1. **Login Anonim** → user masuk hanya dengan alias.
2. **Masuk Room** → pilih room dari list.
3. **Chat** → kirim pesan (persisten, realtime).
4. **Reply & Reaction** → thread sederhana & reaksi emoji.
5. **Moderasi** → user bisa report; admin bisa soft delete pesan.

---

## 6. Deployment

- **Frontend** → deploy ke Vercel (static hosting).
- **Supabase** → Auth, DB, Realtime.
- **Environment Variables** di Vercel: `SUPABASE_URL` & `SUPABASE_ANON_KEY`.

---

## 7. Roadmap

- **MVP**: login anon, room default, chat realtime, persist pesan, report, moderasi admin.
- **Next**: reactions emoji, reply/thread, global feed, badge user, auto-translate.

---
