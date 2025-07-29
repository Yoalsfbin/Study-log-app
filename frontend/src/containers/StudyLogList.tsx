import React, { useEffect, useState } from "react";
import { getStudyLogs } from "../services/studyLogService";
import type { StudyLog } from "../types/studyLog";
import StudyLogCard from "../components/StudyLogCard";

const StudyLogList: React.FC = () => {
  const [logs, setLogs] = useState<StudyLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getStudyLogs();
        setLogs(data);
      } catch (e) {
        console.error("取得失敗:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) return <p>読み込み中...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">学習記録一覧</h2>
      {logs.map((log) => (
        <StudyLogCard key={log.id} log={log} />
      ))}
    </div>
  );
};

export default StudyLogList;
