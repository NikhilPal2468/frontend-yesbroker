import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./styles.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const validateEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/public/api/forgot-password", {
        email,
      });
      const { success = false } = data || {};
      if (success === true) {
        setTimeout(() => {
          navigate("/");
        }, 3000);
        toast.success(
          "Link for changing the password has been sent to your email",
          {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      }
    } catch (e) {
      toast.error(e?.response?.data?.message, {
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
  };
  return (
    <div className={styles.forgot_password}>
      <div className={styles.heading}>
        Enter registered email to reset the password
      </div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Button onClick={validateEmail} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
