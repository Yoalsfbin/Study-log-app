import { useForm } from "react-hook-form";
import { createTag } from "../../services/tagService";
import type { TagInput } from "../../services/tagService";

type Props = {
  onCreated: () => void;
};

export const TagForm = ({ onCreated }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TagInput>();

  const onSubmit = async (data: TagInput) => {
    console.log("送信データ", data);
    try {
      await createTag(data);
      reset();
      onCreated();
    } catch (err) {
      console.error("登録に失敗しました", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm text-gray-600 mb-1">タグ名</label>
        <input
          {...register("name", { required: "タグ名は必須です" })}
          className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">カラーコード</label>
        <input
          type="color"
          {...register("color")}
          className="w-32 h-12 p-1 border border-gray-300 rounded-md cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">説明</label>
        <textarea
          {...register("description")}
          className="w-full h-28 rounded-lg border border-gray-300 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`
          inline-flex items-center gap-2 justify-center
          px-6 py-3 rounded-full font-semibold text-white
          bg-gradient-to-r from-blue-500 to-purple-500
          hover:from-blue-600 hover:to-purple-600
          shadow-lg hover:shadow-xl
          transform hover:scale-105 transition duration-300 ease-in-out
        `}
      >
        {isSubmitting ? "登録中..." : "登録"}
      </button>
    </form>
  );
};
