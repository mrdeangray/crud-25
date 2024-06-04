import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskProvider";
import { Link } from "react-router-dom";
import axios from "axios";

const Task = ({ task }) => {
  const { tasks, setTasks } = useContext(TaskContext);
  const [score, setScore] = useState(0);

  useEffect(() => {
    getScore();
  }, []);

  const getScore = async () => {
    try {
      const { data } = await axios(`https://api.github.com/users/${task.name}`);
      setScore(data.public_respos);
    } catch (error) {}
  };

  const toggleCompleted = (index) => {
    const newTasks = tasks.map((tk) => {
      if (tk.id === task.id) {
        tk.subtasks[index].completed = !tk.subtasks[index].completed;
        tk.percentCompleted = calcPercentComplete(tk.subtasks);
      }
      return tk;
    });
    setTasks(newTasks);
    localStorage.setItem("crud-25", JSON.stringify(newTasks));
  };
  const calcPercentComplete = (subtasks) => {
    const percent =
      (subtasks.filter((sub) => sub.completed).length / subtasks.length) * 100;
    return Math.round(percent);
  };
  return (
    <div className="box">
      <h3>{task.name}</h3>
      <p>score:{score}</p>
      <p style={{ color: "blue", fontSize: "20px" }}>
        {task.percentCompleted}%
      </p>
      <p>
        Past Due:{" "}
        {task.dueDateTime.toDate().getTime() < new Date().getTime()
          ? "Yes"
          : "No"}
      </p>
      {task.subtasks.map((subtask, index) => {
        return (
          <p
            key={index}
            style={{
              textDecoration: subtask.completed ? "line-through" : "none",
            }}
            onClick={() => toggleCompleted(index)}
          >
            {subtask.name}
          </p>
        );
      })}
      <Link to={`/updatetask/${task.id}`}>
        <button>Update</button>
      </Link>
      <Link to={`/deletetask/${task.id}`}>
        <button>Delete</button>
      </Link>
    </div>
  );
};

export default Task;
