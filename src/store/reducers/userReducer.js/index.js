const initialState = {
  userDetails: null,
};

const userReducer = (state = initialState, action) => {
  console.log("action:", action.payload);
  switch (action.type) {
    case "SET_USER_DETAILS":
      return {
        ...state,
        userDetails: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
