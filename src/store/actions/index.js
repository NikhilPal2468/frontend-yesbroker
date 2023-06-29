import setCookie from "../../components/hooks/setCookie";
export const setUserDetails = ({ user = {}, token = "" }) => {
  if (user) setCookie("userDetails", JSON.stringify(user), 100);
  if (token) setCookie("token", token, 100);
  return {
    type: "SET_USER_DETAILS",
    payload: user,
  };
};
