import React, { useState } from "react";
import "./styles/register.css";

export default function InputBox(props) {
  const regexText = /^[a-zA-Z]{1,}$/;
  const regexName = /^[a-z0-9]{6,}$/;
  const regexPassword = /^[A-Za-z0-9@*#()]{8,15}$/;

  const [errors, setErrors] = useState({});

  function formValidation(e) {
    const { name, value } = e.target;
    let newErrors = {};
    switch (name) {
      case "firstName":
        if (value === "") {
          newErrors.firstName = "First name can't be blank";
        } else if (!regexText.test(value)) {
          newErrors.firstName = "Name is invalid";
        }
        break;
      case "lastName":
        if (value === "") {
          newErrors.lastName = "Last name can't be blank";
        } else if (!regexText.test(value)) {
          newErrors.lastName = "Name is invalid";
        }
        break;
      case "userName":
        if (value === "") {
          newErrors.userName = "Name can't be blank";
        } else if (!regexName.test(value)) {
          newErrors.userName = "Username is invalid";
        }
        break;
      case "password":
        if (value === "") {
          newErrors.pwd = "Password can't be blank";
        } else if (!regexPassword.test(value)) {
          newErrors.pwd = "Invalid Password Format";
        }
        break;
      case "confirmPassword":
        if (value === "") {
          newErrors.cPwd = "Confirm password can't be blank";
        } else if (!regexPassword.test(value)) {
          newErrors.cPwd = "Invalid Password Format";
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  }

  return (
    <div>
      <input
        className={props.className}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        onChange={(e) => {
          formValidation(e);
        }}
      />

      <div
        className="error-msg"
        style={{
          color: "#00b3b3",
          // width: "100%",
          fontSize: "12px",
          marginBottom: "0px",
          fontFamily: "Georgia, 'Times New Roman', Times, serif",
        }}
      >
        {errors[props.name]}
      </div>
    </div>
  );
}
