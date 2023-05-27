import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./styles.module.css";
import axios from "axios";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const validateEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/forgot-password", {
        email,
      });

      console.log(data);
    } catch (e) {
      console.log(e);
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
    </div>
  );
};

export default ForgotPassword;
