# Anonymous World Chat

Anonymous World Chat is a lightweight, privacy-preserving realtime chat crafted from the PRD in `docs/PRD.md`. Users join with a simple alias, hop into mood-based rooms, and talk without sacrificing anonymity. Supabase powers authentication, storage, and realtime events while any static host can serve the frontend.

## Features

- Anonymous sign-in using Supabase Auth anonymous sessions.
- Mood-based chat rooms with realtime updates.
- Persistent messages with alias snapshots and soft delete moderation.
- Client-side rate limiting and regex-based content filtering.
- Local mute/block list and per-message reporting.
- Optional admin panel guarded by a configurable token for reviewing reports.
- Thumbs-up reaction support ready for future expansion.

## Getting Started

1. **Clone & install dependencies**

   This project is HTML/CSS/JS only, so there are no runtime dependencies. Serve it with any static server.

2. **Configure Supabase**

   - Create a new Supabase project.
   - Enable **Anonymous sign-in** under Authentication -> Providers to avoid the "Anonymous sign-in is disabled" banner.
   - Run the SQL files in order:
     - `database/schema.sql`
     - `database/policies.sql`
     - `database/seed.sql`
   - In the SQL editor, ensure the `gen_random_uuid()` function is available by enabling the `pgcrypto` extension (included in `schema.sql`).

3. **Add environment variables**

   - Duplicate `src/scripts/config.example.js` to `src/scripts/config.js` (keep it out of version control if you prefer) and fill in:
     - `SUPABASE_URL`
     - `SUPABASE_ANON_KEY`
     - Optionally tweak rate limiting, content filters, and the admin token.

4. **Serve locally**

   Use any static server (Vite preview, `npx serve`, Python http server, etc.). Ensure the site is served over HTTPS if you are testing on a domain so Supabase cookies persist.

5. **Deploy**

   - Deploy the `src` assets to Vercel or any static host.
   - Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` as environment variables at build time if you plan to generate `config.js`, or keep the static `src/scripts/config.js` file bundled.

## Project Structure

```
Anonymous-World-Chat/
+-- database/
¦   +-- schema.sql
¦   +-- policies.sql
¦   +-- seed.sql
+-- docs/
¦   +-- PRD.md
+-- src/
¦   +-- assets/
¦   ¦   +-- globe-chat.svg
¦   +-- page/
¦   ¦   +-- index.html
¦   +-- scripts/
¦   ¦   +-- app.js
¦   ¦   +-- config.example.js
¦   ¦   +-- config.js
¦   ¦   +-- config.example-guard.js
¦   +-- style/
¦       +-- styles.css
+-- README.md
```

## Moderation & Privacy Notes

- No IP addresses or personal identifiers are stored.
- Messages retain an alias snapshot for historical consistency.
- Soft delete keeps moderation reversible while hiding content from clients.
- Shadow bans can be toggled via the `is_shadow_banned` column in `profiles`; affected users still see their own messages.
- Client-side rate limiting prevents casual spam (default 10 messages per 30 seconds).

## Roadmap Suggestions

- Add emoji picker and multi-reaction support using the `reactions` table.
- Implement threaded replies UI with message quoting.
- Expand content filters into a centralized rule engine or connect to a trust & safety provider.
- Integrate language auto-translation for cross-cultural chats.

Happy shipping!
