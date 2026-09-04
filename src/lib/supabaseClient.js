import { createClient } from "@supabase/supabase-js";

// Trim in case the values were pasted into Vercel with a stray space or
// newline, and drop any trailing slash on the URL.
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL ?? "").trim().replace(/\/+$/, "");
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? "").trim();

export const isSupabaseConfigured =
  /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(supabaseUrl) &&
  supabaseAnonKey.length > 40;

if (!isSupabaseConfigured) {
  console.warn(
    "[survey] Supabase is not configured correctly. " +
      "VITE_SUPABASE_URL seen as: " +
      JSON.stringify(supabaseUrl) +
      " ; anon key length: " +
      supabaseAnonKey.length +
      ". Set both in your .env (local) or Vercel Environment Variables, then rebuild."
  );
}

// Placeholder so the app still renders when the keys are missing. Any write
// returns a clear error instead of throwing.
function makeStub() {
  const notConfigured = {
    error: {
      message:
        "The survey database is not configured. Set VITE_SUPABASE_URL and " +
        "VITE_SUPABASE_ANON_KEY, then rebuild.",
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
