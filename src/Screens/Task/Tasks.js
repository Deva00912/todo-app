import React, { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import InputBox from "../../Components/InputBox/InputBox";
import uuid from "react-uuid";

export default function Tasks(props) {
  const [entry, setEntry] = useState({
    userId: props.auth.loggedUser?.id,
    entry: "",
    taskId: "",
    timestamp: "",
  });
  const [showTask, setShowTask] = useState(props.task.getUserTasks());
  const [clicked, setClicked] = useState("");
  const [submit, setSubmit] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (submit) {
      setShowTask(props.task.getUserTasks());
      setSubmit(false);
    }
    if (edit) {
      setEdit(false);
    }
  }, [props.task, edit, submit, clicked]);

  function logOut() {
    localStorage.removeItem("LoggedUsers");
    props.navigate("/login");
  }

  return (
    <>
      <form
        onChange={(e) => {
          setEntry({
            ...entry,
            [e.target.name]: e.target.value,
            taskId: uuid(),
            timestamp: +new Date(),
          });
        }}
        onSubmit={(e) => {
          e.preventDefault();
          setSubmit(true);
          props.task.addTask(entry);
        }}
      >
        <InputBox
          placeholder="Write your tasks..."
          type="textarea"
          name="entry"
        />
        <Button
          className={`${
            entry.entry.length > 0 ? "background-color-green" : ""
          }`}
          type="submit"
          value="+New task"
          disabled={entry.entry.length > 0 ? false : true}
        />
      </form>
      <div style={{ color: "white" }}>
        <h3 style={{ color: "white" }}>Tasks</h3>
        <br />
        {showTask.length > 0 ? (
          showTask?.map((data, index) => (
            <div
              style={{
                height: "60%",
                width: "60%",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridGap: 20,
              }}
              key={index}
              onClick={() => {
                setClicked(data.taskId);
              }}
            >
              <div
                style={{
                  textDecoration: `${
                    data.taskId === clicked ? "line-through" : "none"
                  }`,
                }}
              >
                {data.entry}
              </div>
              <div
                value="Edit"
                style={{
                  cursor: "pointer",
                  textDecoration: `${
                    data.taskId === clicked ? "line-through" : "none"
                  }`,
                }}
                onClick={() => {
                  const taskDeleteId = showTask[index].taskId;
                  props.task.editTask(taskDeleteId, entry);
                  setEdit(true);
                }}
              >
                Edit
              </div>
              <div
                value="Delete"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const taskDeleteId = showTask[index].taskId;
                  props.task.deleteTask(taskDeleteId);
                  setSubmit(true);
                }}
              >
                Delete
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Button
          className="margin-5px height-40px width-80px padding-8px background-color-teal-blue color-white border-radius-6px border-0px align-item-center font-family-times-new-roman font-size-100-percent line-height-16px"
          value="Clear all Tasks"
          onClick={() => {
            props.task.clearAllTask();
            setSubmit(true);
          }}
        />
        <Button
          className="margin-5px height-40px width-80px padding-8px background-color-teal-blue color-white border-radius-6px border-0px align-item-center font-family-times-new-roman font-size-100-percent line-height-16px"
          value="Logout"
          onClick={() => {
            logOut();
          }}
        />
      </div>
    </>
  );
}
