const removeCookie = (name) => {
  const expires = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = name + "=;" + expires + ";path=/";
};
export default removeCookie;
