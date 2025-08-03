import { LinkButton } from "../components/ui/LinkButton";
import { Link } from "react-router-dom";

export const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        ようこそ！学習記録アプリへ
      </h1>
      <p className="text-gray-700 mb-10">
        📚 日々の学習を記録して、成長を可視化しよう。
      </p>

      {/* メインボタン */}
      <LinkButton to="/index">学習記録一覧へ</LinkButton>

      {/* ログイン・新規登録 */}
      <div className="mt-8 flex gap-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-white text-blue-600 border border-blue-500 rounded-full shadow hover:bg-blue-50 transition"
        >
          ログイン
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-white text-purple-600 border border-purple-500 rounded-full shadow hover:bg-purple-50 transition"
        >
          新規登録
        </Link>
      </div>
    </div>
  );
};
