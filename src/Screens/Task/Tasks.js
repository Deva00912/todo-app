import React, { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import InputBox from "../../Components/InputBox/InputBox";
import uuid from "react-uuid";
import "./Tasks.css";
import { toast } from "react-toastify";

export default function Tasks(props) {
  const [entry, setEntry] = useState({
    userId: props.auth.loggedInUser?.id,
    entry: "",
    taskId: "",
    timestamp: "",
  });
  const [showTask, setShowTask] = useState(props.task.getIndividualUserTasks());
  const [clicked, setClicked] = useState("");
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (create) {
      setShowTask(props.task.getIndividualUserTasks());
      setCreate(false);
    }
    if (edit) {
      setEdit(false);
    }
  }, [props.task, edit, create, clicked]);

  function logOut() {
    props.auth.logOut();
    props.navigate("/login");
  }

  return (
    <>
      <div className=" height-100-percent display-flex flex-direction-column align-item-center justify-content-center">
        <div>
          <h1 className="color-white">ToDo list</h1>
        </div>
        <div>
          <form
            className="display-flex flex-direction-row align-item-center"
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
              props.task.addTask(entry);
              setCreate(true);
            }}
          >
            <InputBox
              placeholder="Write your tasks..."
              type="textarea"
              name="entry"
              datacy="taskEntry"
            />
            <Button
              className={`${
                entry.entry.length > 0 ? "background-color-green" : ""
              } height-44px`}
              type="submit"
              value="Add task"
              datacy="addTask"
              disabled={entry.entry.length > 0 ? false : true}
            />
          </form>
        </div>
        <div className="margin-8px color-white">
          <h3>Tasks</h3>
        </div>

        <div>
          <div className="showBox">
            {showTask.length > 0 ? (
              showTask?.map((data, index) => (
                <div
                  style={{
                    margin: "2px",
                    height: "100%",
                    width: "100%",
                    color: "white",
                    // display: "flex",
                    // flexDirection: "row",
                    // justifyContent: "space-evenly",
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
                    datacy="editButton"
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
                      toast.success("Task Edited");
                    }}
                    disabled={data.taskId === clicked ? true : false}
                  >
                    Edit
                  </div>
                  <div
                    value="Delete"
                    datacy="deleteButton"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      props.task.deleteTask(showTask[index].taskId);
                      setCreate(true);
                      toast.success("Task deleted");
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
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Button
            className=" width-fit-content white-space-nowrap"
            value="Clear all Tasks"
            datacy="clearAllTasksButton"
            onClick={() => {
              props.task.clearUserTask();
              setCreate(true);
            }}
          />
          <Button
            className="width-fit-content"
            datacy="logOutButton"
            value="Logout"
            onClick={() => {
              logOut();
              toast.success("Logout successful");
            }}
          />
        </div>
      </div>
    </>
  );
}
