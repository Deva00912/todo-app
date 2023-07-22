import React, { useState } from "react";

export default function Header() {
  const [button, setButton] = useState("Home");

  return (
    <div>
      {button === "Register" ? (
        <button
          className="btn"
          onClick={() => {
            setButton("Login");
          }}
        >
          Login
        </button>
      ) : undefined}
      {button === "Login" && (
        <button
          className="btn"
          onClick={() => {
            setButton("Register");
          }}
        >
          Register
        </button>
      )}
      
    </div>
  );
}
