-- Migration: Auto-create user profile on signup
-- This fixes the foreign key constraint violation when creating capsules

-- Function to automatically create user profile when auth user is created
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, username, avatar_url)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'username',
      new.email,
      'user_' || substring(new.id::text from 1 for 8)
    ),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
exception
  when unique_violation then
    -- If username already exists, append random suffix
    insert into public.users (id, username, avatar_url)
    values (
      new.id,
      coalesce(new.email, 'user_' || substring(new.id::text from 1 for 8)) || '_' || substring(gen_random_uuid()::text from 1 for 4),
      new.raw_user_meta_data->>'avatar_url'
    );
    return new;
end;
$$ language plpgsql security definer;

-- Trigger on auth.users table
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill existing auth users that don't have profiles
insert into public.users (id, username, avatar_url)
select 
  au.id,
  coalesce(
    au.raw_user_meta_data->>'username',
    au.email,
    'user_' || substring(au.id::text from 1 for 8)
  ) as username,
  au.raw_user_meta_data->>'avatar_url' as avatar_url
from auth.users au
left join public.users pu on pu.id = au.id
where pu.id is null
on conflict (id) do nothing;
