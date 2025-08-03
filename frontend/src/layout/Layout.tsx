import type { ReactNode } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { logout } from "../services/authService";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const navItems = [{ to: "/index", label: "学習記録" }];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("ログアウトしました");
      navigate("/login");
    } catch {
      toast.error("ログアウトに失敗しました");
    }
  };

  

  if (loading) return null; // ローディング中は描画を待つ
  if (!user) return <>{children}</>; // ログイン前はサイドバーなし

  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-blue-100 to-purple-200">
      {/* サイドメニュー（PC） */}
      <aside className="hidden md:flex flex-col justify-between w-64 bg-white/80 border-r p-4">
        <div>
          <h1 className="text-xl font-bold text-purple-700 mb-6 text-center">
            📚 StudyLog
          </h1>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`block px-4 py-2 rounded ${
                  pathname === item.to ? "bg-blue-100 font-semibold" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded flex justify-center items-center gap-2 hover:bg-red-600"
        >
          <FaSignOutAlt />
          ログアウト
        </button>
      </aside>

      {/* モバイルメニュー */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white p-2 rounded shadow"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/30 z-40">
          <aside className="w-64 h-full bg-white p-4">
            <h1 className="text-xl font-bold mb-6 text-center">📚 StudyLog</h1>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded ${
                    pathname === item.to ? "bg-blue-100 font-semibold" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="mt-6 w-full px-4 py-2 bg-red-500 text-white rounded flex items-center justify-center gap-2 hover:bg-red-600"
            >
              <FaSignOutAlt />
              ログアウト
            </button>
          </aside>
        </div>
      )}

      {/* メイン */}
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
};
