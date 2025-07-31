import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudyLogList } from "./pages/StudyLogList";
import { Welcome } from "./pages/Welcome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/index" element={<StudyLogList />} />
      </Routes>
    </Router>
  );
}

export default App;
