import { useEffect, useState } from "react";
import { getStudyLogs } from "../services/studyLogService";
import { StudyLogItem } from "../components/StudyLogItem";
import { Link } from "react-router-dom";
import type { StudyLog } from "../types/studyLog";

export const StudyLogList = () => {
  const [logs, setLogs] = useState<StudyLog[]>([]);

  const fetchLogs = async () => {
    const data = await getStudyLogs();
    setLogs(data);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-4 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">学習記録一覧</h1>
        <Link
          to="/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          新規作成
        </Link>
      </div>
      {logs.length > 0 ? (
        logs.map((log) => (
          <StudyLogItem
            key={log.id}
            log={log}
            onDeleted={fetchLogs}
            onUpdated={fetchLogs}
          />
        ))
      ) : (
        <p className="text-gray-500">記録はまだありません。</p>
      )}
    </div>
  );
};
