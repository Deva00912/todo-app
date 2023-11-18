import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../Components/Button/Button";
import { regex } from "../../Utils/Constants";
import InputBox from "../../Components/InputBox/InputBox";
import { connect } from "react-redux";
import { logInUser } from "../../Redux/Authentication/action";

function Login(props) {
  const [user, setUser] = useState({ email: "", password: "" });

  const validate = () => {
    return (
      user.email &&
      user.password &&
      regex.email.test(user.email) &&
      regex.password.test(user.password)
    );
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return toast.error("Entered details is wrong!");
    }
    if (process.env.REACT_APP_STAGING === "saga") {
      props.logInUser({ user });
      props.navigate("/");
    } else {
      try {
        const foundUser =
          props.auth && (await props.auth.checkUserCredentials(user));
        if (Object.values(foundUser).length > 0) {
          props.auth?.setLogInUser(foundUser);
          toast.success("Logged in");
          props.navigate("/");
        }
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
        <div className="text-underline text-underline-offset-10px margin-8px color-teal-blue font-size-38px font-family-times-new-roman ">
          Log in
        </div>
        <InputBox
          placeholder="Enter email"
          type="text"
          name="email"
          datacy="email"
        />
        <InputBox
          placeholder="Enter Password"
          type="password"
          name="password"
          datacy="password"
        />
        <Button type="submit" value="Log in" datacy="logInButton" />
        <div
          className="cursor-pointer margin-4px color-teal-blue font-family-times-new-roman line-height-16px font-size-100-percent "
          onClick={() => {
            props.navigate("/register");
          }}
          datacy="goToRegister"
        >
          Don't have an account?
        </div>
        <div
          className="cursor-pointer margin-4px color-teal-blue font-family-times-new-roman line-height-16px font-size-100-percent "
          onClick={() => {
            // const customUrl = "uhi://discover?hip=ANBU-HI";
            const customUrl = "ninto://notification-permission?ask=true";

            // Navigate to the custom URL
            window.location.href = customUrl;
          }}
          datacy="goToRegister"
        >
          Go to App
        </div>
      </form>
    </>
  );
}

const mapStateToProps = function (state) {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = function () {
  return {
    logInUser: (user) => logInUser(user),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
