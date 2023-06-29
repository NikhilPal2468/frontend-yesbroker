import React, { useContext, useState } from "react";

import "react-phone-input-2/lib/style.css";
import styles from "./styles.module.css";
import AuthModal from "../AuthModal";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormError from "../FormError";

import CustomPhoneInput from "./CustomPhoneInput";
import Otp from "../Otp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../store/actions";
import { AuthContext } from "../../../context/AuthContext";

const Register = ({
  showRegister = false,
  setShowRegister = () => {},
  setUser = () => {},
  setShowLogin = () => {},
}) => {
  const dispatch = useDispatch();
  const [displayOtp, setDisplayOtp] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleClose = () => {
    setShowRegister(false);
  };

  const initialValues = {
    email: "",
    name: "",
    password: "",
    phone_number: "",
  };

  const { register } = useContext(AuthContext);
  const onSubmit = async (values) => {
    try {
      // const { data } = await axios.post("/public/api/register", values);
      const data = await register(values);
      const { user = {}, success = false, token = "" } = data || {};

      if (success) {
        dispatch(setUserDetails({ user, token }));
        toast.success("Account registered, enter otp to verify email", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setDisplayOtp(true);
        setUserId(user?.id);
        setUser(user);
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

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Weak Password"),
    name: Yup.string().required("Name is required"),
    phone_number: Yup.string()
      .required("Phone number is required")
      .min(8, "Invalid Phone number")
      .max(13, "Invalid Phone number"),
  });

  const openLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <div>
      <ToastContainer />
      <Modal
        show={showRegister}
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
                {displayOtp ? (
                  <Otp setShowRegister={setShowRegister} userId={userId} />
                ) : (
                  <>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                    >
                      {({ values }) => (
                        <Form>
                          <div className="mb-3">
                            <Field
                              type="email"
                              name="email"
                              id="email"
                              placeholder="Enter email like name@gmail.com"
                              className="form-control"
                            />
                            <ErrorMessage name="email" component={FormError} />
                          </div>

                          <div className="mb-3">
                            <Field
                              type="text"
                              name="name"
                              id="name"
                              placeholder="Name"
                              className="form-control"
                            />
                            <ErrorMessage name="name" component={FormError} />
                          </div>

                          <div className="mb-3">
                            <Field
                              type="password"
                              name="password"
                              id="password"
                              placeholder="Password"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="password"
                              component={FormError}
                            />
                          </div>

                          <div className="mb-3">
                            <Field
                              name="phone_number"
                              id="phone_number"
                              type="tel"
                              values={values}
                              variable="phone_number"
                              component={CustomPhoneInput}
                            />
                          </div>

                          <Button
                            variant="primary"
                            type="submit"
                            className={`w-100 justify-content-end ${styles.primary_color}`}
                          >
                            Continue
                          </Button>
                        </Form>
                      )}
                    </Formik>
                    <div className="d-flex flex-row justify-content-between align-items-center ">
                      <p>
                        <small>
                          Have an account?{" "}
                          <span
                            onClick={openLogin}
                            role="button"
                            className="text-primary"
                          >
                            Login
                          </span>
                        </small>
                      </p>
                    </div>
                    <p className="text-center mt-4">
                      <small>
                        By continuing you agree to our{" "}
                        <span className={styles.terms}>Terms & Conditions</span>
                      </small>
                    </p>
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Register;
