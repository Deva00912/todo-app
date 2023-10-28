const authReducer = (
  state = {
    data: {},
  },
  action
) => {
  switch (action.type) {
    case "SET_LOGGED_USER":
      return {
        ...state,
        data: action.payload.data,
      };

    default:
      return state;
  }
};

export default authReducer;
