import { useEffect, useState } from "react";

const headersList = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export function useAuth() {
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("LoggedInUsers")
      ? Object.values(JSON.parse(localStorage.getItem("LoggedInUsers")))
          .length > 0
        ? JSON.parse(localStorage.getItem("LoggedInUsers"))
        : {}
      : {}
  );

  useEffect(() => {
    localStorage.setItem("LoggedInUsers", JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  const getUsers = async () => {
    const response = await fetch("http://localhost:7000/register/get-user", {
      mode: "no-cors",
      method: "GET",
      headers: headersList,
    });
    return response.text();
  };
  const allUsers = getUsers();

  async function createUser(user) {
    if (!user) {
      throw new Error("Invalid parameters");
    } else {
      const response = await fetch(
        "http://localhost:7000/register/create-user",
        {
          method: "POST",
          body: JSON.stringify({ ...user }),
          headers: headersList,
        }
      );
      const createdUser = await response.json();
      setLoggedInUser(createdUser.data);
    }
  }

  async function checkUsernameAvailability(userName, type) {
    if (!userName) {
      throw new Error("Invalid parameters");
    } else {
      const response = await fetch(
        "http://localhost:7000/register/username-check",
        {
          method: "POST",
          body: JSON.stringify({ userName: userName }),
          headers: headersList,
        }
      );
      const findUser = await response.json();
      if (findUser?.statusCode === 500) {
        throw new Error(findUser.message);
      }
      if (findUser?.statusCode === 200) {
        return findUser?.data;
      }
    }
  }

  async function checkAndGetUserDetails(userName) {
    if (!userName) {
      throw new Error("Invalid parameters");
    } else {
      const response = await fetch(
        "http://localhost:7000/register/username-check",
        {
          method: "POST",
          body: JSON.stringify({ userName: userName }),
          headers: headersList,
        }
      );
      const findUser = response.json();
      if (!findUser) {
        throw new Error("User does not exists!");
      }
      if (Object.values(findUser).length) {
        return findUser;
      }
    }
  }

  function setLogInUser(user) {
    setLoggedInUser(user);
  }

  function logOut() {
    setLoggedInUser({});
  }

  async function checkUserCredentials(user) {
    if (!user) {
      throw new Error("Invalid parameters");
    } else {
      const response = await fetch("http://localhost:7000/login/check", {
        method: "POST",
        body: JSON.stringify({ ...user }),
        headers: headersList,
      });
      const findUser = await response.json();
      if (!findUser) {
        throw new Error("User does not exists!");
      }
      if (findUser?.password === user?.password) {
        throw new Error("Password does not match");
      }
      return findUser;
    }
  }

  return {
    allUsers,
    loggedInUser,
    createUser,
    checkUsernameAvailability,
    checkAndGetUserDetails,
    logOut,
    setLogInUser,
    checkUserCredentials,
  };
}
