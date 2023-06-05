import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "react-bootstrap";
import { FaHouseUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../../store/actions";
import Register from "../../Authentication/Register";
import Login from "../../Authentication/Login";
const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user?.userDetails);
  // const [user, setUser] = useState(userDetails);
  useEffect(() => {
    // Retrieve user details from browser storage on component mount
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUserDetails) {
      dispatch(setUserDetails(storedUserDetails));
      setUser(storedUserDetails);
    } else {
      setUser(userDetails);
    }
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    navigate("/");
    dispatch(setUserDetails(null));
    setUser(null);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light card shadow-sm p-3 bg-white rounded">
      <div className="container-fluid">
        <div className={styles.navbar_left}>
          <img src="/images/logo.png" alt="logo" />
          <Link to={`/`} className="navbar-brand">
            HomeWale
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
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
            </li>
          </ul>
          {/* <span className="navbar-text">
            Navbar text with an inline element
          </span> */}
        </div>
        {user ? (
          <div className="dropdown">
            <div
              className={`d-flex flex-row border border-dark pe-2 rounded-5 border-1 border-left-0 align-items-center justify-content-center gap-2  ${styles.userIcon}`}
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div className="border border-2 px-2 py-1 border-gray rounded-circle">
                <FaHouseUser />
              </div>
              <p className="my-auto">{user?.name}</p>
            </div>
            {/* </button> */}
            <div
              className={`dropdown-menu`}
              aria-labelledby="dropdownMenuButton"
            >
              <Link className="dropdown-item" to={"/user/myprofile"}>
                Profile
              </Link>
              <Link className="dropdown-item" onClick={handleLogout} to={"/"}>
                Logout
              </Link>
            </div>
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
      {showRegister && (
        <Register
          show={showRegister}
          setShow={setShowRegister}
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
        />
      )}
    </nav>
  );
};

export default Navbar;
