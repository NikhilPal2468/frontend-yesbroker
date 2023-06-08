import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RedirectPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    toast.error("Please login  or register to access this page", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);

  return (
    <div>
      <p>You are not logged in please login or register</p>
      redirecting to home page...
      <ToastContainer />
    </div>
  );
};

export default RedirectPage;
