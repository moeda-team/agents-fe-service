import axios, { type InternalAxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

function getCookie(name: string) {
  if (typeof window === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, maxAge: number) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/${secure}; SameSite=Lax`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; Path=/`;
}

apiClient.interceptors.request.use((config) => {
  const token = getCookie("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (axios.isAxiosError(error) && error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refreshToken = getCookie("refresh_token");

      if (refreshToken) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh`,
            { refreshToken }
          );
          const { accessToken, expiresIn } = res.data;
          setCookie("access_token", accessToken, expiresIn);
          original.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(original);
        } catch {
          deleteCookie("access_token");
          deleteCookie("refresh_token");
          window.location.replace("/login");
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

export default apiClient;
