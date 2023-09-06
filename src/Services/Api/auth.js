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
  return userData.data;
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
    if (createdUser.statusCode !== 201) {
      throw new Error(createdUser.message);
    }
    return createdUser.data;
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
    if (findUser?.statusCode !== 200) {
      throw new Error(findUser.message);
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
    if (findUser.statusCode !== 200) {
      throw new Error(findUser.message);
    }
    if (!Object.values(findUser?.data).length > 0) {
      throw new Error("User does not exists!");
    }

    if (findUser.data.password !== user?.password) {
      throw new Error("Password does not match");
    }
    return findUser.data;
  }
}
