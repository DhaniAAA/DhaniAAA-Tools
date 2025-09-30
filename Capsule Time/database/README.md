# Database Setup (Supabase)

Ikuti langkah berikut untuk menerapkan skema database sesuai `database/schema.sql`.

## 1. Prasyarat

- Proyek Supabase sudah dibuat (`https://app.supabase.com`).
- Peran *authenticated* dan *anon* tersedia (default Supabase).
- CLI Supabase terpasang (opsional) atau akses ke SQL editor dashboard.

## 2. Eksekusi Skema

1. Buka Supabase SQL Editor.
2. Salin seluruh isi `database/schema.sql` dan jalankan.
3. Pastikan extension `uuid-ossp` dan `pgcrypto` aktif.

## 3. Bucket Storage

- Buat bucket bernama `capsule-media` dengan opsi `Private`.
- Aktifkan aturan RLS default dan gunakan signed URL dari frontend (`utils/media.js`).

## 4. Policy Tambahan

Untuk akses shared token melalui Edge Function atau API publik, tambahkan fungsi *RPC* atau view yang memverifikasi token unik bila dibutuhkan. Kebijakan dasar yang disediakan mencakup:

- `public.users`: semua bisa baca, hanya pemilik bisa insert/update.
- `public.capsules`: pemilik bisa CRUD penuh; shared via token; public tampil setelah `unlock_at` lewat.
- `public.reactions`: satu reaksi per kapsul per user.

Jika Anda ingin mengizinkan akses feed publik tanpa autentikasi MVC, tambahkan policy khusus pada view `public.public_capsules` atau gunakan Supabase Edge Function sebagai proxy.

## 5. Edge Function Scheduler

- Gunakan fungsi `check-unlockable-capsules` untuk memeriksa kapsul yang `unlock_at <= now` dan belum `is_opened`.
- Jadwalkan via cron eksternal (GitHub Actions, Upstash, dsb.).
- Update `capsule_open_events` (opsional) untuk logging.

## 6. Seed Data (Opsional)

Contoh sederhana:
```sql
insert into public.users (id, username)
values ('00000000-0000-0000-0000-000000000001', 'demo_user');

insert into public.capsules (user_id, title, content_text, mode, unlock_at)
values (
  '00000000-0000-0000-0000-000000000001',
  'Contoh Kapsul',
  'Halo dari masa lalu! 👋',
  'private',
  timezone('utc', now()) + interval '1 day'
);
```

Hapus data seed sebelum produksi.

## 7. Monitoring & Audit

Pertimbangkan menambahkan tabel logging (misal `capsule_views`, `reaction_aggregates`) sesuai roadmap fase lanjutan.
