import React, { useState } from "react";
import InputBox from "./InputBox";
import Button from "./Button";

export default function TasksId() {
  const [task, setTask] = useState({ id : "", entry: "" });
  const [list, setList] = useState(
    localStorage.getItem("Tasks") &&
      Object.values(JSON.parse(localStorage.getItem("Tasks"))).length > 0
      ? JSON.parse(localStorage.getItem("Tasks"))
      : []
  );
  const [user, setUser] = useState(
    localStorage.getItem("LoggedUsers") &&
      Object.values(JSON.parse(localStorage.getItem("LoggedUsers"))).length > 0
      ? JSON.parse(localStorage.getItem("LoggedUsers"))
      : []
  );
  return (
    <div>
      <form
      onChange={(e)=>{
        setTask({ ...task,[e.target.name]: e.target.value });
      }}
      >
        <InputBox placeholder="Entry" type="text" name="entry" />
        <Button type="submit" value="save"/>
      </form>
    </div>
  );
}
