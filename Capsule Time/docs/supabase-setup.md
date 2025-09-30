# Supabase Setup Notes

## 1. Email Confirmation Autoverify Behavior

- Pastikan opsi `Enable email confirmations` aktif.
- Jika menggunakan templat email kustom, verifikasi domain pengirim.
- Cek tab **Policies → Auth** untuk rule yang menandai `email_confirmed_at` otomatis (default Supabase akan menetapkan nilai hanya setelah user klik tautan).
- Pastikan environment `SUPABASE_ANON_KEY` tidak memiliki hak elevated; gunakan anon key, bukan service key, di frontend.

## 2. User Profile Auto-Creation (CRITICAL)

**Masalah**: Saat user signup via Supabase Auth, mereka hanya ditambahkan ke `auth.users`, bukan `public.users`. Ini menyebabkan foreign key constraint violation saat membuat capsule.

**Solusi**: Jalankan migration berikut di **SQL Editor** Supabase:

```bash
# File: database/migrations/001_add_user_profile_trigger.sql
```

Migration ini akan:
- Membuat trigger yang otomatis menambahkan user ke `public.users` saat signup
- Backfill semua user yang sudah ada di `auth.users` tapi belum ada di `public.users`

## 3. Storage Bucket "capsule-media" (CRITICAL)

**Masalah**: Bucket `capsule-media` belum dibuat, menyebabkan error "Bucket not found" saat upload.

**Solusi**:
1. Buka **Storage → Buckets** di dashboard Supabase
2. Klik **New Bucket**
3. Nama: `capsule-media` (case sensitive, harus persis seperti ini)
4. Set **Public bucket**: OFF (Private)
5. Klik **Create bucket**

### Storage Policy (Required)

Setelah bucket dibuat, tambahkan policy di **Storage → Policies** untuk bucket `capsule-media`:

```sql
-- Policy 1: Allow authenticated users to upload their own files
create policy "Users can upload their media"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'capsule-media' and
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy 2: Allow users to read their own files
create policy "Users can read their media"
on storage.objects for select
to authenticated
using (
  bucket_id = 'capsule-media' and
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy 3: Allow users to delete their own files
create policy "Users can delete their media"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'capsule-media' and
  (storage.foldername(name))[1] = auth.uid()::text
);

## 4. Testing Checklist

- **Registrasi**: daftar user baru → cek apakah email verifikasi diterima. Jika belum, kirim ulang via dashboard atau CLI.
- **Login tanpa verifikasi**: jika user bisa login tanpa verifikasi, aktifkan email confirmations dan ulangi pengujian.
- **Upload media**: di halaman `create.html`, unggah file kecil. Jika error "Bucket not found", validasi nama bucket dan akses Supabase Storage (console log pada `create.js`).
- **Signed URL**: buka kapsul yang berisi media untuk memastikan `getSignedMediaUrl()` (`utils/media.js`) bekerja.

## 5. Edge Function Reminder

- `notificationService.js` mengasumsikan Edge Function `check-unlockable-capsules` tersedia. Buat function dan endpoint sebelum memanggilnya dari frontend.
