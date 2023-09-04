import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Screens/Login/Login";
import Register from "./Screens/Register/Register";
import Tasks from "./Screens/Task/Tasks";
import { useAuth } from "./Services/useAuthentication.js";
import { useTasks } from "./Services/useTasks.js";

function App() {
  const navigate = useNavigate();
  const auth = useAuth({ navigate: navigate });
  const task = useTasks(auth);

  const ProtectedRoute = ({ children, isLogged }) => {
    if (!isLogged) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  };

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
                auth.loggedInUser &&
                typeof auth.loggedInUser.userId === "string"
                  ? true
                  : false
              }
            >
              <Tasks navigate={navigate} auth={auth} task={task} />
            </ProtectedRoute>
          }
        />
      </Routes>

      <dt>
        <ToastContainer autoClose={1000} />
      </dt>
    </>
  );
}

export default App;
