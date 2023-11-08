export const regex = {
  // email: /^(?=.{6,}$)(?=.*?[a-z])(?=.*?[0-9]).*$/,
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
  text: /^[a-zA-Z]{1,}$/,
};
