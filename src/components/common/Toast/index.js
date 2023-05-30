import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const Toast1 = ({
  show = false,
  setShow = () => {},
  autohide = true,
  delay = 3000,
  bg = "warning",
  body = "error",
}) => {
  return (
    <ToastContainer position="middle-end" className="p-3">
      <Toast
        show={show}
        onClose={() => {
          setShow(false);
        }}
        delay={delay}
        autohide={autohide}
        bg={bg}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{bg}</strong>
        </Toast.Header>
        <Toast.Body>{body}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Toast1;
