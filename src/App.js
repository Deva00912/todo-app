import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Screens/Login/Login";
import Register from "./Screens/Register/RegisterForm";
import Tasks from "./Screens/Task/Tasks";
import { useAuth } from "./Services/useAuthentication";
import { useTasks } from "./Services/useTasks";

function App() {
  const navigate = useNavigate();
  const auth = useAuth();
  const task = useTasks();

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
    if (JSON.parse(localStorage.getItem("LoggedUsers"))) {
      navigate("/");
    }
  };
  useEffect(() => {
    window.addEventListener("storage", isLoggedPresent);
    return () => {
      window.removeEventListener("storage", isLoggedPresent);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<Login navigate={navigate} auth={auth} />}
        />
        <Route
          path="/register"
          element={<Register navigate={navigate} auth={auth} />}
        />
        <Route
          path="/*"
          element={
            <ProtectedRoute
              isLogged={
                localStorage.getItem("Users")
                  ? Object.values(JSON.parse(localStorage.getItem("Users")))
                      ?.length > 0
                    ? true
                    : false
                  : false
              }
            >
              <Register navigate={navigate} auth={auth} />
            </ProtectedRoute>
          }
        />

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
              <Tasks navigate={navigate} auth={auth} task={task} />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
