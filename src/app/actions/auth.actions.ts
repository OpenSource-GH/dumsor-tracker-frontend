"use server";

import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {NextResponse} from "next/server";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

async function continueWithGoogle() {
  const supabase = await createClient();

  const {data, error} = await supabase.auth.signInWithOAuth({
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

async function signOut(): Promise<{ error?: string }> {

  // Signout for supabase user
  const supabase = await createClient();
  const supabaseUser = await supabase.auth.getUser();
  if (supabaseUser.data.user) {
    const {error} = await supabase.auth.signOut();
    if (error) {
      return {error: "Failure to sign out"};
    }
  }

  // Signout for all other users
  let success = false;
  try {
    const res = await fetch("https://api.dumsor.xyz/api/v1/users/logout", {
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

  return JSON.parse(JSON.stringify(user));
}

type SignInWithCredentialsPayload = {
  email: string;
  password: string;
};

async function signInWithCredentials(payload: SignInWithCredentialsPayload, forSignUp: boolean = false) {
  const url = forSignUp ? `${BASE_URL}/users/signup` : `${BASE_URL}/users/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const msg = await response.text();
    throw new Error(msg);
  }

  return await response.json();
}

export {continueWithGoogle, getCurrentUser, signOut, signInWithCredentials};
