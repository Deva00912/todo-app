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
        onChange={(event) => {
          setUser({ ...user, [event.target.name]: event.target.value });
        }}
        onSubmit={(event) => {
          event.preventDefault();
          if (!validate()) {
            return toast.error("Entered details is wrong!");
          }
          const loggedInData = props.auth.checkAndGetUserDetails(user);
          if (!loggedInData) {
            return toast.error("User does not exist!");
          }
          props?.auth?.logInUser(loggedInData);
          toast.success("Logged in");
          props.navigate("/");
          console.log("After Navigate");
        }}
      >
        <div className="text-underline text-underline-offset-10px margin-8px color-teal-blue font-size-38px font-family-times-new-roman ">
          Log in
        </div>
        <InputBox placeholder="Enter Username" type="text" name="userName" />
        <InputBox
          placeholder="Enter Password"
          type="password"
          name="password"
        />
        <Button type="submit" value="Log in" />
        <div
          className="cursor-pointer margin-4px color-teal-blue font-family-times-new-roman line-height-16px font-size-100-percent "
          onClick={() => {
            props.navigate("/register");
          }}
        >
          Don't have an account?
        </div>
      </form>
    </>
  );
}
