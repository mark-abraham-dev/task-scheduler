import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Container,
  Typography,
  Paper,
} from "@mui/material";
import { getLogs } from "../services/api";
import { Log } from "../types";

interface LogListProps {
  refresh: boolean;
}

const LogList: React.FC<LogListProps> = ({ refresh }) => {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    fetchLogs();
  }, [refresh]);

  const fetchLogs = async () => {
    const response = await getLogs();
    setLogs(response.data);
  };

  return (
    <Container>
      <Typography variant="h4">Execution Logs</Typography>
      <Paper style={{ maxHeight: 400, overflow: "auto" }}>
        <List>
          {logs.map((log) => (
            <ListItem key={log._id}>
              <ListItemText
                primary={`Task ID: ${log.taskId}`}
                secondary={`Executed at: ${log.executionTime}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default LogList;
