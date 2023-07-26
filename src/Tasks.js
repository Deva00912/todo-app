import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "./InputBox";
import Button from "./Button";
import "./styles/register.css";
// import Login from "./Login";

export default function Tasks() {
  const [task, setTask] = useState({ id: "", entry: "" });
  const [edit, setEdit] = useState(false);
  const [list, setList] = useState(
    localStorage.getItem("Tasks") &&
      Object.values(JSON.parse(localStorage.getItem("Tasks")))?.length > 0
      ? JSON.parse(localStorage.getItem("Tasks"))
      : []
  );
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
        setList(JSON.parse(localStorage.getItem("Tasks")));
        setSubmit(false);
      }
    }
    if (edit) {
      localStorage.setItem("Tasks", JSON.stringify(list));
      setEdit(false);
    }

    // eslint-disable-next-line
  }, [submit, edit]);

  // useEffect(() => {
  //   // eslint-disable-next-line
  // }, [localStorage.getItem("Users"), localStorage.getItem("LoggedUsers")]);

  console.log(task, "task");

  return (
    <div>
      <Button className="btn" value="Log out" onClick={logOut} />
      <form
        onChange={(e) => {
          setTask({ ...task, [e.target.name]: e.target.value });
        }}
        onSubmit={(e) => {
          e.preventDefault();
          let d = [];
          if (list && list.length > 0) {
            d = [...list, task];
          } else {
            d.push(task);
          }
          localStorage.setItem("Tasks", JSON.stringify(d));
          setSubmit(true);
        }}
      >
        <InputBox placeholder="Entry" type="type" name="entry" />
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
        {list.length > 0 &&
          list?.map((data, index) => (
            <div className="list-view">
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
                  list.splice(index, 1);
                  setList([...list]);
                  localStorage.setItem("Tasks", JSON.stringify(list));
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
