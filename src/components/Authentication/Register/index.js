import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./styles.module.css";
import AuthModal from "../AuthModal";
import { Button, Form, Modal, Container, Row, Col } from "react-bootstrap";

const stylingObject = {
  input: {
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0",
  },

  button: {
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
    minWidth: "fit-content",
  },
};

const Register = ({ show = false, setShow = () => {} }) => {
  const [value, setValue] = useState();

  const handleClose = () => {
    setShow(false);
  };
  return (
    <div>
      <Modal
        show={show}
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
            <Row className="my-2">
              <AuthModal />
              <Col xs={12} md={8}>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <div className="d-flex w-100 align-items-stretch">
                      <Form.Control
                        type="email"
                        placeholder="Enter email like name@gmail.com"
                        className="mr-2 w-auto flex-grow-1"
                        style={stylingObject.input}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control type="text" placeholder="Name" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPhone">
                    <PhoneInput
                      placeholder="Enter phone number"
                      country="in"
                      value={value}
                      onChange={setValue}
                      inputStyle={{ width: "100%" }}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 justify-content-end"
                  >
                    Continue
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

export default Register;
