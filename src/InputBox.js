import React, { useState } from "react";
import "./styles/register.css";

export default function InputBox(props) {
  const regExName = /^[a-z0-9]{6,}$/;
  const regPwd = /^[A-Za-z0-9@*#()]{8,15}$/;

  const errors = {};

  function formValidation(e) {
    const { name, value } = e.target;
    let newErrors = {};
    switch (name) {
      case "uName":
        if (value === "") {
          newErrors.uName = "Name can't be blank";
        } else if (!regExName.test(value)) {
          newErrors.uName = "Username is invalid";
        }
        break;
      case "pwd":
        if (value === "") {
          newErrors.pwd = "Password can't be blank";
        } else if (!regPwd.test(value)) {
          newErrors.pwd = "Invalid Password Format";
        }
        break;
      case "cPwd":
        if (value === "") {
          newErrors.cPwd = "Confirm password can't be blank";
        } else if (!regPwd.test(value)) {
          newErrors.cPwd = "Invalid Password Format";
        }
        break;

      default:
        break;
    }

    // setErrors();
  }

  return (
    <div>
      <input
        className={props.className}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        onChange={(e) => {
          // formValidation(e);
          
          
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
