import React from "react";

export default function Button(props) {
  return (
    <>
      <button
        className={`${props?.className} ${
          props.disabled
            ? "background-color-pink-red"
            : "background-color-teal-blue"
        } margin-5px height-40px width-80px padding-8px color-white border-radius-6px border-0px align-item-center font-family-times-new-roman font-size-100-percent line-height-16px`}
        type={props?.type}
        onClick={props?.onClick}
        onSubmit={props?.onSubmit}
        disabled={props?.disabled}
        data-cy={props.datacy ? props.datacy : "buttonType"}
      >
        {props?.value}
      </button>
    </>
  );
}
