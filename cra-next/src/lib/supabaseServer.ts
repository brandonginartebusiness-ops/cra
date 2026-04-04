import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Server-only client — uses service role key, never exposed to the browser.
// Only import this from API routes or server components, never from client components.
function getServerClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      `Supabase server client not configured — missing ${!url ? 'NEXT_PUBLIC_SUPABASE_URL' : ''} ${!key ? 'SUPABASE_SERVICE_ROLE_KEY' : ''}`.trim()
    );
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

let _serverClient: SupabaseClient | null = null;

export const supabaseServer = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    if (!_serverClient) _serverClient = getServerClient();
    const value = Reflect.get(_serverClient, prop, receiver);
    return typeof value === 'function' ? value.bind(_serverClient) : value;
  },
});
