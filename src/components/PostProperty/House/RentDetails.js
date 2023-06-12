import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import PostFormError from "../PostFormError";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  partNo: "3",
  rent: "",
  rent_negotiable: "",
  deposit: "",
  monthly_maintenance: "",
  maintenance_amount: "",
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
  maintenance_amount: Yup.number(),
  available_from: Yup.string().required("information required"),
  furnishing_type: Yup.string().required("Information required"),
  parking: Yup.string().required("Information required"),
  preferred_tenants: Yup.string().required("Information required"),
});

function RentDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const [houseObject, setHouseObject] = useState(null);

  const { id: houseId } = useParams();

  const formatDate = (date) => {
    console.log(date);
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // fetch data when first time page loads
  useEffect(() => {
    try {
      const fetchData = async (houseId) => {
        const { data } = await axios.get(
          `/secure/api/gethouse?houseId=${houseId}`
        );
        if (data.available_from !== null) {
          data.available_from = formatDate(data.available_from);
        }
        setHouseObject(data);
      };

      fetchData(houseId);
    } catch (err) {
      console.log(err);
    }
  }, [houseId]);

  let formValues = {};

  if (houseObject) {
    formValues = Object.entries(initialValues).reduce(
      (result, [key, value]) => {
        if (
          // eslint-disable-next-line no-prototype-builtins
          houseObject.hasOwnProperty(key) &&
          // eslint-disable-next-line no-prototype-builtins
          initialValues.hasOwnProperty(key)
        ) {
          if (houseObject[key] === null) result[key] = value;
          else result[key] = houseObject[key];
        }
        return result;
      },
      {}
    );
  } else {
    formValues = initialValues;
  }

  formValues.partNo = "3";

  if (formValues.maintenance_amount === "") {
    formValues.maintenance_amount = 0;
  }

  const onSubmit = async (values) => {
    try {
      await axios.post(
        `secure/api/newProperty/house/update/${houseId}`,
        values
      );
      navigate(`/property/manage/house/${houseId}/amenities`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`container`}>
      <div className={`d-flex flex-column flex-sm-row justify-content-center`}>
        <div className={`w-20 ${styles.container}`}>
          <Sidebar pathname={location.pathname} />
        </div>
        <div
          className={`w-75 ms-2 px-4 d-flex flex-column ${styles.container}`}
        >
          <h5 className="ps-4 py-4 border-bottom">Rental Details</h5>
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ values, setFieldValue }) => (
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
                      value={values.monthly_maintenance}
                      onChange={(e) => {
                        setFieldValue("monthly_maintenance", e.target.value);
                      }}
                      className={`form-control ${styles.selectBox}`}
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
                  {values.monthly_maintenance === "Maintenance Extra" && (
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
                      value={values.available_from}
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
                      className={`form-control ${styles.selectBox}`}
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
                      value={values.parking}
                      onChange={(e) => {
                        setFieldValue("parking", e.target.value);
                      }}
                      className={`form-control ${styles.selectBox}`}
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
                      className={`form-control ${styles.selectBox}`}
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
