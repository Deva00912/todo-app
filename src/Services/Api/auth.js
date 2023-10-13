import * as bcrypt from "bcryptjs-react";

const headersList = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const getUsers = async () => {
  const response = await fetch("http://192.168.0.106:7000/register/getUsers", {
    method: "GET",
    headers: headersList,
  });

  const userData = response.json();
  if (userData.ackStatus !== "completed") {
    throw new Error("Something went wrong!");
  }
  return userData.data;
};

export async function createUserApi(user) {
  if (!user) {
    throw new Error("Invalid parameters");
  } else {
    const response = await fetch(
      "http://192.168.0.106:7000/register/createUser",
      {
        method: "PUT",
        body: JSON.stringify({ ...user }),
        headers: headersList,
      }
    );
    const createdUser = await response.json();
    if (createdUser.ackStatus !== "completed") {
      throw new Error("Something went wrong!");
    }
    if (response.status !== 201) {
      throw new Error(createdUser.message);
    }
    return createdUser?.data;
  }
}

export async function checkUsernameAvailabilityApi(username) {
  if (!username) {
    throw new Error("Invalid parameters");
  } else {
    const response = await fetch(
      "http://192.168.0.106:7000/register/isUsernameExists",
      {
        method: "POST",
        body: JSON.stringify({ username: username }),
        headers: headersList,
      }
    );
    const findUser = await response.json();
    if (findUser.ackStatus !== "completed") {
      throw new Error("Something went wrong!");
    }
    if (response.status !== 200) {
      throw new Error(findUser.message);
    }
  }
}

export async function checkUserCredentialsApi(user) {
  if (!user) {
    throw new Error("Invalid parameters");
  } else {
    const response = await fetch(
      "http://192.168.0.106:7000/login/authUserAndLogin",
      {
        method: "POST",
        body: JSON.stringify({ ...user }),
        headers: headersList,
      }
    );
    const findUser = await response.json();
    if (findUser.ackStatus !== "completed") {
      throw new Error("Something went wrong!");
    }
    if (response.status !== 200) {
      throw new Error(findUser.message);
    }
    if (!Object.values(findUser?.data).length > 0) {
      throw new Error("User does not exists!");
    }
    if (
      findUser &&
      (await bcrypt.compare(user.password, findUser?.data.password))
    ) {
      return findUser?.data;
    }
    throw new Error("Invalid credentials");
  }
}
