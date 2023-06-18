import React from "react";
import styles from "./styles.module.css";

import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import AuthModal from "../AuthModal";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormError from "../FormError";

import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../store/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Weak Password"),
});

const Login = ({
  showLogin = false,
  setShowLogin = () => {},
  // setUser = () => {},
}) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    setShowLogin(false);
  };

  const onSubmit = async (values) => {
    try {
      const { data } = await axios.post("/public/api/login", values);
      const { success = false, user = {} } = data;
      if (success) {
        dispatch(setUserDetails(user));
        setShowLogin(false);
        // setUser(user);
        toast.success("Login Successful", {
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
                <div className={styles.forgot_pwd} onClick={handleClose}>
                  <p>
                    <Link to="/forgotpassword">
                      <small>Forgot Password?</small>
                    </Link>
                  </p>
                </div>
                <p className="text-center mt-4">
                  <small>
                    By continuing you agree to our{" "}
                    <span className={styles.terms}>Terms & Conditions</span>
                  </small>
                </p>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Login;
