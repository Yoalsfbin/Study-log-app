import { apiClient } from "../lib/axios";
import { getCookie } from "./authService";

export type TagInput = {
  id?: number; // ← 追加（編集で使う）
  name: string;
  color?: string;
  description?: string;
};

const getXsrfHeaders = () => {
  const xsrfToken = getCookie("XSRF-TOKEN");
  return {
    headers: {
      "X-XSRF-TOKEN": xsrfToken || "",
    },
    withCredentials: true,
  };
};

// 一覧取得
export const fetchTags = async () => {
  const res = await apiClient.get("/tags", getXsrfHeaders());
  return res.data;
};

// 作成
export const createTag = async (data: TagInput) => {
  const res = await apiClient.post("/tags", data, getXsrfHeaders());
  return res.data;
};

// 更新
export const updateTag = async (id: number, data: TagInput) => {
  const res = await apiClient.put(`/tags/${id}`, data, getXsrfHeaders());
  return res.data;
};

// 削除
export const deleteTag = async (id: number) => {
  const res = await apiClient.delete(`/tags/${id}`, getXsrfHeaders());
  return res.data;
};
