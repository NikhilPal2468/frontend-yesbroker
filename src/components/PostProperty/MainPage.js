import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import PostFormError from "./PostFormError";
import styles from "./styles.modules.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        const pg = data.house;
        navigate(`/property/manage/pg/${pg.id}/property`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div>
        <h2>Sell or Rent your Property Hassle Free</h2>
      </div>
      <div className="row">
        <div className="col-3">
          <h4>Why post through us?</h4>
          <p>Faster tenants</p>
          <p>Hassle free listing</p>
          <p>End to end complete house solution</p>
        </div>
        <div className="col-9">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values }) => (
              <Form className="w-100 p-2">
                <div className="mb-3">
                  <label htmlFor="city">Select City</label>
                  <Field component="select" id="city" name="city">
                    <option value="">Select City</option>
                    {CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="city" component={PostFormError} />
                </div>
                <div className="mb-3">
                  <div>
                    <label>
                      <Field
                        type="radio"
                        id="propertyType"
                        name="propertyType"
                        checked={values.propertyType === "house"}
                        value="house"
                      />
                      House/Flat
                    </label>
                  </div>
                  <div>
                    <label>
                      <Field
                        type="radio"
                        id="propertyType"
                        name="propertyType"
                        checked={values.propertyType === "pg"}
                        value="pg"
                      />
                      PG/Hostel
                    </label>
                  </div>
                  <ErrorMessage name="propertyType" component={PostFormError} />
                </div>

                <Button
                  variant="primary"
                  type="submit"
                  className={`w-100 justify-content-end ${styles.primary_color}`}
                >
                  Start Posting your Ad for FREE
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
