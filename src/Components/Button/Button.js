import React from "react";
import PropTypes from "prop-types";

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
        disabled={props?.disabled}
        data-cy={props.datacy ? props.datacy : "buttonType"}
      >
        {props?.value}
      </button>
    </>
  );
}

Button.propTypes = {
  /**
   * string for className
   */
  className: PropTypes.string,
  /**
   * string for type
   */
  type: PropTypes.string,
  /**
   * function for onClick event
   */
  onClick: PropTypes.func,
  /**
   * function for onSubmit event
   */
  disabled: PropTypes.bool,
  /**
   *  string for data-cy
   */
  datacy: PropTypes.string,
  /**
   * string for value
   */
  value: PropTypes.string,
};

Button.defaultProps = {
  /**
   * Default empty string for className
   */
  className: "",
  /**
   * Default "button" for type
   */
  type: "button",
  /**
   * Default function which does nothing
   */
  onClick: () => {},
  /**
   * Default false for disabled
   */
  disabled: false,
  /**
   * Default "buttonString" string for data-cy
   */
  datacy: "buttonType",
  /**
   * Default "Click Me" string for value
   */
  value: "Click Me",
};
