"use server";
import { EmailCredentialsPayload, PhoneCredentialsPayload } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

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

async function continueWithPhoneNumber(payload: PhoneCredentialsPayload) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOtp({
    phone: payload.phone,
  });

  if (error) {
    throw new Error(`${error}`);
  }

  if (data.session) {
    redirect("/");
  }
}

async function signInWithCredentials(payload: EmailCredentialsPayload) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });
  if (error) {
    throw new Error(`${error}`);
  }

  return data;
}

async function signUpWithCredentials(payload: EmailCredentialsPayload) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
  });
  if (error) {
    throw new Error(`${error}`);
  }

  return data;
}

async function signOut(): Promise<{ error?: string }> {
  // Signout for supabase user
  const supabase = await createClient();
  const supabaseUser = await supabase.auth.getUser();
  if (supabaseUser.data.user) {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { error: "Failure to sign out" };
    }
  }

  // Signout for all other users
  let success = false;
  try {
    const res = await fetch(`${BASE_URL}/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: "", password: "" }),
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
    return { error: "Failure to sign out" };
  }
}

export {
  continueWithGoogle,
  continueWithPhoneNumber,
  signOut,
  signUpWithCredentials,
  signInWithCredentials,
};
