insert into public.rooms (slug, name, description)
values
  (''happy'', ''Happy'', ''Share upbeat vibes and small wins from your day.''),
  (''vent'', ''Curhat Sedih'', ''A safe corner to vent and find empathy.''),
  (''serious'', ''Diskusi Serius'', ''Thoughtful debates. Challenge ideas, not people.'')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  is_active = true;
