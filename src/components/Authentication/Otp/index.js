import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { setUserDetails } from "../../../store/actions";
import { useDispatch } from "react-redux";

const Otp = ({ userId, setShow = () => {} }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [disabled, setDisabled] = useState(true);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp((prevOtp) => {
      let newOtp = prevOtp.map((val, idx) => {
        if (idx === index) return element.value;
        else return val;
      });

      return newOtp;
    });

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (userId === null) return;

    const fullOTP = otp.join("");

    const values = {
      otp: fullOTP,
      userId,
    };

    try {
      const { data } = await axios.post("/public/api/verify-token", values);
      const { success = false, user = {} } = data;
      if (success) {
        setShow(false);
        dispatch(setUserDetails(user));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fullOTP = otp.join("");

    if (fullOTP.length === 4) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [otp]);

  return (
    <div
      className={`d-flex text-center flex-column justify-content-center align-items-center ${styles.otpContainer}`}
    >
      <h2>Please verify your account</h2>
      <p>Enter OTP</p>
      <form
        onSubmit={handleFormSubmit}
        className={`d-flex flex-column justify-content-center align-items-center py-4 ${styles.otpForm}`}
      >
        <div
          className={`d-flex flex-row justify-content-around align-items-center mb-2 ${styles.otpDiv}`}
        >
          {otp.map((data, index) => {
            return (
              <input
                className={`flex-1 ${styles.otpInput} mx-2`}
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            );
          })}
        </div>
        <Button
          variant="primary"
          type="submit"
          className={`w-100 justify-content-end mt-4 ${styles.primary_color}`}
          disabled={disabled}
        >
          Verify
        </Button>
      </form>
    </div>
  );
};

export default Otp;
