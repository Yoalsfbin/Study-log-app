import { useNavigate } from "react-router-dom";
import { StudyLogForm } from "../components/StudyLogForm";

export const StudyLogCreate = () => {
  const navigate = useNavigate();

  const handleCreated = () => {
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">学習記録を追加</h1>
      <StudyLogForm onCreated={handleCreated} />
    </div>
  );
};
