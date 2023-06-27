import setCookie from "../../components/hooks/setCookie";
export const setUserDetails = ({ user = {}, token = "" }) => {
  setCookie("userDetails", JSON.stringify(user), 100);
  if (token) setCookie("token", JSON.stringify(token), 100);
  return {
    type: "SET_USER_DETAILS",
    payload: user,
  };
};
