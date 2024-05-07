"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

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

async function getLogs() {
  const url = new URL(`${BASE_URL}/logs`);
  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    const msg = await response.text();
    throw new Error(msg);
  }

  return response.json();
}

async function getRecentLogs() {
  const response = await getLogs();

  if (!response || !response.data || !Array.isArray(response.data.logs)) {
    throw new Error("An error occurred while fetching recent logs");
  }

  const logs = response.data.logs.reverse().splice(0, 20);

  return logs;
}

revalidatePath("/");

export { createLog, getLogs, getRecentLogs };
