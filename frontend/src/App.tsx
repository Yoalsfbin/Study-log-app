import { useEffect, useState } from "react";
import { getStudyLogs } from "./services/studyLogService";
import { StudyLogForm } from "./components/StudyLogForm";
import type { StudyLog } from "./types/studyLog";
import { StudyLogItem } from "./components/StudyLogItem";

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
          <StudyLogItem key={log.id} log={log} onDeleted={fetchLogs} />
        ))}
      </div>
    </div>
  );
}

export default App;
