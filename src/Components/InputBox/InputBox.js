import React, { useState } from "react";
import { regex } from "../../Services/Utils/Constants";

export default function InputBox(props) {
  const [errors, setErrors] = useState({});

  function formValidation(e) {
    const { name, value } = e.target;
    let newErrors = {};
    switch (name) {
      case "firstName":
        if (value === "") {
          newErrors.firstName = "First name can't be blank";
        } else if (!regex.text.test(value)) {
          newErrors.firstName = "Name is invalid";
        }
        break;
      case "lastName":
        if (value === "") {
          newErrors.lastName = "Last name can't be blank";
        } else if (!regex.text.test(value)) {
          newErrors.lastName = "Name is invalid";
        }
        break;
      case "userName":
        if (value === "") {
          newErrors.userName = "Name can't be blank";
        } else if (!regex.userName.test(value)) {
          newErrors.userName = "Username is invalid";
        }
        break;
      case "password":
        if (value === "") {
          newErrors.password = "Password can't be blank";
        } else if (!regex.password.test(value)) {
          newErrors.password = "Invalid Password Format";
        }
        break;
      case "confirmPassword":
        if (value === "") {
          newErrors.confirmPassword = "Confirm password can't be blank";
        } else if (!regex.password.test(value)) {
          newErrors.confirmPassword = "Invalid Password Format";
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  }

  return (
    <>
      <div className="display-flex flex-direction-column align-item-center">
        <input
          className={`${props?.className} margin-8px padding-10px border-0px border-radius-6px line-height-24px font-family-times-new-roman font-size-100-percent`}
          disabled={props?.disabled}
          defaultValue={props?.defaultValue}
          value={props?.value}
          style={props?.style}
          name={props?.name}
          type={props?.type}
          placeholder={props?.placeholder}
          onChange={(e) => {
            formValidation(e);
          }}
        />
        <div className="color-teal-blue font-size-12px margin-bottom-0px font-family-times-new-roman">
          {errors[props?.name]}
        </div>
      </div>
    </>
  );
}
