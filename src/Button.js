import React from "react";

export default function Button(props) {
  return (
    <div>
      <button
        className={props.className}
        type={props.type}
        onClick={props.onClick}
        onSubmit={props.onSubmit}
        disabled={props.disabled}
      >
        {props.value}
      </button>
    </div>
  );
}
