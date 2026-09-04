import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    "Supabase ist noch nicht konfiguriert. Bitte VITE_SUPABASE_URL und VITE_SUPABASE_ANON_KEY in deiner .env Datei setzen (siehe .env.example). " +
      "Die Umfrage läuft trotzdem – Antworten können aber noch nicht gespeichert werden."
  );
}

// Solange keine Zugangsdaten gesetzt sind, geben wir einen Platzhalter zurück,
// damit die App lokal startet. Jeder Schreibversuch liefert einen klaren Fehler.
function makeStub() {
  const notConfigured = {
    error: {
      message:
        "Supabase ist nicht konfiguriert. Lege eine .env Datei mit VITE_SUPABASE_URL und VITE_SUPABASE_ANON_KEY an.",
    },
  };
  return {
    from() {
      return {
        insert: async () => notConfigured,
        select: async () => notConfigured,
      };
    },
  };
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : makeStub();
