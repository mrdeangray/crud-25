import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TaskContext } from "../context/TaskProvider";
import Task from "./Task";

const ReadTasks = () => {
  const { tasks } = useContext(TaskContext);
  return (
    <div>
      <Link to={`/`}>Back</Link>
      <h3>ReadTasks</h3>
      <div className="all-tasks">
        {tasks.map((task) => {
          return <Task key={task.id} task={task} />;
        })}
      </div>

      <Link to={`/createtask`}>
        <button style={{ marginTop: "40px" }}>Create Task</button>
      </Link>
    </div>
  );
};

export default ReadTasks;
