import React, { useId, useState } from "react";
import InputBox from "./InputBox";
import "./styles/register.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useAuthentication } from "./useAuth";

export default function Login() {
  const id = useId();
  const [user, setUser] = useState({ uId: id, uName: "", pwd: "" });
  const navigate = useNavigate();

  const checkUser = useAuthentication({
    choice: "checkExistUser",
    userData: user,
  });
  console.log(checkUser);

  const regExName = /^[a-z0-9]{6,}$/;
  const regPwd = /^[A-Za-z0-9@*#()]{8,15}$/;

  const validate = () => {
    if (
      user.uName &&
      user.pwd &&
      regExName.test(user.uName) &&
      regPwd.test(user.pwd)
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
            if (checkUser) {
              navigate("/");
              localStorage.setItem("LoggedUsers", JSON.stringify(user));
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
          name="uName"
          className="input-box"
        />
        <InputBox
          placeholder="Enter Password"
          type="password"
          name="pwd"
          className="input-box"
        />
        <Button type="submit" className="btn" value="Log in " />
        <div>
          <Link
            to="/register"
            style={{
              color: "#00b3b3",
            }}
          >
            Don't have a account?
          </Link>
        </div>
      </form>
    </div>
  );
}
