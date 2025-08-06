import { useEffect, useState } from "react";
import { fetchTags } from "../services/tagService";
import { CreateTagModal } from "../components/Tag/TagModal";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { FaPlus } from "react-icons/fa";

type Tag = {
  id: number;
  name: string;
  color?: string;
  description?: string;
};

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

  const loadTags = async () => {
    try {
      const data = await fetchTags();
      console.log("タグAPIのレスポンス", data);
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
          <FaPlus />
          タグを追加
        </PrimaryButton>
      </div>

      <CreateTagModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreated={loadTags}
      />

      {tags.length === 0 ? (
        <p className="text-gray-500">タグがまだ登録されていません。</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {tags.map((tag) => {

            return (
              <li key={tag.id}>
                <div className="relative group inline-block w-fit">
                  <span
                    className="inline-block text-lg font-semibold px-8 py-3 mb-4 rounded-full shadow cursor-default"
                    style={{ backgroundColor: tag.color || "#ccc", color: getTextColor(tag.color || "#ccc") }}
                  >
                    {tag.name}
                  </span>

                  {/* ツールチップ */}
                  {tag.description && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 top-[120%] z-10
                                bg-white/95 text-gray-800 text-sm px-4 py-2 rounded-xl shadow-lg
                                border border-gray-300 backdrop-blur-md
                                opacity-0 group-hover:opacity-100 transition duration-200
                                pointer-events-none
                                max-w-xs whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {tag.description}
                    </div>
                  )}
                </div>
              </li>

            );
          })}
        </ul>
      )}
    </div>
  );
};
