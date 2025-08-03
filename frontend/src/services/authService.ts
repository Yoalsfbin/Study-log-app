import axios from "axios";
import { apiClient } from "../lib/axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// CSRF用：生のaxiosを使用（apiClient未使用）
export const getCsrfToken = async () => {
  await axios.get(`${API_BASE_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });
};

// クッキーからXSRFトークン取得
export const getCookie = (name: string): string | null => {
  const match = document.cookie.match(
    new RegExp("(^|;\\s*)" + name + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[2]) : null;
};

/**
 * ログイン処理
 */
export const login = async (email: string, password: string) => {
  await getCsrfToken();
  const xsrfToken = getCookie("XSRF-TOKEN");

  return apiClient.post(
    "/login",
    { email, password },
    {
      headers: {
        "X-XSRF-TOKEN": xsrfToken || "",
      },
    }
  );
};

/**
 * ログアウト処理
 */
export const logout = async () => {
  const xsrfToken = getCookie("XSRF-TOKEN");

  return apiClient.post(
    "/logout",
    {},
    {
      headers: {
        "X-XSRF-TOKEN": xsrfToken || "",
      },
    }
  );
};

/**
 * ログイン中のユーザー取得
 */
export const getCurrentUser = async () => {
  return apiClient.get("/me", {
    withCredentials: true,
  });
};
