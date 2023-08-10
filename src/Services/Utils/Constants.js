export const regex = {
  // userName: /^(?=.{6,}$)(?=.*?[a-z])(?=.*?[0-9]).*$/,
  userName: /^[a-z0-9]{6,}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
  text: /^[a-zA-Z]{1,}$/,
};
