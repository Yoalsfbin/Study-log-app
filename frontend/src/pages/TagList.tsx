import { useEffect, useState } from "react";
import { fetchTags } from "../services/tagService";
import { CreateTagModal } from "../components/Tag/CreateTagModal";
import { EditTagModal } from "../components/Tag/EditTagModal";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

// 型
type Tag = {
  id: number;
  name: string;
  color?: string;
  description?: string;
};

// 背景色に応じた文字色を決める
const getTextColor = (bgColor: string): string => {
  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 186 ? "#000000" : "#FFFFFF";
};

export const TagList = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Tag | null>(null);

  const loadTags = async () => {
    try {
      const data = await fetchTags();
      if (Array.isArray(data)) {
        setTags(data);
      } else {
        console.warn("配列ではありません:", data);
      }
    } catch (err) {
      console.error("取得に失敗しました", err);
    }
  };

  useEffect(() => {
    loadTags();
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🏷タグ管理</h2>
        <PrimaryButton onClick={() => setIsOpen(true)}>
          <FaPlus /> タグを追加
        </PrimaryButton>
      </div>

      <CreateTagModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreated={loadTags}
      />

      {editTarget && (
        <EditTagModal
          isOpen={true}
          onClose={() => setEditTarget(null)}
          onUpdated={loadTags}
          tag={editTarget}
        />
      )}

      {tags.length === 0 ? (
        <p className="text-gray-500">タグがまだ登録されていません。</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {tags.map((tag) => {
            const textColor = getTextColor(tag.color || "#ccc");

            return (
              <li key={tag.id} className="flex items-center justify-between">
                <div className="group relative inline-block">
                  <span
                    className="inline-block text-lg font-semibold px-8 py-3 rounded-full shadow cursor-default"
                    style={{ backgroundColor: tag.color || "#ccc", color: textColor }}
                  >
                    {tag.name}
                  </span>

                  {tag.description && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 z-50
                    w-max max-w-xs px-4 py-2 rounded-xl text-sm text-gray-800 bg-white
                    border border-gray-300 shadow-xl whitespace-pre-line text-center
                    opacity-0 group-hover:opacity-100 pointer-events-none transition">
                      {tag.description}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-300 rotate-45 z-[-1]" />
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setEditTarget(tag)}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="編集"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => alert(`削除機能未実装: ${tag.name}`)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="削除"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
