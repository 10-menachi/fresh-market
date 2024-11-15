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
      user: null,
    };
  }

  if (user) {
    return {
      error: null,
      status: 200,
      user: user,
    };
  }

  return {
    error: "Unknown error",
    status: 500,
    user: null,
  };
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
    return {
      error: error.message,
      status: error.status,
      user: null,
    };
  }

  if (user) {
    return {
      error: null,
      status: 200,
      user: user,
    };
  }

  return {
    error: "Unknown error",
    status: 500,
    user: null,
  };
}
