import React from "react";
import Button from "./Button";

export default {
  title: "Todo/Button",
  component: Button,
  argTypes: {
    disabled: { control: "boolean" },
  },
};

const Template = (args) => <Button {...args} />;

export const DefaultButton = Template.bind({});

DefaultButton.args = {
  className: "default",
  disabled: false,
  buttonCategory: "default",
  text: "Button",
  onClick: undefined,
  type: "button",
};
