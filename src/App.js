import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Screens/Login/Login";
import Register from "./Screens/Register/RegisterForm";
import Tasks from "./Screens/Task/Tasks";
import { useAuth } from "./Services/useAuthentication";
import { useTasks } from "./Services/useTasks";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const auth = useAuth({ navigate: navigate });
  const task = useTasks(auth.loggedInUser);

  const ProtectedRoute = ({ children, isLogged }) => {
    if (!isLogged) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  };

  useEffect(() => {
    if (Object.values(auth.loggedInUser).length === 0) {
      navigate("/login");
    } else {
      navigate("/");
    }
    if (Object.values(auth.allUser).length === 0) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [auth.loggedInUser]);

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
          path="/"
          element={
            <ProtectedRoute
              isLogged={
                auth.loggedInUser && typeof auth.loggedInUser.id === "string"
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
