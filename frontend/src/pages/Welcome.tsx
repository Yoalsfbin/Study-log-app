import { LinkButton } from "../components/ui/LinkButton";

export const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        ようこそ！学習記録アプリへ
      </h1>
      <p className="text-gray-700 mb-10">
        📚日々の学習を記録して、成長を可視化しよう。
      </p>
      <LinkButton to="/index">学習記録一覧へ</LinkButton>
    </div>
  );
};
