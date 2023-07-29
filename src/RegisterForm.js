import React, { useState } from "react";
import InputBox from "./InputBox";
import "./styles/register.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import uuid from "react-uuid";
import { useAuth } from "./useCustomHook";

export default function Register() {
  const navigate = useNavigate();
  const [getUser, setUserData] = useAuth();

  const [user, setUser] = useState({
    id: uuid(),
    uName: "",
    pwd: "",
    cPwd: "",
  });

  const data =
    localStorage.getItem("Users") &&
    JSON.parse(localStorage.getItem("Users")).length > 0
      ? JSON.parse(localStorage.getItem("Users"))
      : [];

  const regExName = /^[a-z0-9]{6,}$/;
  const regPwd = /^[A-Za-z0-9@*#()]{8,15}$/;

  const checkUserExist = () => {
    if (!data) {
      return false;
    } else {
      const ch = data.find((ele) => ele?.uName === user.uName);
      if (ch === null || ch === undefined) {
        return false;
      }
      if (Object.values(ch)?.length) {
        toast.error("Username already exists!");
        return true;
      } else {
        return false;
      }
    }
  };

  const validate = () => {
    if (
      user.uName &&
      user.cPwd &&
      user.pwd &&
      user.pwd === user.cPwd &&
      regExName.test(user.uName) &&
      regPwd.test(user.pwd) &&
      regPwd.test(user.cPwd)
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
            if (!checkUserExist()) {
              data.push(user);
              setUserData(user);
              if (data) {
                // localStorage.setItem("Users", JSON.stringify(data));
                toast.success("User registered!!");
                navigate("/login");
              }
            } else {
              toast.error("User already exists");
            }
          }
        }}
      >
        <div className="message">Create a account</div>

        <InputBox
          placeholder="First name"
          type="text"
          name="fName"
          className="input-box"
        />
        <InputBox
          placeholder="Last name"
          type="text"
          name="lName"
          className="input-box"
        />
        <InputBox
          placeholder="Username"
          type="text"
          name="uName"
          className="input-box"
        />
        <InputBox
          placeholder="New password"
          type="password"
          name="pwd"
          className="input-box"
        />
        <InputBox
          placeholder="Confirm new password"
          type="password"
          name="cPwd"
          className="input-box"
        />
        <Button
          className="btn"
          type="submit"
          disabled={!validate()}
          value="Register"
        />

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
