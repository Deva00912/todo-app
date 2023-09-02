import React, { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import InputBox from "../../Components/InputBox/InputBox";
import "./Tasks.css";
import { toast } from "react-toastify";

export default function Tasks(props) {
  const [entry, setEntry] = useState({
    userId: props.auth.loggedInUser?.userId,
    entry: "",
  });
  const [showTask, setShowTask] = useState([]);
  const [clicked, setClicked] = useState("");
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    props.task
      .getIndividualUserTasks(props.auth.loggedInUser?.userId)
      .then((userTasks) => {
        setShowTask(userTasks.data);
      });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (create) {
      props.task
        .getIndividualUserTasks(props.auth.loggedInUser?.userId)
        .then((userTasks) => {
          setShowTask(userTasks.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
      setCreate(false);
    }
    if (edit) {
      props.task
        .getIndividualUserTasks(props.auth.loggedInUser?.userId)
        .then((userTasks) => {
          setShowTask(userTasks.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
      setEdit(false);
    }
    // eslint-disable-next-line
  }, [edit, create, clicked]);

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
              });
            }}
            onSubmit={(e) => {
              e.preventDefault();
              props.task
                .addTask(entry)
                .then((task) => {
                  setCreate(true);
                })
                .catch((error) => {
                  toast.error(error);
                });
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
                <div /*className="margin-4px padding-8px width-inherit display-flex background-color-teal-blue justify-content-space-evenly height-40px border-radius-8px" */
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
                    data-cy="editButton"
                    style={{
                      cursor: "pointer",
                      textDecoration: `${
                        data.taskId === clicked ? "line-through" : "none"
                      }`,
                    }}
                    onClick={() => {
                      const taskEditId = showTask[index].taskId;
                      props.task
                        .editTask(taskEditId, entry.entry)
                        .then((editedTask) => {
                          setEdit(true);
                          toast.success("Task Edited");
                        })
                        .catch((error) => {
                          toast.error(error.message);
                        });
                    }}
                    disabled={data.taskId === clicked ? true : false}
                  >
                    Edit
                  </div>
                  <div
                    value="Delete"
                    data-cy="deleteButton"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      props.task
                        .deleteTask(showTask[index].taskId)
                        .then((response) => {
                          setCreate(true);
                          toast.success("Task deleted");
                        })
                        .catch((error) => {
                          toast.error(error.message);
                        });
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
              toast.success("Cleared all tasks");
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
