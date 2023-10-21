import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PostFormError from "./PostFormError";
import styles from "./styles.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TiStopwatch } from "react-icons/ti";
import { BsCardChecklist } from "react-icons/bs";
import { FiKey } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";

const CITIES = ["Mumbai", "Bangalore", "Gurgaon", "Delhi", "Hyderabad"];

const initialValues = {
  city: "",
  propertyType: "",
};

const validationSchema = Yup.object({
  city: Yup.string().required("Please select a city"),
  propertyType: Yup.string().required("Please select your property type"),
});

function MainPage() {
  const navigate = useNavigate();
  const { setShowLogin } = useContext(AuthContext);

  const onSubmit = async (values) => {
    try {
      if (values.propertyType === "house") {
        const { data } = await axios.post(
          "/secure/api/newProperty/house/create",
          values
        );

        const house = data.house;
        navigate(`/property/manage/house/${house.id}/property`);
      } else if (values.propertyType === "pg") {
        const { data } = await axios.post(
          "/secure/api/newProperty/pg/create",
          values
        );
        const pg = data.pg;
        navigate(`/property/manage/pg/${pg.id}/pgdetails`);
      }
    } catch (e) {
      console.log(e);
      if (e?.response?.data === "Unauthorized") {
        toast.error("You are not logged in Please login", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setShowLogin(true);
      } else {
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
    }
  };

  return (
    <div className="container">
      <div className="">
        <h3 className="p-2 mx-1 my-4">
          Sell or Rent your Property Hassle Free
        </h3>
      </div>
      <div className="row flex-column-reverse flex-md-row border">
        <div
          className={`col-12 col-md-3 rounded text-white p-4 ${styles.leftbox}`}
        >
          <h5 className="fw-bold">Why post through us?</h5>
          <div>
            <p>
              <TiStopwatch /> Faster tenants
            </p>
            <p>
              <BsCardChecklist /> Hassle free listing
            </p>
            <p>
              <FiKey /> End to end complete house solution
            </p>
          </div>
          <div></div>
        </div>
        <div className="col-12 col-md-9">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values }) => (
              <Form className="w-100 p-2 d-flex gap-4 flex-column align-items-center">
                <div className="mb-3 w-75 text-center mt-4">
                  <Field
                    component="select"
                    id="city"
                    name="city"
                    className={`form-control px-4 py-1 ${styles.selectBox}`}
                  >
                    <option>Select City</option>
                    {CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="city" component={PostFormError} />
                </div>
                <div className="mb-3 w-75 text-center border rounded p-2">
                  <p className="border-bottom">Select property type</p>
                  <div className="w-100 mb-3 d-flex align-items-center justify-content-center text-center flex-column flex-sm-row gap-2 w-100">
                    <div className="w-100">
                      <Field
                        type="radio"
                        id="propertyType1"
                        name="propertyType"
                        checked={values.propertyType === "house"}
                        value="house"
                        className={`${styles.input_radio}`}
                      />
                      <label
                        htmlFor="propertyType1"
                        className={`${styles.input_label}`}
                        role="button"
                      >
                        House || Flat
                      </label>
                    </div>

                    <div className="w-100">
                      <Field
                        type="radio"
                        id="propertyType2"
                        name="propertyType"
                        checked={values.propertyType === "pg"}
                        value="pg"
                        className={`${styles.input_radio}`}
                      />
                      <label
                        htmlFor="propertyType2"
                        className={`${styles.input_label}`}
                        role="button"
                      >
                        Hostel || PG
                      </label>
                    </div>
                  </div>
                  <ErrorMessage name="propertyType" component={PostFormError} />
                </div>

                <div className="d-flex align-items-center mb-3">
                  <button
                    type="submit"
                    className={`w-100 justify-content-end px-2 fw-semibold py-1 rounded ${styles.button}`}
                  >
                    Start Posting your Ad for FREE
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default MainPage;
