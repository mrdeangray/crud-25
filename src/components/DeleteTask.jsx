import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { TaskContext } from "../context/TaskProvider";

import { useEffect } from "react";

const Msg = styled.p`
  color: blue;
  font-size: 22px;
`;

const DeleteTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { tasks, setTasks } = useContext(TaskContext);
  const [isUpdating, setIsUpdating] = useState(false);

  const [currTask, setCurrTask] = useState({});

  useEffect(() => {
    const curr = tasks.find((task) => task.id === id);
    setCurrTask(curr);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = () => {
    const newTasks = tasks.filter((task) => task.id !== id);
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
<div>
  <button onClick={handleDelete}>Delete {currTask.name} </button>
</div>
      

      {isUpdating && <Msg>Updating...</Msg>}
    </div>
  );
};

export default DeleteTask;
