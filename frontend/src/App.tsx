import React from "react";
import StudyLogList from "./containers/StudyLogList";

function App() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">学習記録アプリ</h1>
      <StudyLogList />
    </div>
  );
}

export default App;
