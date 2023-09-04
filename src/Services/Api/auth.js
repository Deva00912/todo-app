const headersList = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const getUsers = async () => {
  const response = await fetch("http://localhost:7000/register/get-user", {
    method: "GET",
    headers: headersList,
  });
  const userData = response.json();
  return userData;
};

export async function createUserApi(user) {
  if (!user) {
    throw new Error("Invalid parameters");
  } else {
    const response = await fetch("http://localhost:7000/register/create-user", {
      method: "POST",
      body: JSON.stringify({ ...user }),
      headers: headersList,
    });
    const createdUser = await response.json();
    return createdUser;
  }
}

export async function checkUsernameAvailabilityApi(userName) {
  if (!userName) {
    throw new Error("Invalid parameters");
  } else {
    const response = await fetch(
      "http://localhost:7000/register/username-check",
      {
        method: "POST",
        body: JSON.stringify({ userName: userName }),
        headers: headersList,
      }
    );
    const findUser = await response.json();
    if (findUser?.statusCode === 500) {
      throw new Error(findUser.message);
    }
    if (findUser?.statusCode === 200) {
      return findUser?.data;
    }
  }
}

export async function checkUserCredentialsApi(user) {
  if (!user) {
    throw new Error("Invalid parameters");
  } else {
    const response = await fetch("http://localhost:7000/login/check", {
      method: "POST",
      body: JSON.stringify({ ...user }),
      headers: headersList,
    });
    const findUser = await response.json();
    if (!findUser) {
      throw new Error("User does not exists!");
    }
    if (findUser?.password === user?.password) {
      throw new Error("Password does not match");
    }
    return findUser;
  }
}
