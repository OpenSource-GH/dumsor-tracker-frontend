"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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

async function signOut(): Promise<{error?: string}> {
  let success = false;
  try {
    const res = await fetch("https://api.dumsor.xyz/api/v1/users/losgout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: "", password: ""}),
    });
    if (res.status == 200) {
      success = true;
    }
  } catch (err) {
    throw new Error(`${err}`);
  }

  if (success) {
    redirect("/sign-in");
  } else {
    return {error: "Failure to sign out"};
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

