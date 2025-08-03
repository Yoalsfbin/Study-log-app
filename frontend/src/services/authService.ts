import axios from "axios";
import { apiClient } from "../lib/axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

axios.defaults.withCredentials = true;

apiClient.interceptors.request.use((config) => {
  const token = getCookie("XSRF-TOKEN");
  if (token) {
    config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
  }
  return config;
});

// クッキーからXSRFトークンを取得
function getCookie(name: string): string | null {
  const match = document.cookie.match(
    new RegExp("(^|;\\s*)" + name + "=([^;]*)")
  );
  return match ? match[2] : null;
}

/**
 * ログイン処理
 */
export const login = async (email: string, password: string) => {
  // CSRF クッキーの取得
  await axios.get(`${API_BASE_URL}/sanctum/csrf-cookie`);

  // ログイン API へ POST
  await axios.post(
    `${API_BASE_URL}/login`,
    {
      email,
      password,
    },
    {
      withCredentials: true,
      headers: {
        "X-XSRF-TOKEN": decodeURIComponent(getCookie("XSRF-TOKEN") || ""),
      },
    }
  );
};

/**
 * ログアウト処理
 */
export const logout = async () => {
  await axios.post(
    `${API_BASE_URL}/logout`,
    {},
    {
      headers: {
        "X-XSRF-TOKEN": decodeURIComponent(
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("XSRF-TOKEN="))
            ?.split("=")[1] || ""
        ),
      },
    }
  );
};

/**
 * ログイン中のユーザー取得
 */
export const getCurrentUser = async () => {
  return axios.get(`${API_BASE_URL}/me`, {
    withCredentials: true,
  });
};
