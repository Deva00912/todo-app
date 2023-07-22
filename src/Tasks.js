import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "./InputBox";
import Button from "./Button";
import "./styles/register.css";

export default function Tasks() {
  const [task, setTask] = useState({ entry: "" });
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
    navigate("/");
  };

  useEffect(() => {
    if (submit) {
      if (JSON.parse(localStorage.getItem("Tasks"))) {
        setList(JSON.parse(localStorage.getItem("Tasks")));
        setSubmit(false);
      }
    }
    // eslint-disable-next-line
  }, [JSON.parse(localStorage.getItem("Tasks")), submit]);

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
          if (list) {
            d = [...list, task];
          }
          localStorage.setItem("Tasks", JSON.stringify(d));
          setSubmit(true);
        }}
      >
        <InputBox placeholder="Entry" type="type" name="entry" />
        <Button className="btn" type="submit" value="Save" />
        {/* <Button
          className="btn"
          type="button"
          onClick={() => {
            console.log("Hello");
          }}
          value="Delete"
        /> */}
      </form>
      <div
        className="listViewTasks"
        style={{
          color: "white",
          display: "flex",
          // justifyContent: "center",
          flexDirection: "column",
          width:"300px",
        }}
      >
        {list?.map((data, index) => (
          <>
            {/* <input type="checkbox" /> */}
            <div className="list-view">
              {data.entry}
              <Button
                className="btn"
                type="button"
                onClick={() => {
                  console.log("Hello");
                }}
                value="Delete"
              />
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
