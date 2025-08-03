import { useEffect, useState } from "react";
import { getStudyLogs } from "../services/studyLogService";
import { StudyLogItem } from "../components/StudyLogItem";
import type { StudyLog } from "../types/studyLog";
import { CreateStudyLogModal } from "../components/CreateStudyLogModal";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { FaPlus } from "react-icons/fa";

export const StudyLogList = () => {
  const [logs, setLogs] = useState<StudyLog[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLogs = async () => {
    const data = await getStudyLogs();
    setLogs(data);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-10">
      <div className="max-w-2xl mx-auto space-y-4 pb-4 ">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">学習記録一覧</h1>
          <PrimaryButton onClick={() => setIsModalOpen(true)}>
            <FaPlus />
            学習記録を登録する
          </PrimaryButton>
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
        {/* モーダル */}
        <CreateStudyLogModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreated={() => {
            fetchLogs();
            setIsModalOpen(false);
          }}
        />
      </div>
    </div>
  );
};
