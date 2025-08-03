import { useState, useEffect } from "react";
import type { StudyLog } from "../types/studyLog";
import { createStudyLog, updateStudyLog } from "../services/studyLogService";
import { toast } from "react-toastify";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { FaPlus } from "react-icons/fa";

type Props = {
  onSuccess: () => void;
  initialData?: StudyLog;
};

export const StudyLogForm = ({ onSuccess, initialData }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [studiedOn, setStudiedOn] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title ?? "");
      setContent(initialData.content ?? "");
      setStudiedOn(initialData.studied_on ?? "");
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !studiedOn) return;

    try {
      if (initialData) {
        // 編集の場合
        await updateStudyLog(initialData.id, {
          title,
          content,
          studied_on: studiedOn,
        });
        toast.success("学習記録を更新しました！");
      } else {
        // 新規作成の場合
        await createStudyLog({ title, content, studied_on: studiedOn });
        toast.success("学習記録を登録しました！");
      }

      // 成功後の初期化と通知
      setTitle("");
      setContent("");
      setStudiedOn("");
      onSuccess();
    } catch (error) {
      console.error("送信に失敗しました", error);
      alert("送信に失敗しました");
      toast.error("エラーが発生しました。再度お試しください。");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-10 p-8 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl space-y-6"
    >
      <div>
        <label className="block text-sm text-gray-600 mb-1">タイトル</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">内容</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-28 rounded-lg border border-gray-300 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">学習日</label>
        <input
          type="date"
          value={studiedOn}
          onChange={(e) => setStudiedOn(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />
      </div>

      <div className="text-center">
        <PrimaryButton type="submit" icon={<FaPlus />}>
          {initialData ? "更新する" : "登録する"}
        </PrimaryButton>
      </div>
    </form>
  );
};
