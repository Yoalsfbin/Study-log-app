// src/services/studyLogService.ts
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
