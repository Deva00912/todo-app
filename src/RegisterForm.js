import React, { useState } from "react";
import InputBox from "./InputBox";
import "./styles/register.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import uuid from "react-uuid";
import { useAuth } from "./useAuthentication";

export default function Register() {
  const navigate = useNavigate();
  const { setUserData, isUser } = useAuth();

  const [user, setUser] = useState({
    id: uuid(),
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const regexUserName = /^[a-z0-9]{6,}$/;
  const regexPassword = /^[A-Za-z0-9@*#()]{8,15}$/;

  const validate = () => {
    if (
      user.userName &&
      user.confirmPassword &&
      user.password &&
      user.password === user.confirmPassword &&
      regexUserName.test(user.userName) &&
      regexPassword.test(user.password) &&
      regexPassword.test(user.confirmPassword)
    ) {
      return true;
    } else {
      throw new Error("Check entered details again!");
    }
  };

  return (
    <div>
      <form
        className="form"
        onChange={(e) => {
          setUser({ ...user, [e.target.name]: e.target.value });
        }}
        onSubmit={(e) => {
          e.preventDefault();
          try {
            validate();
            isUser(user);
            setUserData(user);
            toast.success("User registered!!");
            navigate("/login");
          } catch (error) {
            if (error === "Check entered details again!") {
              toast.error("Check entered details again!");
            }
            if (error === "Entered details are wrong") {
              toast.error("Entered details are wrong");
            }
            if (error === "Invalid parameters") {
              toast.error(`Invalid parameters`);
            } else if (error === "User already exists!") {
              toast.error("User already exists!");
            }
          }
        }}
      >
        <div className="message">Create a account</div>

        <InputBox
          placeholder="First name"
          type="text"
          name="firstName"
          className="input-box"
        />
        <InputBox
          placeholder="Last name"
          type="text"
          name="lastName"
          className="input-box"
        />
        <InputBox
          placeholder="Username"
          type="text"
          name="userName"
          className="input-box"
        />
        <InputBox
          placeholder="New password"
          type="password"
          name="password"
          className="input-box"
        />
        <InputBox
          placeholder="Confirm password"
          type="password"
          name="confirmPassword"
          className="input-box"
        />
        <Button className="btn" type="submit" value="Register" />

        <div>
          <Link
            to="/login"
            style={{
              color: "#00b3b3",
            }}
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
