"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function continueWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "/auth/callback",
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

export { continueWithGoogle, getCurrentUser, signOut };

