import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Screens/Login/Login";
import Register from "./Screens/Register/Register";
import Tasks from "./Screens/Task/Tasks";
import { useAuth } from "./Services/Hooks/useAuthentication.js";
import { useTasks } from "./Services/Hooks/useTasks.js";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
import { connect } from "react-redux";

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

function App(props) {
  const navigate = useNavigate();
  const auth = useAuth();
  const task = useTasks(auth);

  const handleErrorBoundaryOnClick = () => {
    auth.logOut();
    window.location.reload();
  };

  const checkedLoggedUser = () => {
    if (process.env.REACT_APP_STAGING === "saga") {
      return props.auth.data && typeof props.auth.data.userId === "string"
        ? true
        : false;
    } else {
      return auth.loggedInUser && typeof auth.loggedInUser.userId === "string"
        ? true
        : false;
    }
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
              <PublicRoute isLogged={checkedLoggedUser()}>
                <Login navigate={navigate} auth={auth} />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute isLogged={checkedLoggedUser()}>
                <Register navigate={navigate} auth={auth} />
              </PublicRoute>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute isLogged={checkedLoggedUser()}>
                <Tasks
                  navigate={navigate}
                  auth={
                    process.env.REACT_APP_STAGING === "saga" ? props.auth : auth
                  }
                  task={
                    process.env.REACT_APP_STAGING === "saga" ? props.task : task
                  }
                />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer autoClose={1000} theme="dark" />
      </ErrorBoundary>
    </>
  );
}

const mapStateToProps = function (state) {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = function () {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
