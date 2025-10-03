-- Micro-Time Capsule database schema
-- Supabase/PostgreSQL compatible

-- Enable useful extensions
create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

-- users table (extends Supabase auth users metadata)
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null check (char_length(username) >= 3),
  avatar_url text,
  created_at timestamptz not null default timezone('utc'::text, now())
);

comment on table public.users is 'Profile data synchronized with Supabase auth users';

-- capsules table
create table if not exists public.capsules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text default 'Kapsul Tanpa Judul',
  content_text text,
  media_url text,
  media_type text,
  mode text not null check (mode in ('private', 'shared', 'public')),
  unlock_at timestamptz not null,
  is_opened boolean not null default false,
  shared_token text unique,
  created_at timestamptz not null default timezone('utc'::text, now()),
  opened_at timestamptz,
  constraint shared_token_mode check (
    (mode = 'shared' and shared_token is not null)
    or (mode <> 'shared' and shared_token is null)
  )
);

comment on table public.capsules is 'Time capsules containing text and optional media';

create index if not exists capsules_user_id_idx on public.capsules (user_id);
create index if not exists capsules_unlock_at_idx on public.capsules (unlock_at);
create index if not exists capsules_mode_idx on public.capsules (mode);

-- reactions table
create table if not exists public.reactions (
  id uuid primary key default gen_random_uuid(),
  capsule_id uuid not null references public.capsules(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  reaction_type text not null check (reaction_type in ('💖', '😂', '🤔')),
  created_at timestamptz not null default timezone('utc'::text, now())
);

comment on table public.reactions is 'User reactions to opened capsules';

create unique index if not exists reactions_capsule_user_unique
  on public.reactions (capsule_id, user_id);

create index if not exists reactions_capsule_idx on public.reactions (capsule_id);

-- Helper view for public feed (only unlocked public capsules)
create or replace view public.public_capsules as
select
  c.id,
  c.title,
  c.content_text,
  c.media_url,
  c.media_type,
  c.mode,
  c.unlock_at,
  c.opened_at,
  c.created_at,
  u.username as owner_username
from public.capsules c
join public.users u on u.id = c.user_id
where c.mode = 'public' and coalesce(c.is_opened, false) = true;

comment on view public.public_capsules is 'Unlocked public capsules for feed display';

-- Row-Level Security policies
alter table public.users enable row level security;
alter table public.capsules enable row level security;
alter table public.reactions enable row level security;

-- USERS RLS
create policy "Users are viewable by everyone" on public.users
  for select using (true);

create policy "Users can insert their own profile" on public.users
  for insert with check (auth.uid() = id);

create policy "Users can update their own profile" on public.users
  for update using (auth.uid() = id);

-- CAPSULES RLS
create policy "Capsule owners manage their capsules" on public.capsules
  for all using (auth.uid() = user_id);

create policy "Shared capsules accessible via token" on public.capsules
  for select using (
    mode = 'shared'
    and shared_token is not null
  );

create policy "Public capsules visible after unlock" on public.capsules
  for select using (
    mode = 'public'
    and unlock_at <= timezone('utc'::text, now())
  );

-- REACTIONS RLS
create policy "Reactions viewable per capsule visibility" on public.reactions
  for select using (
    auth.uid() = user_id
    or exists (
      select 1 from public.capsules c
      where c.id = reactions.capsule_id
        and (
          c.user_id = auth.uid()
          or (c.mode = 'public' and c.unlock_at <= timezone('utc'::text, now()))
          or (c.mode = 'shared' and c.shared_token is not null)
        )
    )
  );

create policy "Users insert their reactions" on public.reactions
  for insert with check (auth.uid() = user_id);

-- triggers
create or replace function public.handle_capsule_opened()
returns trigger as $$
declare
  should_open boolean;
begin
  should_open := (new.is_opened = true)
    or (new.unlock_at <= timezone('utc'::text, now()));

  if should_open and new.opened_at is null then
    new.opened_at := timezone('utc'::text, now());
  end if;

  return new;
end;
$$ language plpgsql;

create trigger set_opened_at_before_update
  before update on public.capsules
  for each row
  when (old.opened_at is distinct from new.opened_at or old.is_opened is distinct from new.is_opened)
  execute function public.handle_capsule_opened();

-- cron helper table (optional for scheduler)
create table if not exists public.capsule_open_events (
  capsule_id uuid primary key references public.capsules(id) on delete cascade,
  processed_at timestamptz
);
