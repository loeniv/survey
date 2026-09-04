# Ethical Perception Index — survey app

Survey for a master's thesis: participants watch short robot-interaction video
clips and rate each one. Built with Vite + React, answers stored in Supabase.

- **Setup & how-to:** see [ANLEITUNG.md](ANLEITUNG.md) (German).
- **Survey content** (questions, videos, texts): `src/data/survey.js`.

## Run locally

```
npm install
npm run dev
```

Needs a `.env` file (copy `.env.example`) with:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## Build

```
npm run build      # output in dist/
```

## Deploy

Vercel (framework preset: Vite). Set `VITE_SUPABASE_URL` and
`VITE_SUPABASE_ANON_KEY` as Environment Variables in the Vercel project.
Videos are served from a Cloudflare R2 bucket (see `VIDEO_BASE` in
`src/data/survey.js`).
