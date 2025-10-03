alter table public.rooms enable row level security;
alter table public.profiles enable row level security;
alter table public.messages enable row level security;
alter table public.reactions enable row level security;
alter table public.reports enable row level security;

create policy "rooms readable" on public.rooms
  for select using (true);

create policy "profiles readable" on public.profiles
  for select using (true);

create policy "profiles self insert" on public.profiles
  for insert with check (auth.uid() = user_id);

create policy "profiles self update" on public.profiles
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "messages readable" on public.messages
  for select using (
    deleted_at is null
    and (
      is_shadow_hidden = false
      or user_id = auth.uid()
    )
  );

create policy "messages insert" on public.messages
  for insert with check (
    auth.uid() = user_id
    and not exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid()
        and p.is_shadow_banned = true
    )
  );

create policy "messages update self" on public.messages
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "messages admin" on public.messages
  for update using (
    exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid()
        and p.alias in ('Admin', 'Moderator')
    )
  );

create policy "reactions readable" on public.reactions
  for select using (true);

create policy "reactions upsert" on public.reactions
  for insert with check (auth.uid() = user_id);

create policy "reports readable" on public.reports
  for select using (
    reporter_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid()
        and p.alias in ('Admin', 'Moderator')
    )
  );

create policy "reports create" on public.reports
  for insert with check (auth.uid() = reporter_id);

create policy "reports update" on public.reports
  for update using (
    exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid()
        and p.alias in ('Admin', 'Moderator')
    )
  );
