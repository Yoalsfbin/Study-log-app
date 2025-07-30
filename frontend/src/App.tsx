import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudyLogList } from "./pages/StudyLogList";
import { CreateStudyLog } from "./pages/CreateStudyLog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudyLogList />} />
        <Route path="/new" element={<CreateStudyLog />} />
      </Routes>
    </Router>
  );
}

export default App;
