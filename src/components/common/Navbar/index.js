import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "react-bootstrap";
import { FaHouseUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../store/actions";
import Register from "../../Authentication/Register";
import Login from "../../Authentication/Login";
import { IoReorderThreeOutline } from "react-icons/io5";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

const Navbar = ({ userDetails = {} }) => {
  const [user, setUser] = useState(null);
  const { showLogin, showRegister, setShowLogin, setShowRegister } =
    useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    // Retrieve user details from browser storage on component mount
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUserDetails) {
      dispatch(setUserDetails(storedUserDetails));
      setUser(storedUserDetails);
    } else {
      setUser(userDetails);
    }
  }, [dispatch, setUserDetails]);

  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("userDetails");
    await axios.get("/secure/api/logout");
    navigate("/");
    dispatch(setUserDetails(null));
    setUser(null);
    navigate(`/`);
  };

  return (
    <nav
      className={`${styles.navbar_homewale} navbar navbar-expand-lg navbar-light bg-light card shadow-sm p-3 rounded`}
    >
      <div className="container-fluid">
        <div className={styles.navbar_left}>
          <Link to={`/`} className="navbar-brand">
            <img src="/images/logo1.svg" alt="logo" />
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {/* <span className="navbar-toggler-icon"></span> */}
          <IoReorderThreeOutline size={30} />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pricing
              </a>
            </li> */}
          </ul>
          {/* <span className="navbar-text">
            Navbar text with an inline element
          </span> */}
          {user ? (
            <div className="dropdown">
              <a
                className={`d-flex flex-row border border-dark pe-2 rounded-5 border-1 border-left-0 align-items-center justify-content-center gap-2 dropdown-toggle ${styles.userIcon}`}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="border border-2 px-2 py-1 border-gray rounded-circle">
                  <FaHouseUser />
                </div>
                <p className="my-auto">{user?.name}</p>
              </a>
              {/* </button> */}
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <Link className="dropdown-item" to="/user/myprofile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/user/mylistings/houses">
                    My listings
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/user/myshortlists/houses"
                  >
                    My Shortlists
                  </Link>
                </li>
                <li>
                  <div
                    className={`dropdown-item ${styles.logout_button}`}
                    href="#"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </li>
              </ul>
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
        </div>

        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}
      </div>
      {showRegister && (
        <Register
          showRegister={showRegister}
          setShowRegister={setShowRegister}
          user={user}
          setUser={setUser}
          setShowLogin={setShowLogin}
        />
      )}
      {showLogin && (
        <Login
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          user={user}
          setUser={setUser}
          setShowRegister={setShowRegister}
        />
      )}
    </nav>
  );
};

export default Navbar;
