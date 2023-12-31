import { useEffect, useState } from "react";
import {
  checkUserCredentialsApi,
  checkUserEmailAvailabilityApi,
  createUserApi,
} from "../Api/auth";

export function useAuth() {
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

  const createUser = async (user) => {
    if (!user) {
      throw new Error("Invalid parameters");
    } else {
      if (process.env.REACT_APP_STAGING === "local") {
        setAllUser([...allUser, user]);
        setLoggedInUser(user);
      } else {
        const response = await createUserApi(user);
        setLoggedInUser(response);
      }
    }
  };

  const checkUserEmailAvailability = async (user) => {
    if (!user) {
      throw new Error("Invalid parameters");
    } else {
      if (process.env.REACT_APP_STAGING === "local") {
        const findUser = allUser.find(
          (userData) => userData?.email === user.email
        );
        if (findUser && Object.values(findUser).length) {
          throw new Error("User already exists!");
        }
      } else {
        const response = await checkUserEmailAvailabilityApi(user.email);
        return response;
      }
    }
  };

  const setLogInUser = (user) => {
    setLoggedInUser(user);
  };

  const logOut = () => {
    setLoggedInUser({});
  };

  const checkUserCredentials = async (user) => {
    if (!user) {
      throw new Error("Invalid parameters");
    } else {
      if (process.env.REACT_APP_STAGING === "local") {
        const findUser = allUser.find(
          (userData) => userData?.email === user.email
        );
        if (!findUser) {
          throw new Error("User does not exists!");
        }
        if (Object.values(findUser).length) {
          return findUser;
        }
      } else {
        try {
          const response = await checkUserCredentialsApi(user);
          return response;
        } catch (error) {
          throw new Error(error.message);
        }
      }
    }
  };

  return {
    allUser,
    loggedInUser,
    createUser,
    checkUserEmailAvailability,
    logOut,
    setLogInUser,
    checkUserCredentials,
  };
}
