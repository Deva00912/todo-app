import React, { useState } from "react";
import "./Register.css";
import { toast } from "react-toastify";
import Button from "../../Components/Button/Button";
import uuid from "react-uuid";
import { regex } from "../../Services/Utils/Constants";
import InputBox from "../../Components/InputBox/InputBox";

export default function Register(props) {
  const [user, setUser] = useState({
    id: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const formValidation = () => {
    if (
      user.userName &&
      user.confirmPassword &&
      user.password &&
      user.password === user.confirmPassword &&
      regex.userName.test(user.userName) &&
      regex.password.test(user.password)
    ) {
      return true;
    } else {
      throw new Error("Check entered details again!");
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
          try {
            formValidation();
            props.auth.isUser(user);
            props.auth.setUserData({ ...user, id: uuid() });
            toast.success("User registered!!");
            props.navigate("/login");
          } catch (error) {
            if (error === "Check entered details again!") {
              toast.error(error);
            }
            if (error === "Entered details are wrong") {
              toast.error(error);
            }
            if (error === "Invalid parameters") {
              toast.error(error);
            } else if (error === "User already exists!") {
              toast.error(error);
            }
          }
        }}
      >
        <div className="text-underline text-underline-offset-6px color-teal-blue font-size-38px font-family-times-new-roman margin-8px">
          Create an account
        </div>

        <InputBox placeholder="Username" type="text" name="userName" />
        <InputBox placeholder="First name" type="text" name="firstName" />
        <InputBox placeholder="Last name" type="text" name="lastName" />
        <InputBox placeholder="New password" type="password" name="password" />
        <InputBox
          placeholder="Confirm password"
          type="password"
          name="confirmPassword"
        />
        <Button type="submit" value="Register" />

        <div
          className="cursor-pointer margin-4px color-teal-blue font-family-times-new-roman line-height-16px font-size-100-percent"
          onClick={() => {
            props.navigate("/login");
          }}
        >
          Already have an account?
        </div>
      </form>
    </>
  );
}
