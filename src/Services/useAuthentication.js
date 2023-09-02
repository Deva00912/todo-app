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

  function setUserData(user) {
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
        // throw new Error("User does not exists!");
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
        throw new Error("User does not exists!");
      }
      if (Object.values(findUser).length) {
        return findUser;
      }
    }
  }

  function logInUser(user) {
    setLoggedInUser(user);
  }

  function logOut() {
    // localStorage.setItem("LoggedInUsers", JSON.stringify({}));
    setLoggedInUser({});
  }

  function checkUserCredentials(user) {
    if (!user) {
      throw new Error("Invalid parameters");
    } else {
      const findUser = allUser.find(
        (userData) => userData?.userName === user.userName
      );
      if (findUser === null || findUser === undefined) {
        throw new Error("User does not exists!");
      }
      if (!(findUser?.password === user?.password)) {
        throw new Error("Password does not match");
      }
    }
  }

  return {
    allUser,
    loggedInUser,
    setUserData,
    checkUsernameAvailability,
    checkAndGetUserDetails,
    logOut,
    logInUser,
    checkUserCredentials,
  };
}
