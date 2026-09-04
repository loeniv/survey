# Anleitung: Deine Simulations-Umfrage einrichten

Diese App ist fertig gebaut. Du musst nur noch drei Dinge tun: (1) die Datenbank
anlegen, (2) deine Videos und Fragen eintragen, (3) online stellen.

## 1. Lokal starten (zum Testen auf deinem Rechner)

1. Öffne den Ordner `umfrage-app` in VS Code.
2. Öffne das eingebaute Terminal (Menü *Terminal → New Terminal*).
3. Führe aus:
   ```
   npm install
   npm run dev
   ```
4. VS Code zeigt dir eine lokale Adresse an (meist `http://localhost:5173`).
   Öffne sie im Browser — du siehst die Umfrage mit den Beispiel-Fragen.

## 2. Supabase einrichten (Antworten-Speicher)

1. Gehe zu supabase.com und lege ein neues Projekt an (falls noch nicht geschehen).
2. Öffne im Supabase-Dashboard links **SQL Editor → New query**.
3. Kopiere den kompletten Inhalt der Datei `supabase_schema.sql` aus diesem
   Projekt hinein und klicke **Run**. Das legt die Tabelle für die Antworten an.
4. Gehe zu **Project Settings → API**. Dort findest du zwei Werte:
   - *Project URL*
   - *anon public key*
5. Erstelle in deinem Projektordner eine Datei `.env` (Kopie von `.env.example`)
   und trage dort deine beiden Werte ein.
6. Starte `npm run dev` neu, damit die neuen Werte geladen werden.

> **Hinweis:** Die App-Oberfläche und alle Fragen sind auf **Englisch**
> (Titel „Ethical Perception Index"), aufgebaut aus deinem LimeSurvey-Export.
> Die einzige Datei, die du für Inhalte anfassen musst, ist
> `src/data/survey.js`. Die Frage-Codes (Q001, SQ001, …) sind identisch zu
> LimeSurvey, damit die gespeicherten Daten zu deinem Codebook passen.

## 3. Videos

Alle 13 Clips liegen auf **Cloudflare R2** und werden von dort gestreamt –
lokal wie im Deploy. In `src/data/survey.js` steht dafür oben im Video-Block:
```js
const VIDEO_BASE =
  "https://pub-7d29a674a3ed479ba3d497bb7504ae01.r2.dev/00_final_videos";
```
Die 13 Datei-URLs bauen sich daraus zusammen. Willst du zurück auf lokale
Dateien: `VIDEO_BASE = "/videos"` setzen und die `.mp4` wieder nach
`public/videos/` legen. (Die Originale liegen weiter in
`Masterarbeit/Simulations/00_final_videos/`.)

- **Reihenfolge:** `baseline` kommt immer zuerst. Die anderen 12 Clips werden
  **pro Teilnehmer:in neu zufällig gemischt** (Fisher–Yates, einmal pro
  Seitenaufruf), damit die Reihenfolge das Ergebnis nicht beeinflusst.
- **Welche Position jemand gesehen hat**, wird mitgespeichert: pro Video eine
  Zeile mit `question_id = "presentation_order"` und `answer = 1..13`. So
  kannst du Reihenfolge-/Ermüdungseffekte prüfen.
- **`id`** jedes Clips wird als `video_id` gespeichert – daran erkennst du die
  Bedingung (`safety_minus`, `trust_plus`, …).
- **Abspiellimit** (3× pro Video): zentral in `surveyConfig.maxVideoPlays`.

## 3a. Videos auf Cloudflare R2 — *erledigt* (Referenz zum Nachschlagen)

Der Bucket ist eingerichtet und in der App verdrahtet. Falls du ihn neu
aufsetzen oder Dateien austauschen musst, hier die Schritte:

1. **Account:** auf [cloudflare.com](https://cloudflare.com) registrieren, im
   Dashboard links **R2** öffnen. Beim ersten Mal musst du eine Kreditkarte
   hinterlegen – es fällt aber nichts an: R2 hat 10 GB Speicher frei und
   **kostenlosen Traffic** (kein Egress-Preis wie bei AWS S3).
2. **Bucket anlegen:** *Create bucket*, Name z. B. `umfrage-videos`, Region
   *Automatic*.
3. **Dateien hochladen:** in den Bucket gehen → *Upload* → die 13 `.mp4`-Dateien
   aus `umfrage-app/public/videos/` per Drag & Drop reinziehen. Die Dateinamen
   müssen **exakt gleich bleiben** (`baseline_LV.mp4` usw.).
4. **Öffentlich machen:** Bucket → *Settings* → *Public access* →
   *R2.dev subdomain* → **Allow**. Du bekommst eine Adresse wie
   `https://pub-abc123def456.r2.dev`. (Für eine Studie völlig ausreichend;
   Cloudflare drosselt diese Subdomain leicht, für Produktions-Traffic gäbe es
   „Custom Domain" – brauchst du hier nicht.)
5. **In der App eintragen:** in `src/data/survey.js` ganz oben bei den Videos
   nur die eine Zeile ändern:
   ```js
   const VIDEO_BASE = "https://pub-abc123def456.r2.dev";
   ```
   (statt `"/videos"`). Fertig – alle 13 URLs bauen sich daraus zusammen.
6. **Testen:** `npm run dev`, eine URL wie
   `https://pub-…r2.dev/baseline_LV.mp4` einmal direkt im Browser öffnen –
   wenn das Video lädt, passt es auch in der Umfrage.

Wenn du bei Schritt 3 nicht per Dashboard hochladen willst (13 Dateien gehen
aber gut von Hand), sag Bescheid – dann zeige ich dir den Upload per
`rclone`/`wrangler`.

## 4. Fragen anpassen

Alles steht in `src/data/survey.js`, in Blöcken (in dieser Reihenfolge):

- **`surveyConfig`**:
  - `intro` = **Seite 1** (Hinführung zum Thema).
  - `practical` = **Seite 2** (praktische Hinweise, steht über den Consent-Häkchen).
  - `consent` = die kurze Zeile im Kasten auf Seite 1.
  - `endText`, `seriousCheckLabel`, `discardConfirmText`, `maxVideoPlays`.
  - Interesse-Sektion: `interestHeading`, `interestText`, `contactEmail`,
    `contactSubject`, `contactBody`.
- **`consentStep`**: die zwei Pflicht-Häkchen.
- **`demographicStep`**: Alter, Geschlecht, Land, Status, Fachrichtung.
  Land/Status/Fachrichtung haben `allowOther: true` → „Other"-Option öffnet
  ein Textfeld; der eingetippte Text wird als Antwort gespeichert.
- **`introStep`**: zwei Slider-Blöcke (Typ `grid`, Skala −5 bis +5).
- **`attentionItem`**: die Aufmerksamkeits-Frage. Sie ist **keine eigene
  Seite** und **nicht anders formatiert**, sondern wird als zusätzliche
  Slider-Zeile an **ein** Szenario-Grid gehängt (ca. 2/3 durch, per
  `attentionAt`). In den Daten landet sie als
  `question_id = "Q020::attention_check"` auf der `video_id` dieses Szenarios
  – bei der Auswertung alle rausfiltern, die dort nicht `3` gesetzt haben.
- **`scenarioQuestion` + `videos`**: der 6-Item-Slider-Block nach **jedem**
  Video. Im Fragetext markiert `**wort**` das Schlüsselwort fett
  (z. B. „How **comfortable** did you feel…").
- **`finalStep`**: zwei Freitext-Fragen. Darunter das Häkchen „I did not
  answer seriously" – wenn angehakt, wird **nichts** gespeichert.

**Erklärtexte:** Jeder Schritt/jede Frage kann ein `help: "…"` bekommen,
ein kurzer freundlicher Erklärsatz unter der Überschrift.

**Titel:** Überschriften in `title` / `prompt` in *Title Case* (z. B.
„Prior Knowledge and Experience").

**Keine Gedankenstriche** im Teilnehmer-Text: nur Kommas, Punkte oder
Klammern verwenden.

**Amerikanisches Englisch durchgängig** (z. B. „behavior" nicht „behaviour",
„center" nicht „centre").

**Video:** kein eigener Fullscreen-Knopf (der native Vollbild-Button in der
Video-Steuerung reicht). Läuft auch auf dem Handy (`playsInline`, keine
Zwangs-Vollbild-Wiedergabe auf iOS).

**Wichtig zu den Slidern:** Ein Slider zählt erst als beantwortet, wenn er
bewegt wurde. Unbewegte Slider werden **nicht** gespeichert (nicht als 0).

**Video-Abspiellimit:** 3× pro Video, zählt pro Video neu. Der Ausgrau-
Hinweis kommt erst, **nachdem** der 3. Durchlauf komplett zu Ende ist.

## Interesse-Sektion (Realstudie)

Am Ende der Umfrage sehen Teilnehmende zwei Möglichkeiten, Interesse an einer
Realstudie zu zeigen:

1. Ein Mailto-Link, der ihr E-Mail-Programm mit vorausgefülltem Text öffnet
   (Text anpassbar über `contactSubject`/`contactBody` in `surveyConfig`).
2. Ein kleines Formular, das die E-Mail-Adresse direkt in die
   `interest`-Tabelle in Supabase schreibt.

Beide Wege sind bewusst **komplett getrennt** von den Umfrage-Antworten -
die `interest`-Tabelle hat keinerlei Verknüpfung zur `responses`-Tabelle, es
lässt sich also nicht nachvollziehen, welche E-Mail-Adresse zu welchen
Antworten gehört.

## 5. Online stellen (Vercel)

Das Projekt ist bereits ein Git-Repository mit erstem Commit (`main`).

**a) Zu GitHub hochladen**

- GitHub-Account anlegen (falls noch keiner): [github.com](https://github.com).
- Neues **leeres, privates** Repository erstellen (z. B. `umfrage-app`) –
  *ohne* README/`.gitignore` ankreuzen.
- Den lokalen Ordner mit dem Repo verbinden und pushen. Am einfachsten mit
  **GitHub Desktop** ([desktop.github.com](https://desktop.github.com)):
  *File → Add local repository* → den `umfrage-app`-Ordner wählen →
  *Publish repository* (Häkchen „private" lassen).
  Oder im Terminal:
  ```
  git remote add origin https://github.com/DEIN-NAME/umfrage-app.git
  git push -u origin main
  ```

**b) Bei Vercel deployen**

1. [vercel.com](https://vercel.com) → mit GitHub anmelden.
2. *Add New → Project* → dein Repository importieren. Framework wird
   automatisch als **Vite** erkannt (Build `npm run build`, Output `dist`).
3. **Environment Variables** aufklappen und zwei Einträge anlegen – exakt die
   Werte aus deiner lokalen `.env`:
   - `VITE_SUPABASE_URL` = `https://jeunhyetjdxswfrhptyr.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = (der lange `eyJ…`-Key aus `.env`)
4. **Deploy** klicken. Nach ~1 Minute bekommst du einen Link
   (`xyz.vercel.app`).

**c) Nach dem Deploy**

- Live-Link einmal komplett durchklicken und abschicken.
- In Supabase (*Table Editor*) prüfen, dass die Zeilen ankommen, dann die
  Testdaten löschen: `truncate table responses;` und
  `truncate table interest;`.
- Link umbenennen (falls gewünscht): Vercel → *Settings → Domains*. **Vor** dem
  Verteilen an Teilnehmende machen – ein bereits verschickter Link bricht sonst.

**Änderungen später:** einfach `git push` (bzw. in GitHub Desktop *Push
origin*) – Vercel deployt automatisch neu.

**d) Wenn beim Abschicken „Something went wrong" kommt**

Meistens fehlen die Environment Variables im Build. Vite backt die
`VITE_…`-Werte **beim Bauen** ein – wurden sie erst *nach* dem ersten Deploy
gesetzt, kennt die Live-Version sie nicht.

1. Vercel → Projekt → *Settings → Environment Variables*: beide Einträge
   (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) da, Häkchen bei
   **Production** (am besten alle drei).
2. Dann *Deployments* → beim neuesten oben rechts **⋯ → Redeploy** (oder
   einmal in GitHub Desktop pushen). Erst der Build *nach* dem Setzen der
   Variablen enthält sie.

Die neue Fehlerseite zeigt jetzt auch die technische Meldung an – falls es
was anderes ist, schick mir einen Screenshot davon.

## Antworten später auswerten

Im Supabase-Dashboard unter **Table Editor → responses** siehst du alle
gesammelten Antworten live. Über die drei Punkte oben rechts kannst du die
Tabelle jederzeit als CSV exportieren, z. B. für Excel oder SPSS.

---
Wenn du bei einem der Schritte nicht weiterkommst, schick mir einfach eine
Fehlermeldung oder einen Screenshot — dann schauen wir gemeinsam weiter.
