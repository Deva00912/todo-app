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
      navigate("/login");
    } else {
      return children;
    }
  };
  const isLoggedPresent = () => {
    if (
      !JSON.parse(localStorage.getItem("Users")) ||
      !JSON.parse(localStorage.getItem("LoggedUsers"))
    ) {
      navigate("/login");
    }
  };
  useEffect(() => {
    window.addEventListener("storage", isLoggedPresent);

    return () => {
      window.removeEventListener("storage", isLoggedPresent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login navigate={navigate} />} />
        <Route path="/register" element={<Register navigate={navigate} />} />
        <Route
          path="/"
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
              <Tasks navigate={navigate} />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
