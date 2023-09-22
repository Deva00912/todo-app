import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Screens/Login/Login";
import Register from "./Screens/Register/Register";
import Tasks from "./Screens/Task/Tasks";
import { useAuth } from "./Services/Hooks/useAuthentication.js";
import { useTasks } from "./Services/Hooks/useTasks.js";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";

const ProtectedRoute = ({ children, isLogged }) => {
  if (!isLogged) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

const PublicRoute = ({ children, isLogged }) => {
  if (isLogged) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  const navigate = useNavigate();
  const auth = useAuth();
  const task = useTasks(auth);

  const handleErrorBoundaryOnClick = () => {
    auth.logOut();
    window.location.reload();
  };

  return (
    <>
      <ErrorBoundary
        handleErrorBoundaryOnClick={() => {
          handleErrorBoundaryOnClick();
        }}
        navigate={navigate}
      >
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute
                isLogged={
                  auth.loggedInUser &&
                  typeof auth.loggedInUser.userId === "string"
                    ? true
                    : false
                }
              >
                <Login navigate={navigate} auth={auth} />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute
                isLogged={
                  auth.loggedInUser &&
                  typeof auth.loggedInUser.userId === "string"
                    ? true
                    : false
                }
              >
                <Register navigate={navigate} auth={auth} />
              </PublicRoute>
            }
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
      </ErrorBoundary>
    </>
  );
}

export default App;
