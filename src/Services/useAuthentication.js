import { useEffect, useState } from "react";

export function useAuth(props) {
  const [allUser, setAllUser] = useState(
    localStorage.getItem("Users")
      ? JSON.parse(localStorage.getItem("Users")).length > 0
        ? JSON.parse(localStorage.getItem("Users"))
        : []
      : []
  );
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("LoggedInUsers")
      ? Object.values(JSON.parse(localStorage.getItem("LoggedInUsers")))
          .length > 0
        ? JSON.parse(localStorage.getItem("LoggedInUsers"))
        : {}
      : {}
  );

  useEffect(() => {
    localStorage.setItem("Users", JSON.stringify(allUser));
    localStorage.setItem("LoggedInUsers", JSON.stringify(loggedInUser));
  }, [allUser, loggedInUser]);

  const isLoggedPresent = () => {
    if (!JSON.parse(localStorage.getItem("LoggedInUsers"))) {
      setLoggedInUser({});
    }
    if (!JSON.parse(localStorage.getItem("Users"))) {
      setLoggedInUser({});
      setAllUser([]);
    }
  };
  useEffect(() => {
    window.addEventListener("storage", isLoggedPresent);

    return () => {
      window.removeEventListener("storage", isLoggedPresent);
    };
    // eslint-disable-next-line
  }, []);

  function setUserData(user, id) {
    if (!user) {
      throw new Error("Invalid parameters");
    } else {
      setAllUser([...allUser, user]);
      setLoggedInUser(user);
    }
  }

  function checkUsernameAvailability(user) {
    if (!user) {
      throw new Error("Invalid parameters");
    } else {
      const findUser = allUser.find(
        (userData) => userData?.userName === user.userName
      );
      if (findUser === null || findUser === undefined) {
        return true;
      }
      if (Object.values(findUser).length) {
        throw new Error("User already exists!");
      }
    }
  }

  function checkAndGetUserDetails(user) {
    if (!user) {
      throw new Error("Invalid parameters");
    } else {
      const findUser = allUser.find(
        (userData) => userData?.userName === user.userName
      );
      if (findUser === null || findUser === undefined) {
        return true;
      }
      if (Object.values(findUser).length) {
        return findUser;
      }
    }
  }

  function logInUser(user) {
    localStorage.setItem("LoggedInUsers", JSON.stringify(user));
    setLoggedInUser(user);
  }
  function logOut() {
    localStorage.setItem("LoggedInUsers", JSON.stringify({}));
    setLoggedInUser({});
  }

  return {
    allUser,
    loggedInUser,
    setUserData,
    checkUsernameAvailability,
    checkAndGetUserDetails,
    logOut,
    logInUser,
    isLoggedPresent,
  };
}
