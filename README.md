# 🎵 BeatForge

An online drum machine and beat sequencer with real-time collaboration. Create, share, and discover beats powered by Next.js, Tone.js, and Supabase.

## Features

- **16-step sequencer** with 5 instruments: kick, snare, hi-hat, bass, and melody
- **Adjustable BPM** and per-track volume controls
- **Save & share beats** — every beat gets a shareable URL
- **Real-time activity feed** via Supabase Realtime — see beats created, played, and liked live
- **Beat library** — browse and play beats created by others

## Tech Stack

- [Next.js 16](https://nextjs.org) — App Router, Server Components
- [Tone.js](https://tonejs.github.io) — Web Audio synthesis and scheduling
- [Zustand](https://zustand-demo.pmnd.rs) — sequencer state management
- [Supabase](https://supabase.com) — database, auth, and realtime
- [Tailwind CSS v4](https://tailwindcss.com) — styling
- [Framer Motion](https://www.framer.com/motion) — animations

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

### Setup

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Copy the environment file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Create the `beats` table in your Supabase project:

```sql
create table beats (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  creator text not null,
  bpm integer not null,
  pattern jsonb not null,
  settings jsonb not null,
  plays integer default 0,
  likes integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

4. Enable Realtime on the `beats` table in the Supabase dashboard.

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start creating beats.

## Project Structure

```
app/
  page.tsx              # Home — featured beats + live activity feed
  create/page.tsx       # Beat sequencer / creator
  beats/page.tsx        # Beat library
  beats/[id]/page.tsx   # Individual beat page
  api/beats/            # API routes
components/
  sequencer/            # Sequencer UI (tracks, steps, controls, save modal)
  beats/                # Beat playback component
  realtime/             # Live activity feed
  ui/                   # Shared UI components
lib/
  audio/audioEngine.ts  # Tone.js synth engine
  store/sequencerStore  # Zustand state
  supabase/             # Supabase clients (server, client, route handler)
  types/sequencer.ts    # Shared TypeScript types
hooks/
  useAudioEngine.ts     # Audio engine React hook
public/samples/         # WAV samples (kick, snare, hihat, bass, synth)
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
