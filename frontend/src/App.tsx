import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { StudyLogList } from "./pages/StudyLogList";
import { Login } from "./pages/Login";
import { Welcome } from "./pages/Welcome";
import { Layout } from "./layout/Layout";
import { useAuth } from "./hooks/useAuth";
import { AuthProvider } from "./contexts/AuthContext";
import type { ReactNode } from "react";
import { TagList } from "./pages/TagList";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ログイン不要の画面 */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />

          {/* ログイン後のみアクセス可能 */}
          <Route
            path="/index"
            element={
              <RequireAuth>
                <Layout>
                  <StudyLogList />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/tags"
            element={
              <RequireAuth>
                <Layout>
                  <TagList />
                </Layout>
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
