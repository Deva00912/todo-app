import React, { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import InputBox from "../../Components/InputBox/InputBox";
import "./Tasks.css";
import { toast } from "react-toastify";
import uuid from "react-uuid";
import { connect } from "react-redux";
import { logOut } from "../../Redux/Authentication/action";
import {
  addTask,
  clearUserTasks,
  deleteTask,
  editTask,
  getUserTasks,
} from "../../Redux/Tasks/action";
import {
  addTaskFDB,
  deleteTaskFDB,
  updateTaskFDB,
} from "../../Database/Firebase/useListenTasks";

function Tasks(props) {
  const [entry, setEntry] = useState({
    email:
      process.env.REACT_APP_STAGING === "saga"
        ? props.auth.data.email
        : props.auth.loggedInUser?.email,
    entry: "",
  });
  const [showTask, setShowTask] = useState([]);
  const [clicked, setClicked] = useState("");
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);

  //Redux - Saga
  useEffect(() => {
    getUserTasksAndShowTasks("mount-change");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // getUserTasksAndShowTasks();
    if (process.env.REACT_APP_DATABASE !== "firebase") {
      withoutFirebase();
    }
    // eslint-disable-next-line
  }, [create, edit, clicked]);

  // Saga
  useEffect(() => {
    setShowTask(props.tasks?.userTasks);
  }, [props.tasks?.userTasks]);

  const withoutFirebase = () => {
    if (create) {
      getUserTasksAndShowTasks(false);
      setCreate(false);
    }
    if (edit) {
      getUserTasksAndShowTasks("edit-change");
      setEdit(false);
    }
  };

  const getUserTasksAndShowTasks = async () => {
    try {
      if (process.env.REACT_APP_STAGING === "saga") {
        // props.getUserTasks(props.auth.data.email, props.authToken);
      } else {
        if (process.env.REACT_APP_DATABASE === "firebase") {
          // await getUserTasksFDB(props.auth.data.email);
        } else {
          const getTasks = await props.task.getIndividualUserTasks(
            props.auth.loggedInUser?.email,
            props.auth.loggedInUser?.token
          );
          setShowTask(getTasks);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logOut = () => {
    if (process.env.REACT_APP_STAGING === "saga") {
      props.logOut();
    } else {
      props.auth.logOut();
      toast.success("Logout successful");
    }
    props.navigate("/login");
  };

  const handleAddTask = async () => {
    if (process.env.REACT_APP_STAGING === "saga") {
      props.addTask(entry, props.authToken);
    } else {
      if (process.env.REACT_APP_DATABASE === "firebase") {
        await addTaskFDB(entry);
        toast.success("Task Added");
      } else {
        await props.task.addTask(
          process.env.REACT_APP_STAGING === "local"
            ? { ...entry, taskId: uuid() }
            : entry,
          props.auth.loggedInUser?.token
        );
        // setCreate(true);
        toast.success("Task Added");
      }
    }
  };

  const handleEditTask = async (taskEditId, entry) => {
    if (process.env.REACT_APP_STAGING === "saga") {
      props.editTask(
        {
          taskId: taskEditId,
          entry: entry.entry,
          email: props.auth.data.email,
        },
        props.authToken
      );

      // setEdit(true);
    } else {
      if (process.env.REACT_APP_DATABASE === "firebase") {
        await updateTaskFDB(taskEditId, entry);
        toast.success("Task Edited");
      } else {
        await props.task.editTask(
          taskEditId,
          entry,
          props.auth.loggedInUser?.token
        );
        // setEdit(true);
        toast.success("Task Edited");
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (process.env.REACT_APP_STAGING === "saga") {
      props.deleteTask(
        {
          taskId: taskId,
          email: props.auth.data.email,
        },
        props.authToken
      );
    } else {
      if (process.env.REACT_APP_DATABASE === "firebase") {
        await deleteTaskFDB(taskId);
        toast.success("Task deleted");
      } else {
        await props.task.deleteTask(taskId, props.auth.loggedInUser?.token);
        // setCreate(true);
        toast.success("Task deleted");
      }
    }
  };

  const handleOnSubmit = () => {
    try {
      handleAddTask();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className=" height-100-percent display-flex flex-direction-column align-item-center justify-content-center">
        <div>
          <h1 className="color-white">ToDo list</h1>
        </div>
        <div>
          <form
            className="display-flex flex-direction-row align-item-center"
            onChange={(event) => {
              setEntry({
                ...entry,
                [event.target.name]: event.target.value,
              });
            }}
            onSubmit={(event) => {
              event.preventDefault();
              handleOnSubmit();
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
            {showTask?.length > 0 ? (
              showTask.map((data, index) => (
                <div
                  // className="margin-4px padding-8px width-inherit display-flex background-color-teal-blue justify-content-space-evenly height-40px border-radius-8px"
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
                    className={`${
                      data.taskId === clicked
                        ? "text-decoration-line-through"
                        : ""
                    }`}
                  >
                    {data.entry}
                  </div>
                  <div
                    className={`cursor-pointer`}
                    value="Edit"
                    data-cy="editButton"
                    onClick={() => {
                      try {
                        const taskEditId = showTask[index].taskId;
                        handleEditTask(taskEditId, entry);
                      } catch (error) {
                        toast.error(error.message);
                      }
                    }}
                    disabled={data.taskId === clicked ? true : false}
                  >
                    Edit
                  </div>
                  <div
                    className={`cursor-pointer`}
                    value="Delete"
                    data-cy="deleteButton"
                    onClick={() => {
                      try {
                        handleDeleteTask(showTask[index].taskId);
                      } catch (error) {
                        toast.error(error.message);
                      }
                    }}
                    disabled={data.taskId === clicked ? true : false}
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
        <div className="display-flex flex-direction-row">
          <Button
            className="width-fit-content"
            datacy="logOutButton"
            value="Logout"
            onClick={() => {
              if (process.env.REACT_APP_STAGING === "saga") {
                props.clearUserTasks();
              }
              logOut();
            }}
          />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = function (state) {
  if (process.env.REACT_APP_STAGING === "saga") {
    return {
      tasks: state.tasks,
      authToken: state.auth.data.token,
    };
  }
};

const mapDispatchToProps = function () {
  if (process.env.REACT_APP_STAGING === "saga") {
    return {
      addTask: (entry, token) => addTask(entry, token),
      editTask: (task, token) => editTask(task, token),
      deleteTask: (task, token) => deleteTask(task, token),
      getUserTasks: (email, token, mode) => getUserTasks(email, token, mode),
      clearUserTasks: () => clearUserTasks(),
      logOut: () => logOut(),
    };
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
