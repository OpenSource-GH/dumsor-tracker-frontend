"use server";

import { createClient } from "@/utils/supabase/server";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

async function createLog(payload: any) {
  const supabase = await createClient();

  const {
    data: { session: supabaseSession },
  } = await supabase.auth.getSession();

  const url = new URL(`${BASE_URL}/logs`);
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${supabaseSession?.access_token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const msg = await response.text();
    throw new Error(msg);
  }

  return response.json();
}

export { createLog };
