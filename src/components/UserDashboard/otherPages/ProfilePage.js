import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { useDispatch } from "react-redux";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUserDetails } from "../../../store/actions";
import styles from "../styles.module.css";
function ProfilePage({ userDetails = {} }) {
  const dispatch = useDispatch();
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const { name, email, phone_number, id, verified } = userDetails || {};

  useEffect(() => {
    setNewEmail(email);
    setNewName(name);
    setNewPhoneNumber(phone_number);
  }, [email, name, phone_number, userDetails]);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get("/secure/api/user/me");
      dispatch(setUserDetails(data));
    };
    fetch();
  }, []);

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/secure/api/updateProfile", {
        id,
        newName,
        newEmail,
        newPhoneNumber,
      });
      console.log("data:", data);
      if (data.success === true) {
        toast.success("Profile Updated", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        const { data } = await axios.get("/secure/api/user/me");
        dispatch(setUserDetails(data));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const [showPopover, setShowPopover] = useState(false);
  const handleShowPopover = () => {
    setShowPopover(true);
  };
  const handleHidePopover = () => {
    setShowPopover(false);
  };
  const [timer, setTimer] = useState(60);
  const [disabled, setDisabled] = useState(false);
  const sendVerificationMail = async (e) => {
    e.preventDefault();
    try {
      setDisabled(true);
      const { data } = await axios.post(
        "/secure/api/generateVerificationEmail",
        {
          email: newEmail,
        }
      );
      if (data.success === true) {
        toast.success("Verification Link has been sent to your email", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      setTimeout(() => {
        setDisabled(false);
        setTimer(60);
      }, 60000);
    } catch (e) {
      console.log(e);
      setTimeout(() => {
        setDisabled(false);
        setTimer(60);
      }, 60000);
    }
  };
  useEffect(() => {
    let intervalId = null;
    if (disabled) {
      intervalId = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [disabled]);

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={`${styles.sidebar_right}`}>
        <div className="container">
          <p className="fw-bold border-bottom py-4">Edit Your Profile</p>
          <form onSubmit={saveProfile}>
            <div className="row gap-4 py-2 my-2">
              <p className="col">Name</p>
              <div className="d-flex w-50 align-items-center">
                <input
                  type="text"
                  onChange={(e) => setNewName(e.target.value)}
                  value={newName}
                  className="col"
                />
              </div>
            </div>
            <div className="row gap-4 py-2 my-2 d-flex justify-content-start">
              <p className="col">Email Address</p>
              <div className="d-flex flex-column w-50 align-items-center position-relative">
                <div className="w-100 d-flex">
                  <input
                    type="email"
                    onChange={(e) => setNewEmail(e.target.value)}
                    value={newEmail}
                    className="col w-100"
                    disabled={verified}
                  />
                  {verified ? (
                    <>
                      <TiTick
                        size={30}
                        color="green"
                        onMouseEnter={handleShowPopover}
                        onMouseLeave={handleHidePopover}
                        className={styles.cursor_pointer}
                      />
                      <div
                        className={`${styles.popover} ${
                          showPopover
                            ? styles.show_popover
                            : styles.hide_popover
                        }`}
                      >
                        Email verified
                      </div>
                    </>
                  ) : (
                    <>
                      <BsFillExclamationTriangleFill
                        size={25}
                        color="#bc0b0b"
                        onMouseEnter={handleShowPopover}
                        onMouseLeave={handleHidePopover}
                        className={styles.cursor_pointer}
                      />
                      <div
                        className={`${styles.popover} ${
                          showPopover
                            ? styles.show_popover
                            : styles.hide_popover
                        }`}
                      >
                        Email not verified
                      </div>
                    </>
                  )}
                </div>
                {!verified && (
                  <div className="d-flex justify-content-between w-100 p-2 ps-0 pt-0 position-relative text-left">
                    <button
                      className={`${styles.verification_link} text-start`}
                      onClick={sendVerificationMail}
                      disabled={disabled}
                    >
                      <small>click here to generate verification mail</small>
                    </button>
                    <div className={`position-absolute ${styles.timer}`}>
                      {disabled && `00 : ${timer >= 10 ? timer : `0${timer}`}`}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="row gap-4 py-2 my-2">
              <p className="col">Phone No.</p>
              <div className="d-flex w-50 align-items-center">
                <input
                  type="tel"
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                  value={newPhoneNumber}
                  className="col"
                  disabled
                />
                {/* <TiTick size={30} color="green" /> */}
              </div>
            </div>
            <button type="button" className="btn btn-primary my-2">
              Save Profile
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProfilePage;
