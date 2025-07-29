import axios from "axios";
import type { StudyLog } from "../types/studyLog";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/study-logs`;

export const getStudyLogs = async (): Promise<StudyLog[]> => {
  const response = await axios.get<StudyLog[]>(API_URL);
  return response.data;
};

export const createStudyLog = async (data: {
  title: string;
  content: string;
  studied_on: string;
}): Promise<void> => {
  await axios.post(API_URL, data);
};
