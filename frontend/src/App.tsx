import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudyLogList } from "./pages/StudyLogList";
import { StudyLogCreate } from "./pages/StudyLogCreate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudyLogList />} />
        <Route path="/new" element={<StudyLogCreate />} />
      </Routes>
    </Router>
  );
}

export default App;
