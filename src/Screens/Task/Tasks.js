import React, { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import InputBox from "../../Components/InputBox/InputBox";
import "./Tasks.css";
import { toast } from "react-toastify";
import uuid from "react-uuid";
import { taskActions } from "../../Redux/Saga/tasksSaga";
import { authActions } from "../../Redux/Saga/authSaga";
import { connect } from "react-redux";

function Tasks(props) {
  console.log("props", props);
  const [entry, setEntry] = useState({
    userId:
      process.env.REACT_APP_STAGING === "saga"
        ? props.auth.data.userId
        : props.auth.loggedInUser?.userId,
    entry: "",
  });
  const [showTask, setShowTask] = useState([]);
  const [clicked, setClicked] = useState("");
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);

  //Redux - Saga

  useEffect(() => {
    getUserTasksAndShowTasks();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (create) {
      getUserTasksAndShowTasks();
      setCreate(false);
    }
    if (edit) {
      getUserTasksAndShowTasks();
      setEdit(false);
    }

    // eslint-disable-next-line
  }, [create, edit, clicked]);

  //Saga
  useEffect(() => {
    setShowTask(props.task.userTasks);
  }, [props.task.userTasks]);

  const getUserTasksAndShowTasks = async () => {
    if (process.env.REACT_APP_STAGING === "saga") {
      taskActions.getUserTasks(props.auth.data.userId);
    } else {
      try {
        const getTasks = await props.task.getIndividualUserTasks(
          props.auth.loggedInUser?.userId
        );
        setShowTask(getTasks);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const logOut = () => {
    if (process.env.REACT_APP_STAGING === "saga") {
      authActions.logOut();
    } else {
      props.auth.logOut();
      toast.success("Logout successful");
    }
    props.navigate("/login");
  };

  const handleAddTask = async () => {
    if (process.env.REACT_APP_STAGING === "saga") {
      taskActions.addTask(entry);
      setCreate(true);
    } else {
      try {
        await props.task.addTask(
          process.env.REACT_APP_STAGING === "local"
            ? { ...entry, taskId: uuid() }
            : entry
        );
        setCreate(true);
        toast.success("Task Added");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleEditTask = async (taskEditId, entry) => {
    if (process.env.REACT_APP_STAGING === "saga") {
      taskActions.editTask({
        taskId: taskEditId,
        entry: entry.entry,
        userId: props.auth.data.userId,
      });
    } else {
      try {
        await props.task.editTask(taskEditId, entry);
        // setEdit(true);
        toast.success("Task Edited");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (process.env.REACT_APP_STAGING === "saga") {
      taskActions.deleteTask({
        taskId: taskId,
        userId: props.auth.data.userId,
      });
    } else {
      try {
        await props.task.deleteTask(taskId);
        setCreate(true);
        toast.success("Task deleted");
      } catch (error) {
        toast.error(error.message);
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
                      const taskEditId = showTask[index].taskId;
                      handleEditTask(taskEditId, entry);
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
                      handleDeleteTask(showTask[index].taskId);
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
              taskActions.clearUserTasks();
              logOut();
            }}
          />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = function (state) {
  return {
    tasks: state.tasks,
  };
};

const mapDispatchToProps = function () {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
