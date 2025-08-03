import { apiClient } from "../lib/axios";
import type { StudyLog } from "../types/studyLog";
import { getCookie } from "./authService";

export const getStudyLogs = async (): Promise<StudyLog[]> => {
  const response = await apiClient.get<StudyLog[]>("/study-logs");
  return response.data;
};

export const createStudyLog = async (data: {
  title: string;
  content: string;
  studied_on: string;
}): Promise<void> => {
  const xsrfToken = getCookie("XSRF-TOKEN");

  await apiClient.post("/study-logs", data, {
    headers: {
      "X-XSRF-TOKEN": xsrfToken || "",
    },
    withCredentials: true,
  });
};

export const updateStudyLog = async (
  id: number,
  data: {
    title: string;
    content: string;
    studied_on: string;
  }
): Promise<void> => {
  const xsrfToken = getCookie("XSRF-TOKEN");

  await apiClient.put(`/study-logs/${id}`, data, {
    headers: {
      "X-XSRF-TOKEN": xsrfToken || "",
    },
    withCredentials: true,
  });
};

export const deleteStudyLog = async (id: number): Promise<void> => {
  const xsrfToken = getCookie("XSRF-TOKEN");

  await apiClient.delete(`/study-logs/${id}`, {
    headers: {
      "X-XSRF-TOKEN": xsrfToken || "",
    },
    withCredentials: true,
  });
};
