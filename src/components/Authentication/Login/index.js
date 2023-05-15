import React from "react";
import styles from "./styles.module.css";

import { Button, Form, Modal, Container, Row, Col } from "react-bootstrap";

import { ReactComponent as LoginSVG } from "../../../assets/loginSVG.svg";
const stylingObject = {
  input: {
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0",
  },

  button: {
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
  },

  list: {
    listStyle: "none",
    padding: "0",
    paddingRight: "4px",
    marginTop: "2rem",
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
              <Col xs={12} md={4}>
                <Row>
                  <Col xs={6} md={12}>
                    <LoginSVG />
                  </Col>
                  <Col xs={6} md={12}>
                    Login/Sign up
                    <ul style={stylingObject.list}>
                      <li className="d-flex flex-row">
                        <p className="mb-0.5">✔</p>
                        <p className="mb-0.5">Complete Assistance</p>
                      </li>
                      <li className="d-flex flex-col">
                        <p className="mb-0.5">✔</p>
                        <p className="mb-0.5">Authentic Brokers</p>
                      </li>
                      <li className="d-flex flex-row">
                        <p className="mb-0.5">✔</p>
                        <p className="mb-0.5">
                          Thousands of new Listings daily
                        </p>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Col>
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
