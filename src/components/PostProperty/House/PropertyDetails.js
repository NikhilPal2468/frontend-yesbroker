import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import PostFormError from "../PostFormError";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./SideBar/sidebar";
import styles from "./styles.module.css";

const initialValues = {
  property_type: "",
  apartment_name: "",
  bhk_type: "",
  floor: "",
  total_floors: "",
  property_age: "",
  facing: "",
  builtup_area: "",
};

const PROPERTY_TYPES = [
  { key: "Apartment" },
  { key: "Independent House" },
  { key: "Gated Community" },
];

const BHK_TYPES = [
  { key: "1 RK" },
  { key: "1 BHK" },
  { key: "2 BHK" },
  { key: "3 BHK" },
  { key: "4 BHK" },
  { key: "4+ BHK" },
];

const PROPERTY_AGE = [
  { key: "Less than 1 year" },
  { key: "Between 1 to 3 years" },
  { key: "Between 3 to 5 years" },
  { key: "Between 5 to 10 years" },
  { key: "Greater than 10 years" },
];

const FACING = [
  { key: "North" },
  { key: "South" },
  { key: "East" },
  { key: "West" },
  { key: "North-East" },
  { key: "North-West" },
  { key: "South-East" },
  { key: "South-West" },
  { key: "Don't Know" },
];

const FLOORS = [
  { key: "Ground" },
  { key: "1" },
  { key: "2" },
  { key: "3" },
  { key: "4" },
  { key: "5" },
  { key: "6" },
  { key: "7" },
  { key: "8" },
  { key: "9" },
  { key: "10" },
  { key: "11" },
  { key: "12" },
  { key: "13" },
  { key: "14" },
  { key: "15" },
  { key: "16" },
  { key: "17" },
  { key: "18" },
  { key: "19" },
  { key: "20" },
  { key: "21" },
  { key: "22" },
  { key: "23" },
  { key: "24" },
  { key: "25" },
  { key: "26" },
  { key: "27" },
  { key: "28" },
  { key: "29" },
  { key: "30" },
  { key: "31" },
  { key: "32" },
  { key: "33" },
  { key: "34" },
  { key: "35" },
  { key: "36" },
  { key: "37" },
  { key: "38" },
  { key: "39" },
  { key: "40" },
  { key: "41" },
  { key: "42" },
  { key: "43" },
  { key: "44" },
  { key: "45" },
  { key: "46" },
  { key: "47" },
  { key: "48" },
  { key: "49" },
  { key: "50" },
  { key: "51" },
  { key: "52" },
  { key: "53" },
  { key: "54" },
  { key: "55" },
  { key: "56" },
  { key: "57" },
  { key: "58" },
  { key: "59" },
  { key: "60" },
  { key: "61" },
  { key: "62" },
  { key: "63" },
  { key: "64" },
  { key: "65" },
  { key: "66" },
  { key: "67" },
  { key: "68" },
  { key: "69" },
  { key: "70" },
  { key: "71" },
  { key: "72" },
  { key: "73" },
  { key: "74" },
  { key: "75" },
  { key: "76" },
  { key: "77" },
  { key: "78" },
  { key: "79" },
  { key: "80" },
  { key: "81" },
  { key: "82" },
  { key: "83" },
  { key: "84" },
  { key: "85" },
  { key: "86" },
  { key: "87" },
  { key: "88" },
  { key: "89" },
  { key: "90" },
  { key: "91" },
  { key: "92" },
  { key: "93" },
  { key: "94" },
  { key: "95" },
  { key: "96" },
  { key: "97" },
  { key: "98" },
  { key: "99" },
];

const validationSchema = Yup.object({
  property_type: Yup.string().required("Select Property Type"),
  apartment_name: Yup.string(),
  bhk_type: Yup.string().required("Select BHK Type"),
  floor: Yup.string().required("Floors required"),
  total_floors: Yup.string().required("Total floors required"),
  property_age: Yup.string().required("Property Age required"),
  facing: Yup.string().required("Building Facing is required"),
  builtup_area: Yup.string().required("Built Up Area is Required"),
});

function PropertyDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const houseObject = location.state;

  const formValues = Object.entries(initialValues).reduce(
    (result, [key, value]) => {
      console.log(value);
      if (
        houseObject &&
        // eslint-disable-next-line no-prototype-builtins
        houseObject.hasOwnProperty(key) &&
        // eslint-disable-next-line no-prototype-builtins
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
    try {
      const { data } = await axios.post(
        `secure/api/newProperty/house/update/${location.state.id}`,
        values
      );

      const { house } = data;
      navigate(`/property/manage/house/${house.id}/locality`, {
        state: { ...house },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectChange = (setFieldValue, propertyType) => {
    setFieldValue("property_type", propertyType);
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
          <h5 className="ps-4 py-4 border-bottom">Property Details</h5>
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ values, setFieldValue }) => (
              <Form className="w-100 p-2 px-4">
                {/* Property Type */}
                <div className="d-flex flex-column flex-sm-row align-items-center justify-content-around w-100 gap-4">
                  <div className="mb-3 w-100">
                    <label htmlFor="property_type">Property Type</label>
                    <Field
                      component="select"
                      id="property_type"
                      name="property_type"
                      className="form-control"
                      value={values.property_type}
                      onChange={(event) => {
                        handleSelectChange(setFieldValue, event.target.value);
                      }}
                    >
                      <option value="">Select</option>
                      {PROPERTY_TYPES.map((type) => (
                        <option key={type.key} value={type.key}>
                          {type.key}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="property_type"
                      component={PostFormError}
                    />
                  </div>

                  {values.property_type === "Apartment" ? (
                    <div className="mb-3 w-100">
                      <label htmlFor="apartment_name">Apartment Name</label>
                      <Field
                        type="text"
                        id="apartment_name"
                        name="apartment_name"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="apartment_name"
                        component={PostFormError}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="d-flex flex-column flex-md-row align-items-center justify-content-around w-100 gap-4">
                  {/* Bhk Type */}
                  <div className="mb-3 w-100 pb-2">
                    <label htmlFor="bhk_type">BHK Type</label>
                    <Field
                      component="select"
                      id="bhk_type"
                      name="bhk_type"
                      className="form-control"
                    >
                      <option value="">Select</option>
                      {BHK_TYPES.map((type) => (
                        <option key={type.key} value={type.key}>
                          {type.key}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="bhk_type" component={PostFormError} />
                  </div>

                  <div className="mb-3 w-100 d-flex flex-row align-items-center justify-content-around gap-2 mt-3 pb-2">
                    {/* Floor */}
                    <div className="mb-3 w-100">
                      <label htmlFor="floor">FLoor</label>
                      <Field
                        component="select"
                        id="floor"
                        name="floor"
                        className="form-control h-25"
                      >
                        <option value="">Select</option>
                        {FLOORS.map((type) => (
                          <option key={type.key} value={type.key}>
                            {type.key}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="floor" component={PostFormError} />
                    </div>
                    {/* Total Floors */}
                    <div className="mb-3 w-100">
                      <label htmlFor="total_floors">Total Floors</label>
                      <Field
                        component="select"
                        id="total_floors"
                        name="total_floors"
                        className="form-control"
                      >
                        <option value="">Select</option>
                        {FLOORS.map((type) => (
                          <option key={type.key} value={type.key}>
                            {type.key}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="total_floors"
                        component={PostFormError}
                      />
                    </div>
                  </div>
                </div>

                {/* Property age */}
                <div className="mb-3">
                  <label htmlFor="property_age">Property Age</label>
                  <Field
                    component="select"
                    id="property_age"
                    name="property_age"
                    className="form-control"
                  >
                    <option value="">Select</option>
                    {PROPERTY_AGE.map((type) => (
                      <option key={type.key} value={type.key}>
                        {type.key}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="property_age" component={PostFormError} />
                </div>

                {/* Facing */}
                <div className="mb-3">
                  <label htmlFor="facing">Facing</label>
                  <Field
                    component="select"
                    id="facing"
                    name="facing"
                    className="form-control"
                  >
                    <option value="">Select</option>
                    {FACING.map((type) => (
                      <option key={type.key} value={type.key}>
                        {type.key}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="facing" component={PostFormError} />
                </div>

                {/* Bulitup Area */}
                <div className="mb-3">
                  <div>
                    <label>Builtup Area(in Sq.ft)</label>
                    <Field
                      type="number"
                      id="builtup_area"
                      name="builtup_area"
                      className="form-control"
                    />
                  </div>
                  <ErrorMessage name="builtup_area" component={PostFormError} />
                </div>

                <Button
                  variant="primary"
                  type="submit"
                  className={`w-100 justify-content-end primary-color mt-2`}
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

export default PropertyDetails;
