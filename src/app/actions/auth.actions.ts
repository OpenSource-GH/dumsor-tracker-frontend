"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`;

async function continueWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (error) {
    throw new Error(`${error}`);
  }

  if (data.url) {
    redirect(data.url);
  }
}

async function signOut() {
  const supabase = await createClient();

  let redirectPath: string | null = null;
  try {
    await supabase.auth.signOut();
    redirectPath = `/sign-in`;
  } catch (error) {
    throw new Error(`${error}`);
  } finally {
    if (redirectPath) redirect(redirectPath);
  }
}

async function getCurrentUser() {
  const supabase = await createClient();

  const user = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return user;
}

type SignInWithCredentialsPayload = {
  email: string;
  password: string;
}

async function signInWithCredentials(payload: SignInWithCredentialsPayload) {
  const url = new URL(`${BASE_URL}/login`);
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload)
  });

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(msg);
    }

  return response.json();
}

export { continueWithGoogle, getCurrentUser, signOut, signInWithCredentials };

