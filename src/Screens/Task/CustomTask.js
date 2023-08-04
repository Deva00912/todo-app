import React, { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import InputBox from "../../Components/InputBox/InputBox";
import uuid from "react-uuid";

export default function Tasks(props) {
  const [entry, setEntry] = useState({
    userId: props.auth.loggedUser?.id,
    entry: "",
    taskId: "",
  });
  const [showTask, setShowTask] = useState(props.task.findTask());
  const [submit, setSubmit] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (submit) {
      setShowTask(props.task.findTask());
      setSubmit(false);
    }
    if (edit) {
      setEdit(false);
    }
  }, [props.task, edit, submit]);

  function logOut() {
    localStorage.removeItem("LoggedUsers");
    props.navigate("/login");
  }

  return (
    <>
      <Button
        className="margin-5px height-40px width-80px padding-8px background-color-teal-blue color-white border-radius-6px border-0px align-item-center font-family-times-new-roman font-size-100-percent line-height-16px"
        value="Logout"
        onClick={() => {
          logOut();
        }}
      />
      <form
        onChange={(e) => {
          setEntry({
            ...entry,
            [e.target.name]: e.target.value,
            taskId: uuid(),
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
            >
              {data.entry}
              <div
                value="Edit"
                onClick={() => {
                  setEdit(true);
                  props.task.taskList[index] = entry;
                  props.task.addTask(showTask[index]);
                }}
              >
                Edit
              </div>
              <div
                value="Delete"
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
    </>
  );
}
