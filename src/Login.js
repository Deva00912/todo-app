import React, { useState } from "react";
import InputBox from "./InputBox";
import "./styles/register.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "./useAuthentication";

export default function Login(props) {
  const [user, setUser] = useState({ userName: "", password: "" });

  const a = useAuth();
  
  const regExName = /^[a-z0-9]{6,}$/;
  const regPwd = /^[A-Za-z0-9@*#()]{8,15}$/;

  const validate = () => {
    if (
      user.userName &&
      user.password &&
      regExName.test(user.userName) &&
      regPwd.test(user.password)
    ) {
      return true;
    } else {
      return false;
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
          if (validate()) {
            const loggedUser = a.isUserLogin(user);
            if (loggedUser) {
              props.navigate("/");
              localStorage.setItem("LoggedUsers", JSON.stringify(loggedUser));
              toast.success("Logged in");
            } else {
              toast.error("User does not exist!");
            }
          } else {
            toast.error("Entered details is wrong!");
          }
        }}
      >
        <div className="message">LogIn</div>
        <InputBox
          placeholder="Enter Username"
          type="text"
          name="userName"
          className="input-box"
        />
        <InputBox
          placeholder="Enter Password"
          type="password"
          name="password"
          className="input-box"
        />
        <Button type="submit" className="btn" value="Log in" />
        <div
          style={{
            color: "#00b3b3",
          }}
        >
          <Link to="/register">Don't have a account?</Link>
        </div>
      </form>
    </div>
  );
}
