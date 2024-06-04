import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { TaskContext } from "../context/TaskProvider";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useEffect } from "react";

const Msg = styled.p`
  color: blue;
  font-size: 22px;
`;

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");
  const [percentCompleted, setPercentCompleted] = useState(0);
  const [subtasks, setSubtasks] = useState([]);
  const { tasks, setTasks } = useContext(TaskContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dateTime, setDateTime] = useState(new DateObject());
  const [currTask, setCurrTask] = useState({});

  useEffect(() => {
    const curr = tasks.find((task) => task.id === id);
    setCurrTask(curr);
    setTaskName(curr.name);
    setPercentCompleted(curr.percentCompleted);
    setSubtasks(curr.subtasks);
    setDateTime(curr.dueDateTime);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calcPercentComplete = (subtasks) => {
    const percent =
      (subtasks.filter((sub) => sub.completed).length / subtasks.length) * 100;
    return Math.round(percent);
  };

  const handleAddSubtask = () => {
    const newSubtasks = [...subtasks, { name: "", completed: false }];
    setPercentCompleted(calcPercentComplete(newSubtasks));
    setSubtasks(newSubtasks);
  };

  const handleChange = (event, index) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index].name = event.target.value;
    setSubtasks(newSubtasks);
  };

  const handleRemove = (index) => {
    const newSubtasks = [...subtasks];
    newSubtasks.splice(index, 1);
    setPercentCompleted(calcPercentComplete(newSubtasks));
    setSubtasks(newSubtasks);
  };

  const handleSubmit = () => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.name = taskName;
        task.subtasks = subtasks;
        task.percentCompleted = percentCompleted;
        task.dueDateTime = dateTime
      }
      return task
    });


    setTasks(newTasks);
    localStorage.setItem("crud-25-tasks", JSON.stringify(newTasks));
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      navigate(`/readtasks`);
    }, 2000);
  };
  return (
    <div className="">
      <Link to={`/readtasks`}>Back</Link>
      <h3>UpdateTask: {currTask.name}</h3>
      <p style={{ color: "blue", fontSize: "20px" }}>{percentCompleted}%</p>
      <input
        type="text"
        placeholder="Task"
        onChange={(e) => setTaskName(e.target.value)}
        value={taskName}
      />
      <DatePicker
        value={dateTime}
        onChange={setDateTime}
        format="MM/DD/YYYY HH:mm:ss"
        plugins={[<TimePicker position="bottom" />]}
      />
      <div>
        {subtasks.map((subtask, index) => {
          return (
            <div>
              <input
                type="text"
                placeholder="Subtask"
                value={subtask.name}
                onChange={(e) => handleChange(e, index)}
                autoFocus
              />
              <button onClick={() => handleRemove(index)}>Remove</button>
            </div>
          );
        })}
        <button onClick={handleAddSubtask}>Add</button>{" "}
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {isUpdating && <Msg>Updating...</Msg>}
    </div>
  );
};

export default UpdateTask;
