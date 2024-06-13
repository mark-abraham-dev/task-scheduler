import React, { useEffect, useState } from "react";
import { getLogs } from "../services/api";

interface Log {
  _id: string;
  taskId: string;
  executionTime: string;
}

const LogList: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const response = await getLogs();
    setLogs(response.data);
  };

  return (
    <div>
      <h2>Execution Logs</h2>
      <ul>
        {logs.map((log) => (
          <li key={log._id}>
            Task ID: {log.taskId} - Executed at: {log.executionTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogList;
