import { useState } from "react";
import { createStudyLog } from "../services/studyLogService";
import { PlusIcon } from "@heroicons/react/24/solid";

type Props = {
  onCreated: () => void;
};

export const StudyLogForm = ({ onCreated }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [studiedOn, setStudiedOn] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !studiedOn) return;

    try {
      await createStudyLog({ title, content, studied_on: studiedOn });
      setTitle("");
      setContent("");
      setStudiedOn("");
      onCreated();
    } catch (error) {
      console.error("登録に失敗しました", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-10 p-8 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        ✍️ 学習記録の追加
      </h2>

      <div>
        <label className="block text-sm text-gray-600 mb-1">タイトル</label>
        <input
          type="text"
          placeholder="例）ReactのHooksについて"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">内容</label>
        <textarea
          placeholder="学んだこと、気づき、課題などを書きましょう"
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
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow hover:shadow-md transition"
        >
          <PlusIcon className="w-5 h-5" />
          記録する
        </button>
      </div>
    </form>
  );
};
