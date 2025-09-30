# Quick Fix untuk Error Supabase

## Error 1: Foreign Key Constraint Violation
**Error**: `insert or update on table "capsules" violates foreign key constraint "capsules_user_id_fkey"`

### Penyebab
User yang signup hanya masuk ke `auth.users`, tidak ke `public.users`. Saat membuat capsule, sistem tidak menemukan user di `public.users`.

### Solusi
1. Buka **SQL Editor** di dashboard Supabase
2. Copy-paste seluruh isi file `database/migrations/001_add_user_profile_trigger.sql`
3. Klik **Run**
4. Verifikasi: Cek tabel `public.users` - seharusnya sudah ada data user yang sebelumnya hanya di `auth.users`

---

## Error 2: Bucket Not Found
**Error**: `Bucket not found`

### Penyebab
Storage bucket `capsule-media` belum dibuat di Supabase.

### Solusi

#### Step 1: Buat Bucket
1. Buka **Storage** di sidebar Supabase
2. Klik **New Bucket**
3. Isi form:
   - **Name**: `capsule-media` (harus persis, case-sensitive)
   - **Public bucket**: OFF (unchecked)
4. Klik **Create bucket**

#### Step 2: Tambahkan Storage Policies
1. Pilih bucket `capsule-media` yang baru dibuat
2. Klik tab **Policies**
3. Klik **New Policy** → **For full customization**
4. Tambahkan 3 policy berikut satu per satu:

**Policy 1 - Upload**
```sql
create policy "Users can upload their media"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'capsule-media' and
  (storage.foldername(name))[1] = auth.uid()::text
);
```

**Policy 2 - Read**
```sql
create policy "Users can read their media"
on storage.objects for select
to authenticated
using (
  bucket_id = 'capsule-media' and
  (storage.foldername(name))[1] = auth.uid()::text
);
```

**Policy 3 - Delete**
```sql
create policy "Users can delete their media"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'capsule-media' and
  (storage.foldername(name))[1] = auth.uid()::text
);
```

---

## Verifikasi

Setelah kedua fix diterapkan:

1. **Test Signup**: Daftar user baru → cek apakah otomatis masuk ke `public.users`
2. **Test Create Capsule**: Buat capsule baru dengan/tanpa media
3. **Test Upload**: Upload gambar/video saat membuat capsule

Jika masih ada error, cek:
- Console browser (F12) untuk error detail
- Supabase Dashboard → Logs → API untuk error server-side
