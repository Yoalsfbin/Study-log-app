import type { ReactNode } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const navItems = [
    { to: "/index", label: "学習記録" },
    // { to: "/calendar", label: "カレンダー" },
    // { to: "/stats", label: "グラフ" },
    // { to: "/settings", label: "設定" },
    // { to: "/contact", label: "問い合わせ" },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-blue-100 to-purple-200">
      {/* サイドメニュー（PC） */}
      <aside className="hidden md:flex flex-col w-64 h-full bg-gradient-to-b from-white/80 to-blue-50 backdrop-blur-md border-r border-gray-200 p-4">
        <div className="text-xl font-bold text-purple-700 mb-6 text-center">
          📚 StudyLog
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`block px-4 py-2 rounded hover:bg-blue-100 transition ${
                pathname === item.to ? "bg-blue-100 font-semibold" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* モバイルメニュー（開閉） */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 bg-white p-2 rounded shadow"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/30 z-40">
          <aside className="w-64 h-full bg-white p-4">
            <div className="text-xl font-bold mb-6 text-center">
              📚 StudyLog
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`block px-4 py-2 rounded hover:bg-blue-100 transition ${
                    pathname === item.to ? "bg-blue-100 font-semibold" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* メインコンテンツ */}
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
};
