import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudyLogList } from "./pages/StudyLogList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudyLogList />} />
      </Routes>
    </Router>
  );
}

export default App;
