-- Diese Datei in Supabase unter "SQL Editor" -> "New query" einfügen und
-- einmalig ausführen.

-- Tabelle 1: Umfrage-Antworten
create table if not exists responses (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null,
  video_id text,
  question_id text not null,
  answer text,
  created_at timestamptz not null default now()
);

alter table responses enable row level security;

create policy "Allow public insert on responses" on responses
  for insert
  to anon
  with check (true);

-- Tabelle 2: Interesse an der Realstudie.
-- WICHTIG: Bewusst KEINE Spalte, die einen Bezug zu "responses" herstellt
-- (kein participant_id, keine Fremdschlüssel). So ist rein technisch
-- ausgeschlossen, dass eine E-Mail-Adresse einer bestimmten
-- Umfrage-Antwort zugeordnet werden kann.
create table if not exists interest (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now()
);

alter table interest enable row level security;

create policy "Allow public insert on interest" on interest
  for insert
  to anon
  with check (true);
