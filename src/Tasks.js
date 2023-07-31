import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "./InputBox";
import Button from "./Button";
import "./styles/register.css";
import uuid from "react-uuid";

export default function Tasks() {
  const loggedUser =
    localStorage.getItem("LoggedUsers") &&
    Object.values(JSON.parse(localStorage.getItem("LoggedUsers"))).length > 0
      ? JSON.parse(localStorage.getItem("LoggedUsers"))
      : {};

  const [task, setTask] = useState({
    userId: loggedUser?.id,
    entry: "",
    taskId: "",
  });

  const [list, setList] = useState(
    localStorage.getItem("Tasks") &&
      Object.values(JSON.parse(localStorage.getItem("Tasks")))?.length > 0
      ? JSON.parse(localStorage.getItem("Tasks"))
      : []
  );

  const [edit, setEdit] = useState(false);
  const [listTask, setListTask] = useState([]);
  const [submit, setSubmit] = useState(false);

  const navigate = useNavigate();
  const logOut = () => {
    localStorage.setItem("Tasks", JSON.stringify(list));
    localStorage.removeItem("LoggedUsers");
    navigate("/login");
  };

  useEffect(() => {
    if (submit) {
      if (JSON.parse(localStorage.getItem("Tasks"))) {
        localStorage.setItem("Tasks", JSON.stringify(list));
        setSubmit(false);
      }
    }
    if (edit) {
      localStorage.setItem("Tasks", JSON.stringify(list));
      setEdit(false);
    }

    findTask();
    // eslint-disable-next-line
  }, [submit, edit, list]);

  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(list));
  }, [list]);

  const findTask = () => {
    const filterTask = list.filter((task) => task.userId === loggedUser?.id);
    setListTask(filterTask);
  };

  const deleteTask = (taskDeleteId) => {
    const keepList = list.filter((task) => task.taskId !== taskDeleteId);
    setList(keepList);
    localStorage.setItem("Tasks", JSON.stringify(list));
  };

  return (
    <div>
      <Button className="btn" value="Log out" onClick={logOut} />
      <form
        onChange={(e) => {
          setTask({
            ...task,
            [e.target.name]: e.target.value,
            taskId: uuid(),
          });
        }}
        onSubmit={(e) => {
          e.preventDefault();
          setList([...list, task]);
          setSubmit(true);
          findTask();
        }}
      >
        <InputBox
          placeholder="Entry"
          type="type"
          name="entry"
          className="input-box"
        />
        <Button className="btn" type="submit" value="Save" />
      </form>
      <div
        className="listViewTasks"
        style={{
          color: "white",
          display: "flex",
          flexDirection: "column",
          width: "300px",
        }}
      >
        {listTask.length > 0 &&
          listTask?.map((data, index) => (
            <div key={index} className="list-view">
              {data.entry}
              <Button
                className="btn"
                value="Edit"
                type="button"
                onClick={() => {
                  setEdit(true);
                  list[index] = task;
                }}
              />
              <Button
                className="btn"
                value="Delete"
                type="button"
                onClick={() => {
                  const taskDeleteId = listTask[index].taskId;
                  deleteTask(taskDeleteId);
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
