import React from "react";
import styles from "./styles.module.css";

import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import AuthModal from "../AuthModal";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormError from "../FormError";

import axios from "axios";

const initialValues = {
  email: "",
  password: "",
};

const onSubmit = async (values) => {
  console.log(values);
  try {
    const { data } = await axios.post("/login", values);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Weak Password"),
});

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
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  <Form className="w-100 p-2">
                    <ErrorMessage name="email" component={FormError} />
                    <div className="mb-3">
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email like name@gmail.com"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <ErrorMessage name="password" component={FormError} />
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        className="form-control"
                      />
                    </div>

                    <Button
                      variant="primary"
                      type="submit"
                      className={`w-100 justify-content-end ${styles.primary_color}`}
                    >
                      Login
                    </Button>
                  </Form>
                </Formik>
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
