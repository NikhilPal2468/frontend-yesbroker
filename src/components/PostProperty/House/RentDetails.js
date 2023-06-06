import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import PostFormError from "../PostFormError";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./SideBar/sidebar";
import styles from "./styles.module.css";

const FURNISHING_TYPE = [
  { key: "Fully Furnished" },
  { key: "Semi Furnished" },
  { key: "Unfurnished" },
];

const PREFERRED_TENANTS = [
  { key: "Bachelor" },
  { key: "Family" },
  { key: "Both" },
];

const PARKING = [
  { key: "Car" },
  { key: "Bike" },
  { key: "Both" },
  { key: "None" },
];

const MAINTENANCE = [
  { key: "Maintenance Included" },
  { key: "Maintenance Extra" },
];

const initialValues = {
  rent: "",
  rent_negotiable: "",
  deposit: "",
  monthly_maintenance: "",
  maintenance_amount: 0,
  available_from: "",
  furnishing_type: "",
  parking: "",
  preferred_tenants: "",
};

const validationSchema = Yup.object({
  rent: Yup.number().required("Rent is required"),
  deposit: Yup.number().required("Deposit is required"),
  rent_negotiable: Yup.boolean(),
  monthly_maintenance: Yup.string().required("Information required"),
  available_from: Yup.string().required("information required"),
  furnishing_type: Yup.string().required("Information required"),
  parking: Yup.string().required("Information required"),
  preferred_tenants: Yup.string().required("Information required"),
});

function RentDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const houseObject = location.state;

  const formValues = Object.entries(initialValues).reduce(
    (result, [key, value]) => {
      if (
        houseObject &&
        houseObject.hasOwnProperty(key) &&
        initialValues.hasOwnProperty(key)
      ) {
        if (houseObject[key] === null) result[key] = "";
        else result[key] = houseObject[key];
      }
      return result;
    },
    {}
  );

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const { data } = await axios.post(
        `secure/api/newProperty/house/update/${location.state.id}`,
        values
      );
      const { house } = data;
      navigate(`/property/manage/house/${house.id}/amenities`, {
        state: { ...house },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [maintenanceType, setMainTenanceType] = useState(
    formValues.monthly_maintenance
  );

  const handleMaintenanceChange = (event, values) => {
    const { value } = event.target;
    setMainTenanceType(value);
    values.monthly_maintenance = value;
  };

  return (
    <div className={`container`}>
      <div className={`d-flex flex-row justify-content-center`}>
        <div className={`w-20 ${styles.container}`}>
          <Sidebar pathname={location.pathname} />
        </div>
        <div
          className={`w-75 ms-2 px-4 d-flex flex-column ${styles.container}`}
        >
          <h5>Property Details</h5>
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ values }) => (
              <Form className="w-100 p-2">
                <div className="d-flex flex-column flex-md-row w-100 justify-content-center gap-4">
                  {/* Expected Rent */}
                  <div className="w-100 mb-3">
                    <div className="mb-2">
                      <label htmlFor="rent">Expected Rent</label>
                      <Field
                        type="number"
                        id="rent"
                        name="rent"
                        className="form-control"
                      />
                      <ErrorMessage name="rent" component={PostFormError} />
                    </div>
                    <div>
                      <Field
                        type="checkbox"
                        name="rent_negotiable"
                        id="rent_negotiable"
                      />
                      <label htmlFor="rent_negotiable">Rent negotiable</label>
                    </div>
                  </div>

                  {/* Expected Deposit */}
                  <div className="mb-3 w-100">
                    <label htmlFor="deposit">Expected Deposit</label>
                    <Field
                      type="number"
                      id="deposit"
                      name="deposit"
                      className="form-control"
                    />
                    <ErrorMessage name="deposit" component={PostFormError} />
                  </div>
                </div>

                <div className="d-flex flex-column flex-md-row w-100 justify-content-center gap-4">
                  {/* Maintenance */}
                  <div className="mb-3 w-100">
                    <label htmlFor="monthly_maintenance">
                      Monthly Maintenace
                    </label>
                    <Field
                      component="select"
                      id="monthly_maintenance"
                      name="monthly_maintenance"
                      value={maintenanceType}
                      onChange={(event) => {
                        handleMaintenanceChange(event, values);
                      }}
                      className="form-control"
                    >
                      <option value="">Select</option>
                      {MAINTENANCE.map((type) => (
                        <option key={type.key} value={type.key}>
                          {type.key}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="monthly_maintenance"
                      component={PostFormError}
                    />
                  </div>

                  {/* Maintenance amount */}
                  {maintenanceType === "Maintenance Extra" && (
                    <div className="mb-3 w-100">
                      <label htmlFor="maintenance_amount">
                        Maintenance amount
                      </label>
                      <Field
                        type="number"
                        id="maintenance_amount"
                        name="maintenance_amount"
                        className="form-control"
                        required
                      />
                      <ErrorMessage
                        name="maintenance_amount"
                        component={PostFormError}
                      />
                    </div>
                  )}
                </div>

                <div className="d-flex flex-column flex-md-row w-100 justify-content-center gap-4">
                  {/* Available from */}
                  <div className="mb-3 w-100">
                    <label htmlFor="available_from">Available From</label>
                    <Field
                      type="date"
                      id="available_from"
                      name="available_from"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="available_from"
                      component={PostFormError}
                    />
                  </div>

                  {/* FURNISHING TYPE */}
                  <div className="mb-3 w-100">
                    <label htmlFor="furnishing_type">Furnishing</label>
                    <Field
                      component="select"
                      id="furnishing_type"
                      name="furnishing_type"
                      className="form-control"
                    >
                      <option value="">Select</option>
                      {FURNISHING_TYPE.map((type) => (
                        <option key={type.key} value={type.key}>
                          {type.key}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="furnishing_type"
                      component={PostFormError}
                    />
                  </div>
                </div>

                <div className="d-flex flex-column flex-md-row w-100 justify-content-center gap-4">
                  {/* Parking */}
                  <div className="mb-3 w-100">
                    <label htmlFor="parking">Parking</label>
                    <Field
                      component="select"
                      id="parking"
                      name="parking"
                      className="form-control"
                    >
                      <option value="">Select</option>
                      {PARKING.map((type) => (
                        <option key={type.key} value={type.key}>
                          {type.key}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="parking" component={PostFormError} />
                  </div>

                  {/* Preferred tenants */}
                  <div className="mb-3 w-100">
                    <label htmlFor="preferred_tenants">Preferred Tenants</label>
                    <Field
                      component="select"
                      id="preferred_tenants"
                      name="preferred_tenants"
                      className="form-control"
                    >
                      <option value="">Select</option>
                      {PREFERRED_TENANTS.map((type) => (
                        <option key={type.key} value={type.key}>
                          {type.key}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="preferred_tenants"
                      component={PostFormError}
                    />
                  </div>
                </div>

                <Button
                  variant="primary"
                  type="submit"
                  className={`w-100 justify-content-end primary-color`}
                >
                  Save & Continue
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default RentDetails;
