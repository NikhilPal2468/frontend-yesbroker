import setCookie from "../../components/hooks/setCookie";
export const setUserDetails = (userDetails) => {
  setCookie("userDetails", JSON.stringify(userDetails), 1);
  return {
    type: "SET_USER_DETAILS",
    payload: userDetails,
  };
};
