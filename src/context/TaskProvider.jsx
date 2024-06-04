import React, { createContext, useEffect, useState } from "react";

export const TaskContext = createContext(null);

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  // localStorage.clear();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("crud-25-tasks")) || [];
    setTasks(savedTasks);
  }, []);
  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
