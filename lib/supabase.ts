import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
  );
}

/**
 * Browser-side Supabase client.
 * Uses the anon key and public URL — safe to expose to the client.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Server-side Supabase client.
 * Uses the service role key for privileged operations (admin, webhooks, etc.).
 * Falls back to the anon key if the service role key is not set.
 */
export function createServerSupabaseClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return createClient(supabaseUrl, serviceRoleKey ?? supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });
}

export type SupabaseClient = ReturnType<typeof createClient>;
