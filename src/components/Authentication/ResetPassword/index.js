import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Toast1 from "../../common/Toast";
const ResetPassword = () => {
  const { id, token } = useParams();
  console.log("token:", token);
  console.log("email:", id);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const updatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setShowToast(true);
      return null;
    }
    try {
      const { data } = await axios.post(`/api/reset-password/${id}/${token}`, {
        newPassword,
      });
      console.log("data:", data);

      setTimeout(() => {
        navigate("/");
      }, 3000);
      setShowToast(true);
    } catch (e) {
      console.log(e);
      setTimeout(() => {
        navigate("/");
      }, 3000);
      setShowToast(true);
    }
  };
  return (
    <div className={styles.reset_password}>
      <Toast1 show={showToast} setShow={setShowToast} />
      <div className={styles.heading}>Set your new password</div>
      <Form>
        <Form.Group className="mb-3" controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            type="password"
            placeholder="New Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Group>
        <Button onClick={updatePassword} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ResetPassword;
