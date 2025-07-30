import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import type { StudyLog } from "../types/studyLog";
import { deleteStudyLog } from "../services/studyLogService";
import { EditStudyLogModal } from "./EditStudyLogModal";
import { toast } from "react-toastify";

type Props = {
  log: StudyLog;
  onDeleted: () => void;
  onUpdated: () => void;
};

export const StudyLogItem = ({ log, onDeleted, onUpdated }: Props) => {
  const [isEditOpen, setEditOpen] = useState(false);

  const handleDelete = async () => {
    if (!confirm("本当に削除しますか？")) return;

    try {
      await deleteStudyLog(log.id);
      onDeleted();
      toast.success("削除に成功しました！");
    } catch (error) {
      console.error("削除に失敗しました", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow relative group">
      <h3 className="text-xl font-semibold">{log.title}</h3>
      <p className="text-gray-700 whitespace-pre-line">{log.content}</p>
      <p className="text-sm text-gray-500 mt-2">
        {log.studied_on}（{log.category ?? "未分類"}）
      </p>

      {/* 編集ボタン */}
      <button
        onClick={() => setEditOpen(true)}
        className="absolute top-2 right-10 text-gray-400 hover:text-blue-600 transition"
        title="編集"
      >
        <FaEdit size={20} />
      </button>

      {/* 削除ボタン */}
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-600 transition"
        title="削除"
      >
        <FaTrash size={20} />
      </button>

      {/* 編集モーダル */}
      <EditStudyLogModal
        isOpen={isEditOpen}
        onClose={() => setEditOpen(false)}
        log={log}
        onUpdated={onUpdated}
      />
    </div>
  );
};
