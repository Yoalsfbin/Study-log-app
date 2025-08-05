import { apiClient } from "../lib/axios";
import { getCookie } from "./authService";

export type TagInput = {
  name: string;
  color?: string;
  description?: string;
};

export const fetchTags = async () => {
  const xsrfToken = getCookie("XSRF-TOKEN");
  const res = await apiClient.get("/tags",
    { headers: {
      "X-XSRF-TOKEN": xsrfToken || "",
    },
      withCredentials: true
    });
  return res.data;
};

export const createTag = async (data: TagInput) => {
  const xsrfToken = getCookie("XSRF-TOKEN");
  const res = await apiClient.post("/tags", data, {
    headers: {
      "X-XSRF-TOKEN": xsrfToken || "",
    },
    withCredentials: true
  });
  return res.data;
};
