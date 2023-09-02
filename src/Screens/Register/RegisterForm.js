import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../Components/Button/Button";
// import uuid from "react-uuid";
import { regex } from "../../Services/Utils/Constants";
import InputBox from "../../Components/InputBox/InputBox";

export default function Register(props) {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

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
            props.auth
              .checkUsernameAvailability(user?.userName, "CHECK")
              .then(() => {
                props.auth
                  .createUser(user)
                  .then((createdUser) => {
                    toast.success("Registered");

                    props.navigate("/");
                  })
                  .catch((error) => {
                    toast.error(error.message);
                  });
              })
              .catch((error) => {
                toast.error(error?.message);
              });
          } catch (error) {
            toast.error(error?.message);
          }
        }}
      >
        <div className="text-underline text-underline-offset-6px color-teal-blue font-size-38px font-family-times-new-roman margin-8px">
          Create an account
        </div>

        <InputBox
          placeholder="Username"
          type="text"
          name="userName"
          datacy="userName"
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
          disabled={
            user.userName &&
            user.firstName &&
            user.lastName &&
            user.confirmPassword &&
            user.password &&
            user.password === user.confirmPassword &&
            regex.userName.test(user.userName) &&
            regex.password.test(user.password) &&
            regex.text.test(user.firstName) &&
            regex.text.test(user.lastName)
              ? false
              : true
          }
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
