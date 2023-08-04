import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../Components/Button/Button";
import { regex } from "../../Services/Utils/Constants";
import InputBox from "../../Components/InputBox/InputBox";

export default function Login(props) {
  const [user, setUser] = useState({ userName: "", password: "" });

  const validate = () => {
    if (
      user.userName &&
      user.password &&
      regex.userName.test(user.userName) &&
      regex.password.test(user.password)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <form
        className="height-100-percent width-100-percent display-flex flex-direction-column justify-content-center align-item-center"
        onChange={(e) => {
          setUser({ ...user, [e.target.name]: e.target.value });
        }}
        onSubmit={(e) => {
          e.preventDefault();
          if (!validate()) {
            return toast.error("Entered details is wrong!");
          }
          const loggedUser = props.auth.isUserLogin(user);
          if (!loggedUser) {
            return toast.error("User does not exist!");
          }
          localStorage.setItem("LoggedUsers", JSON.stringify(loggedUser));
          toast.success("Logged in");
          props.navigate("/");
        }}
      >
        <div className="margin-8px color-teal-blue font-size-38px font-family-times-new-roman ">
          LogIn
        </div>
        <InputBox
          placeholder="Enter Username"
          type="text"
          name="userName"
          className="margin-8px padding-10px border-0px border-radius-6px line-height-24px font-family-times-new-roman font-size-100-percent"
        />
        <InputBox
          placeholder="Enter Password"
          type="password"
          name="password"
          className="margin-8px padding-10px border-0px border-radius-6px line-height-24px font-family-times-new-roman font-size-100-percent"
        />
        <Button
          type="submit"
          className="margin-5px height-40px width-80px padding-8px background-color-teal-blue color-white border-radius-6px border-0px align-item-center font-family-times-new-roman font-size-100-percent line-height-16px"
          value="Log in"
        />
        <div className="margin-4px color-teal-blue font-family-times-new-roman line-height-16px font-size-100-percent ">
          <div
            onClick={() => {
              props.navigate("/register");
            }}
          >
            Don't have a account?
          </div>
        </div>
      </form>
    </>
  );
}
