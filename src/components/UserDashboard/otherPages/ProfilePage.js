import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { useDispatch, useSelector } from "react-redux";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUserDetails } from "../../../store/actions";
import styles from "../styles.module.css";
function ProfilePage() {
  const dispatch = useDispatch();
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const userDetails = useSelector((state) => state.user?.userDetails);

  const { name, email, phone_number, id, verified } = userDetails || {};

  useEffect(() => {
    setNewEmail(email);
    setNewName(name);
    setNewPhoneNumber(phone_number);
  }, [email, name, phone_number, userDetails]);

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
      const { data } = await axios.post("/secure/api/verifyEmail", {
        email: newEmail,
      });
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
    <div className="w-100">
      <div className="row h-100">
        <div className={`${styles.primary} col-12 col-lg-3`}>
          <SideBar />
        </div>
        <div className="col-12 col-lg-6">
          <div className="container">
            <p className="fw-bold border-bottom py-4">Edit Your Profile</p>
            <form onSubmit={saveProfile}>
              <div className="row gap-4 p-2 m-2">
                <p className="col">Name</p>
                <div className="d-flex w-50">
                  <input
                    type="text"
                    onChange={(e) => setNewName(e.target.value)}
                    value={newName}
                    className="col"
                  />
                </div>
              </div>
              <div className="row gap-4 p-2 m-2">
                <p className="col">Email Address</p>
                <div className="d-flex w-50 align-items-center position-relative">
                  <input
                    type="email"
                    onChange={(e) => setNewEmail(e.target.value)}
                    value={newEmail}
                    className="col"
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
              </div>
              {!verified && (
                <div className="d-flex justify-content-between p-2 mx-5 position-relative">
                  <div></div>
                  <button
                    className={styles.verification_link}
                    onClick={sendVerificationMail}
                    disabled={disabled}
                  >
                    click here to generate verification mail
                  </button>
                  <div className={`position-absolute ${styles.timer}`}>
                    {disabled && `00 : ${timer >= 10 ? timer : `0${timer}`}`}
                  </div>
                </div>
              )}
              <div className="row gap-4 p-2 m-2">
                <p className="col">Phone No.</p>
                <div className="d-flex w-50 align-items-center">
                  <input
                    type="tel"
                    onChange={(e) => setNewPhoneNumber(e.target.value)}
                    value={newPhoneNumber}
                    className="col"
                    disabled
                  />
                  <TiTick size={30} color="green" />
                </div>
              </div>
              <button type="button" className="btn btn-primary m-2">
                Save Profile
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProfilePage;
