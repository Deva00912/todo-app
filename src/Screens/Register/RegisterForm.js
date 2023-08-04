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
        <div className="color-teal-blue font-size-38px font-family-times-new-roman margin-8px">
          Create a account
        </div>

        <InputBox
          placeholder="Username"
          type="text"
          name="userName"
          className="margin-8px padding-10px border-0px border-radius-8px line-height-24px font-family-times-new-roman font-size-100-percent"
        />

        <div className="display-flex flex-direction-row width-70-percent">
          <InputBox
            placeholder="First name"
            type="text"
            name="firstName"
            className="margin-8px padding-10px border-0px border-radius-8px width-70-percent line-height-24px font-family-times-new-roman font-size-100-percent"
          />
          <InputBox
            placeholder="Last name"
            type="text"
            name="lastName"
            className="margin-8px padding-10px border-0px border-radius-8px width-70-percent line-height-24px font-family-times-new-roman font-size-100-percent"
          />
        </div>

        <div className="display-flex flex-direction-row width-70-percent">
          <InputBox
            placeholder="New password"
            type="password"
            name="password"
            className="margin-8px padding-10px border-0px border-radius-8px width-70-percent line-height-24px font-family-times-new-roman font-size-100-percent"
          />
          <InputBox
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
            className="margin-8px padding-10px border-0px border-radius-8px width-70-percent line-height-24px font-family-times-new-roman font-size-100-percent"
          />
        </div>
        <Button
          className="margin-5px height-40px width-80px padding-8px background-color-teal-blue color-white border-radius-6px border-0px align-item-center font-family-times-new-roman font-size-100-percent line-height-16px"
          type="submit"
          value="Register"
        />

        <div className="margin-4px color-teal-blue font-family-times-new-roman line-height-16px font-size-100-percent">
          <div
            onClick={() => {
              props.navigate("/login");
            }}
          >
            Already have an account?
          </div>
        </div>
      </form>
    </>
  );
}
