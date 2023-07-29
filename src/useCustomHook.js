import { useEffect, useState } from "react";

export function useAuth(val) {
  const [getUser, setGetUser] = useState([]);
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

  function setUserData(user) {
    if (!user) {
      throw new Error("Invalid parameters");
    } else {
      const data =
        localStorage.getItem("Users") &&
        JSON.parse(localStorage.getItem("Users")).length > 0
          ? JSON.parse(localStorage.getItem("Users"))
          : [];
      data.push(user);
      localStorage.setItem("UserData", JSON.stringify(data));
    }
  }

  function isUser(user) {
    if (!user) {
        throw new Error("Invalid parameters");
    } else {
      const ch = user.find((ele) => ele?.uName === user.uName);
      if (ch === null || ch === undefined) {
        return false;
      }
      if (Object.values(ch)?.length) {
        throw new Error("User already exists!");
      }
    }
  }
  return [getUser, setUserData];
}
