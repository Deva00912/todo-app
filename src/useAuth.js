
export function useAuthentication() {

  function checkUser( users) {
    const data =
      localStorage.getItem("Users") &&
      JSON.parse(localStorage.getItem("Users")).length > 0
        ? JSON.parse(localStorage.getItem("Users"))
        : [];
    if (!users || !data) {
      return false;
    } else {
      const loggedUser = data.find(
        (ele) => ele?.uName === users?.uName && ele?.pwd === users?.pwd
      );
      console.log("Logged in CheckUsers",loggedUser);
      if (loggedUser === null || loggedUser === undefined) {
        return false;
      } else {
        if (Object.values(loggedUser)?.length > 0) {
          return (true);
        } else {
          return false;
        }
      }
    }
  }
  function getUser(key) {
    const data =
      localStorage.getItem(String(key)) &&
      JSON.parse(localStorage.getItem(String(key))).length > 0
        ? JSON.parse(localStorage.getItem(String(key)))
        : [];
    // console.log(data, "getUsers");
    if (!data) {
      return data;
    } else {
      return data;
    }
  }

  function addUser(props) {
    const data =
      localStorage.getItem("Users") &&
      JSON.parse(localStorage.getItem("Users")).length > 0
        ? JSON.parse(localStorage.getItem("Users"))
        : [];
    if (!props) {
      return false;
    } else {
      data.push(props);
      localStorage.setItem("Users", JSON.stringify(data));
      return true;
    }
  }

  return [getUser, addUser,checkUser];
}

// useEffect(() => {
//   console.log("first");

//   window.addEventListener("storage", checkUser());

//   return () => {
//     window.removeEventListener("storage", checkUser());
//   };
// }, [res,props]);
// export const useGetUsers = () => {
//   useEffect(() => {

//     window.addEventListener("storage", getUser());

//     return () => {
//       window.removeEventListener("storage", getUser());
//     };
//   }, []);

//   // eslint-disable-next-line
// };

// export const useAddUsers = (user) => {
//   useEffect(() => {

//     window.addEventListener("storage", addUser());
//     return () => {
//       window.removeEventListener("storage", addUser());
//     };
//     // eslint-disable-next-line
//   }, []);
// };
