import axios, { type InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

serverApi.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

serverApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (axios.isAxiosError(error) && error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const cookieStore = await cookies();
      const refreshToken = cookieStore.get("refresh_token")?.value;

      if (refreshToken) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh`,
            { refreshToken }
          );
          const tokens = res.data.tokens ?? res.data;

          cookieStore.set("access_token", tokens.accessToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: tokens.expiresIn,
            path: "/",
          });

          original.headers.Authorization = `Bearer ${tokens.accessToken}`;
          return serverApi(original);
        } catch {
          cookieStore.delete("access_token");
          cookieStore.delete("refresh_token");
        }
      }
    }

    const message = axios.isAxiosError(error)
      ? error.response?.data?.detail ||
        error.response?.data?.message ||
        "Terjadi kesalahan."
      : "Tidak dapat terhubung ke server.";
    return Promise.reject(new Error(message));
  }
);

export default serverApi;
