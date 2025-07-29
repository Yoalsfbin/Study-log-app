import React from "react";
import type { StudyLog } from "../types/studyLog";

type Props = {
  log: StudyLog;
};

const StudyLogCard: React.FC<Props> = ({ log }) => (
  <div className="p-4 border rounded mb-2 shadow">
    <div className="text-sm text-gray-500">
      {log.studied_on}（{log.category ?? "未分類"}）
    </div>
    <h3 className="text-lg font-bold">{log.title}</h3>
    {log.content && <p className="text-gray-700">{log.content}</p>}
  </div>
);

export default StudyLogCard;
