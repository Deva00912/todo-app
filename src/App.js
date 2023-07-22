// import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Login";
import Register from "./RegisterForm";
import "./styles/App.css";
import Tasks from "./Tasks";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const ProtectedRoute = ({ children, isLogged }) => {
    if (!isLogged) {
      navigate("/");
    } else {
      return children;
    }
  };
  useEffect(() => {
    if (
      localStorage.getItem("LoggedUsers") &&
      Object.values(JSON.parse(localStorage.getItem("LoggedUsers")))?.length > 0
    ) {
      navigate("/tasks");
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [localStorage]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute
              isLogged={
                localStorage.getItem("LoggedUsers") &&
                Object.values(JSON.parse(localStorage.getItem("LoggedUsers")))
                  ?.length > 0
                  ? true
                  : false
              }
            >
              <Tasks />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
