export const setUserDetails = (userDetails) => {
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
  return {
    type: "SET_USER_DETAILS",
    payload: userDetails,
  };
};
