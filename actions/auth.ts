"use server";

import { cookies } from "next/headers";
import serverApi from "@/lib/api/server";
import { withAction, type ActionResult } from "@/lib/action";
import type { UserData, AuthTokens, RegisterResult, LoginResult } from "@/types/auth";

async function setAuthCookies(tokens: AuthTokens) {
  const cookieStore = await cookies();
  const opts = {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
  cookieStore.set("access_token", tokens.accessToken, { ...opts, maxAge: tokens.expiresIn });
  cookieStore.set("refresh_token", tokens.refreshToken, { ...opts, maxAge: 60 * 60 * 24 * 30 });
}

export async function registerAction(data: {
  fullName: string;
  email: string;
  username: string;
  password: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}): Promise<ActionResult<RegisterResult>> {
  return withAction(async () => {
    const res = await serverApi.post<RegisterResult>("/v1/auth/register", data);
    await setAuthCookies(res.data.tokens);
    return res.data;
  });
}

export async function loginAction(data: {
  email: string;
  password: string;
  rememberMe: boolean;
}): Promise<ActionResult<LoginResult>> {
  return withAction(async () => {
    const res = await serverApi.post<LoginResult>("/v1/auth/login", data);
    await setAuthCookies(res.data.tokens);
    return res.data;
  });
}

export async function getMeAction(): Promise<ActionResult<UserData>> {
  return withAction(async () => {
    const res = await serverApi.get<UserData>("/v1/auth/me");
    return res.data;
  });
}


export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
}

export async function forgotPasswordAction(data: {
  email: string;
}): Promise<ActionResult<{ message: string }>> {
  return withAction(async () => {
    const res = await serverApi.post<{ message: string }>("/v1/auth/forgot-password", data);
    return res.data;
  });
}

export async function resetPasswordAction(data: {
  token: string;
  new_password: string;
}): Promise<ActionResult<{ message: string }>> {
  return withAction(async () => {
    const res = await serverApi.post<{ message: string }>("/v1/auth/reset-password", data);
    return res.data;
  });
}
