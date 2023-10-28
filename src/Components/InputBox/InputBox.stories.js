import React from "react";
import InputBox from "./InputBox";

export default {
  title: "Todo/InputBox",
  component: InputBox,
};

const Template = (props) => <InputBox {...props} />;

export const Default = Template.bind({});
Default.args = {
  className: "default",
  disabled: false,
  defaultValue: "default",
  value: "default",
  name: "default",
  style: {},
  type: "default",
  placeholder: "Enter default text",
};
