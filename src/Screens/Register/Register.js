import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../Components/Button/Button";
import { regex } from "../../Services/Utils/Constants";
import InputBox from "../../Components/InputBox/InputBox";
import uuid from "react-uuid";
import { authActions } from "../../Redux/Saga/authSaga";

export default function Register(props) {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    return user.username &&
      user.firstName &&
      user.lastName &&
      user.confirmPassword &&
      user.password &&
      user.password === user.confirmPassword &&
      regex.username.test(user.username) &&
      regex.password.test(user.password) &&
      regex.text.test(user.firstName) &&
      regex.text.test(user.lastName)
      ? false
      : true;
  };

  const handleSubmit = async () => {
    if (process.env.REACT_APP_STAGING === "saga") {
      authActions.register(user);
      props.navigate("/");
    } else {
      try {
        await props.auth.checkUsernameAvailability(user);
        await props.auth.createUser(
          process.env.REACT_APP_STAGING === "local"
            ? { ...user, userId: uuid() }
            : user
        );
        toast.success("Registered");
        props.navigate("/");
      } catch (error) {
        toast.error(error.message);
      }
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
          handleSubmit();
        }}
      >
        <div className="text-underline text-underline-offset-6px color-teal-blue font-size-38px font-family-times-new-roman margin-8px">
          Create an account
        </div>

        <InputBox
          placeholder="Username"
          type="text"
          name="username"
          datacy="username"
        />
        <InputBox
          placeholder="First name"
          type="text"
          name="firstName"
          datacy="firstName"
        />
        <InputBox
          placeholder="Last name"
          type="text"
          name="lastName"
          datacy="lastName"
        />
        <InputBox
          placeholder="New password"
          type="password"
          name="password"
          datacy="password"
        />
        <InputBox
          placeholder="Confirm password"
          type="password"
          name="confirmPassword"
          datacy="confirmPassword"
        />
        <Button
          type="submit"
          value="Register"
          datacy="registerButton"
          disabled={validate()}
        />

        <div
          className="cursor-pointer margin-4px color-teal-blue font-family-times-new-roman line-height-16px font-size-100-percent"
          onClick={() => {
            props.navigate("/login");
          }}
          data-cy="goToLogin"
        >
          Already have an account?
        </div>
      </form>
    </>
  );
}
