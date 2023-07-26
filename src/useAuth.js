import { useEffect, useState } from "react";
export const useAuthentication = (props) => {
  const [res, setRes] = useState(false);

  useEffect(() => {
    if (props.choice === "checkExistUser") {
      const data =
        localStorage.getItem("Users") &&
        JSON.parse(localStorage.getItem("Users")).length > 0
          ? JSON.parse(localStorage.getItem("Users"))
          : [];

      if (!props.userData || !data) {
        return false;
      } else {
        const loggedUser = data.find(
          (ele) =>
            ele?.uName === props.userData?.uName &&
            ele?.pwd === props.userData?.pwd
        );
        if (loggedUser === null || loggedUser === undefined) {
          setRes(false);
        } else {
          if (Object.values(loggedUser)?.length > 0) {
            setRes(true);
          } else {
            setRes(false);
          }
        }
      }
    } else {
      if (props.choice === "getUsers") {
        return getUsers();
      } else {
        if (props.choice === "addUsers") {
          return addUsers();
        } else {
          return -1;
        }
      }
    }

    // eslint-disable-next-line
  }, [localStorage.getItem("Users"), props.userData]);

  return res;
};

const getUsers = () => {
  const data =
    localStorage.getItem("Users") &&
    JSON.parse(localStorage.getItem("Users")).length > 0
      ? JSON.parse(localStorage.getItem("Users"))
      : [];

  if (!data) {
    return {};
  } else {
    return data;
  }
  // eslint-disable-next-line
};

const addUsers = (user) => {
  const data =
    localStorage.getItem("Users") &&
    JSON.parse(localStorage.getItem("Users")).length > 0
      ? JSON.parse(localStorage.getItem("Users"))
      : [];
  if (!user) {
    return false;
  } else {
    data.push(user);
    localStorage.setItem("Users", JSON.stringify(data));
    return true;
  }
};
