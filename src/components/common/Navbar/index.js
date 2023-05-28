import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "react-bootstrap";
import { FaHouseUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../../store/actions";

const Navbar = ({ setShowLogin, setShowRegister }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);
  console.log("user:", user);
  useEffect(() => {
    // Retrieve user details from browser storage on component mount
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUserDetails) {
      dispatch(setUserDetails(storedUserDetails));
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light card shadow-sm p-3 mb-5 bg-white rounded">
      <div className="container-fluid">
        <div className={styles.navbar_left}>
          <img src="/images/logo.png" alt="logo" />
          <Link to={`/`} className="navbar-brand">
            YesBroker
          </Link>
        </div>
        {user ? (
          <div
            className={`d-flex flex-row border border-dark pe-2 rounded-5 border-1 border-left-0 align-items-center justify-content-center gap-2 ${styles.userIcon}`}
          >
            <div className="border border-2 px-2 py-1 border-gray rounded-circle">
              <FaHouseUser />
            </div>
            <p className="my-auto">{user?.name}</p>
          </div>
        ) : (
          <div className={styles.navbar_right}>
            <Button
              onClick={() => {
                setShowLogin(true);
              }}
              className="m-2"
            >
              Log in
            </Button>
            <Button
              onClick={() => {
                setShowRegister(true);
              }}
            >
              Sign up
            </Button>
          </div>
        )}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
