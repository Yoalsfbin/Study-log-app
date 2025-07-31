import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudyLogList } from "./pages/StudyLogList";
import { Login } from "./pages/Login";
import { Welcome } from "./pages/Welcome";
import { Layout } from "./layout/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/index" element={<StudyLogList />} />
          {/* 今後追加予定ページ */}
          {/* <Route path="/calendar" element={<CalendarPage />} /> */}
          {/* <Route path="/stats" element={<StatsPage />} /> */}
          {/* <Route path="/settings" element={<SettingsPage />} /> */}
          {/* <Route path="/contact" element={<ContactPage />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
