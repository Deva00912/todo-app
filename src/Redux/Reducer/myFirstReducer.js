const myFirstReducer = (
  state = {
    data: { color: null },
  },
  action
) => {
  switch (action.type) {
    case "SET_COLOR":
      return {
        ...state.data,
        color: action.payload.color,
      };

    default:
      return state;
  }
};

export default myFirstReducer;
