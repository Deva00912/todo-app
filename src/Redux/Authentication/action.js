/**
 * @module Saga-Authentication
 */

import store from "../Store/store";

const actionTypes = {
  REGISTER: "REGISTER",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};
/**
 * Dispatches an action to log in a user.
 *
 * @function
 * @param {Object} user - The user to be logged in.
 */
export const logInUser = (user) => {
  store.dispatch({
    type: actionTypes.LOGIN,
    payload: {
      ...user,
    },
  });
};

/**
 * Dispatches an action to register a user.
 *
 * @function
 * @param {Object} user - The user to be registered.
 */
export const register = (user) => {
  store.dispatch({
    type: actionTypes.REGISTER,
    payload: {
      user: { ...user },
    },
  });
};

/**
 * Dispatches an action to log out the user.
 *
 * @function
 */
export const logOut = () => {
  store.dispatch({
    type: actionTypes.LOGOUT,
  });
};
