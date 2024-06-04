import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { TaskContext } from "../context/TaskProvider";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const Msg = styled.p`
  color: blue;
  font-size: 22px;
`;

const CreateTask = () => {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");
  const [percentCompleted, setPercentCompleted] = useState(0);
  const [subtasks, setSubtasks] = useState([]);
  const { tasks, setTasks } = useContext(TaskContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dateTime, setDateTime] = useState(new DateObject());

  const handleAddSubtask = () => {
    const newSubtasks = [...subtasks, { name: "", completed: false }];
    setSubtasks(newSubtasks);
  };

  const handleChange = (event, index) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index].name = event.target.value;
    setSubtasks(newSubtasks);
  };

  const handleRemove = (index) => {
    const newSubtask = [...subtasks];
    newSubtask.splice(index, 1);
    setSubtasks(newSubtask);
  };

  const handleSubmit = () => {
    const newTask = {};
    newTask.id = uuid();
    newTask.name = taskName;
    newTask.subtasks = subtasks;
    newTask.percentCompleted = 0;
    if (dateTime instanceof DateObject) {
      // newTask.dueDateTime = dateTime.toDate().getTime();
      newTask.dueDateTime = dateTime
    }

    const newTasks = [...tasks, newTask];
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
      <h3>CreateTask</h3>
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

export default CreateTask;
