import { useEffect, useState } from "react";

export function useAuth(val) {
  const [getUser, setGetUser] = useState([]);
  const loggedUser = localStorage.getItem("LoggedUsers")
    ? Object.values(JSON.parse(localStorage.getItem("LoggedUsers"))).length > 0
      ? JSON.parse(localStorage.getItem("LoggedUsers"))
      : {}
    : {};
  useEffect(() => {
    function readUser() {
      const data =
        localStorage.getItem("Users") &&
        JSON.parse(localStorage.getItem("Users")).length > 0
          ? JSON.parse(localStorage.getItem("Users"))
          : [];
      setGetUser(data);
    }
    readUser();
  }, [val]);

  function setUserData(user, id) {
    if (!user) {
      throw new Error("Invalid parameters");
    } else {
      const data =
        localStorage.getItem("Users") &&
        JSON.parse(localStorage.getItem("Users")).length > 0
          ? JSON.parse(localStorage.getItem("Users"))
          : [];
      data.push(user);
      localStorage.setItem("Users", JSON.stringify(data));
    }
  }

  function isUser(user) {
    const data =
      localStorage.getItem("Users") &&
      JSON.parse(localStorage.getItem("Users")).length > 0
        ? JSON.parse(localStorage.getItem("Users"))
        : [];
    if (!user) {
      throw new Error("Invalid parameters");
    } else {
      const loggedData = data.find(
        (element) => element?.userName === user.userName
      );
      if (loggedData === null || loggedData === undefined) {
        return true;
      }
      if (Object.values(loggedData).length) {
        throw new Error("User already exists!");
      }
    }
  }
  function isUserLogin(user) {
    const data =
      localStorage.getItem("Users") &&
      JSON.parse(localStorage.getItem("Users")).length > 0
        ? JSON.parse(localStorage.getItem("Users"))
        : [];
    if (!user) {
      throw new Error("Invalid parameters");
    } else {
      const loggedData = data.find(
        (element) => element?.userName === user.userName
      );
      if (loggedData === null || loggedData === undefined) {
        return false;
      }
      if (Object.values(loggedData).length) {
        return loggedData;
      }
    }
  }

  return { getUser, loggedUser, setUserData, isUser, isUserLogin };
}
