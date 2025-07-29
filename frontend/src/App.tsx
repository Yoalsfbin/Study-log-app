import { useEffect, useState } from "react";
import { getStudyLogs } from "./services/studyLogService";
import { StudyLogForm } from "./components/StudyLogForm";
import type { StudyLog } from "./types/studyLog";

function App() {
  const [logs, setLogs] = useState<StudyLog[]>([]);

  const fetchLogs = async () => {
    const data = await getStudyLogs();
    setLogs(data);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          学習記録アプリ
        </h1>

        <StudyLogForm onCreated={fetchLogs} />

        {logs.map((log) => (
          <div
            key={log.id}
            className="p-6 bg-white rounded-lg shadow space-y-2 border border-gray-200"
          >
            <p className="text-sm text-gray-500">
              {new Date(log.studied_on).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "short",
              })}
            </p>
            <h3 className="text-xl font-semibold text-gray-800">{log.title}</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{log.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
