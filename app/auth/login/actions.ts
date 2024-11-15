"use server";

import { createClient } from "@/utils/supabase/server";
import { AuthError } from "@supabase/supabase-js";

export async function login(formData: FormData) {
  console.log("DEBUG STATEMENT");

  const supabase = await createClient();

  const user_data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: user, error } = await supabase.auth.signInWithPassword(
    user_data
  );

  if (error) {
    return {
      error: error.message,
      status: error.status,
    };
  }

  if (user) {
    return {
      email: user.user.email,
      name: user.user.user_metadata?.full_name || "Anonymous",
    };
  }

  return null;
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const user_data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp(user_data);

  if (error) {
    return new AuthError(error.message);
  }

  if (user) {
    return {
      email: user.email,
      name: user.user_metadata?.full_name || "Anonymous",
    };
  }

  return new AuthError("Unknown error");
}
