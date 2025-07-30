import { useNavigate } from "react-router-dom";
import { StudyLogForm } from "../components/StudyLogForm";
import { Link } from "react-router-dom";

export const CreateStudyLog = () => {
  const navigate = useNavigate();

  const handleCreated = () => {
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">✍️ 学習記録を追加</h1>
        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          一覧へ戻る
        </Link>
      </div>

      <StudyLogForm onSuccess={handleCreated} />
    </div>
  );
};
