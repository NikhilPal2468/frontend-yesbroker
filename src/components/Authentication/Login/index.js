import React from "react";
import styles from "./styles.module.css";

import { Button, Form, Modal, Container, Row, Col } from "react-bootstrap";
import AuthModal from "../AuthModal";

const stylingObject = {
  input: {
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0",
  },

  button: {
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
  },
};

const Login = ({ showLogin = false, setShowLogin = () => {} }) => {
  const handleClose = () => {
    setShowLogin(false);
  };

  return (
    <div>
      <Modal
        show={showLogin}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Find your next sweet HOME</Modal.Title>
        </Modal.Header>

        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <AuthModal />
              <Col
                xs={12}
                md={8}
                className="d-flex flex-column align-items-center justify-content-center"
              >
                <Form className="w-100 p-2">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Enter email like name@gmail.com"
                      style={stylingObject.input}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 justify-content-end"
                  >
                    Login
                  </Button>
                </Form>
                <p className="text-center mt-4">
                  <small>
                    By continuing you agree to our{" "}
                    <span className={styles["terms"]}>Terms & Conditions</span>
                  </small>
                </p>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
