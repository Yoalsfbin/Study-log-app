import { apiClient } from "../lib/axios";
import type { StudyLog } from "../types/studyLog";

export const getStudyLogs = async (): Promise<StudyLog[]> => {
  const response = await apiClient.get<StudyLog[]>("/study-logs");
  return response.data;
};

export const createStudyLog = async (data: {
  title: string;
  content: string;
  studied_on: string;
}): Promise<void> => {
  await apiClient.post("/study-logs", data);
};

export const updateStudyLog = async (
  id: number,
  data: {
    title: string;
    content: string;
    studied_on: string;
  }
): Promise<void> => {
  await apiClient.put(`/study-logs/${id}`, data);
};

export const deleteStudyLog = async (id: number): Promise<void> => {
  await apiClient.delete(`/study-logs/${id}`);
};
