import { deleteStudyLog } from "../services/studyLogService";
import type { StudyLog } from "../types/studyLog";
import { FaTrash } from "react-icons/fa";

type Props = {
  log: StudyLog;
  onDeleted: () => void;
};

export const StudyLogItem = ({ log, onDeleted }: Props) => {
  const handleDelete = async () => {
    if (!confirm("本当に削除しますか？")) return;

    try {
      await deleteStudyLog(log.id);
      onDeleted();
    } catch (error) {
      console.error("削除に失敗しました", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow relative group">
      <h3 className="text-xl font-semibold">{log.title}</h3>
      <p className="text-gray-700 whitespace-pre-line">{log.content}</p>
      <p className="text-sm text-gray-500 mt-2">{log.studied_on}</p>

      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-600 transition"
        title="削除"
      >
        <FaTrash size={20} />
      </button>
    </div>
  );
};
