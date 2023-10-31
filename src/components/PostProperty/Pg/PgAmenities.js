import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./SideBar/sidebar";
import styles from "./styles.module.css";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import PostFormError from "../PostFormError";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomPhoneInput from "../../Authentication/Register/CustomPhoneInput";
import { PgAMENITIES } from "../../constants";
import { LoadContext } from "../../../context/load-context";

const WATER_SUPPLY = [
  { key: "CORPORATION" },
  { key: "BOREWELL" },
  { key: "BOTH" },
];

const initialValues = {
  ac: false,
  attached_bathroom: false,
  fridge: false,
  water_filter: false,
  washing_machine: false,
  tv: false,
  geyser: false,
  two_wheeler_parking: false,
  four_wheeler_parking: false,
  lift: false,
  cctv: false,
  power_backup: false,
  gated_security: false,
  wifi: false,
  fire_safety: false,
  club_house: false,
  room_cleaning: false,
  tt_table: false,
  water_supply: "",
  secondary_number: "",
  gym: false,
  cooking_allowed: false,
};

const validationSchema = Yup.object({
  ac: Yup.boolean(),
  attached_bathroom: Yup.boolean(),
  fridge: Yup.boolean(),
  water_filter: Yup.boolean(),
  washing_machine: Yup.boolean(),
  tv: Yup.boolean(),
  geyser: Yup.boolean(),
  two_wheeler_parking: Yup.boolean(),
  four_wheeler_parking: Yup.boolean(),
  lift: Yup.boolean(),
  cctv: Yup.boolean(),
  power_backup: Yup.boolean(),
  gated_security: Yup.boolean(),
  wifi: Yup.boolean(),
  fire_safety: Yup.boolean(),
  club_house: Yup.boolean(),
  room_cleaning: Yup.boolean(),
  tt_table: Yup.boolean(),
  water_supply: Yup.string(),
  secondary_number: Yup.string(),
  gym: Yup.boolean(),
  cooking_allowed: Yup.boolean(),
});

function PgAmenities() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setLoading } = useContext(LoadContext);

  const [pgObject, setPgObject] = useState(null);
  const { id: pgId } = useParams();

  useEffect(() => {
    try {
      const fetchData = async (pgId) => {
        setLoading(true);
        const { data } = await axios.get(`/secure/api/getpg?pgId=${pgId}`);
        setPgObject(data);
      };

      fetchData(pgId);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [pgId]);

  let formValues = {};

  if (pgObject) {
    formValues = Object.entries(initialValues).reduce(
      (result, [key, value]) => {
        if (
          // eslint-disable-next-line no-prototype-builtins
          pgObject.hasOwnProperty(key) &&
          // eslint-disable-next-line no-prototype-builtins
          initialValues.hasOwnProperty(key)
        ) {
          if (pgObject[key] === null) result[key] = value;
          else result[key] = pgObject[key];
        }
        return result;
      },
      {}
    );
  } else {
    formValues = initialValues;
  }

  formValues.partNo = "4";

  const onSubmit = async (values) => {
    try {
      await axios.post(`/secure/api/newProperty/pg/update/${pgId}`, values);

      navigate(`/property/manage/pg/${pgId}/gallery`);
    } catch (err) {
      console.log(err);
    }
  };
  const renderAmenities = () => {
    const renderedItems = [];

    for (let i = 0; i <= PgAMENITIES.length - 4; i += 4) {
      renderedItems.push(
        <div className="container d-flex mx-auto mb-2 w-100" key={i}>
          <div className="d-flex gap-1 align-items-center w-100 gap-2">
            <div className="d-flex flex-column flex-md-row gap-2 w-100">
              <div className="d-flex align-items-center justify-content-center w-100">
                <Field
                  type="checkbox"
                  name={PgAMENITIES[i].key}
                  id={PgAMENITIES[i].key}
                  className={`${styles.input_checkbox} w-25`}
                />
                <label
                  className={`${styles.input_label}  p-2 p-2 py-4 w-100`}
                  htmlFor={PgAMENITIES[i].key}
                >
                  {PgAMENITIES[i].icon} {PgAMENITIES[i].label}
                </label>
              </div>
              <div className="d-flex align-items-center justify-content-center w-100">
                <Field
                  type="checkbox"
                  name={PgAMENITIES[i + 1].key}
                  id={PgAMENITIES[i + 1].key}
                  className={`${styles.input_checkbox} w-25`}
                />
                <label
                  className={`${styles.input_label}  p-2 p-2 py-4 w-100`}
                  htmlFor={PgAMENITIES[i + 1].key}
                >
                  {PgAMENITIES[i + 1].icon} {PgAMENITIES[i + 1].label}
                </label>
              </div>
            </div>
            <div className="d-flex flex-column flex-md-row gap-2 w-100">
              <div className="d-flex align-items-center justify-content-center w-100">
                <Field
                  type="checkbox"
                  name={PgAMENITIES[i + 2].key}
                  id={PgAMENITIES[i + 2].key}
                  className={`${styles.input_checkbox} w-25`}
                />
                <label
                  className={`${styles.input_label}  p-2 p-2 py-4 w-100`}
                  htmlFor={PgAMENITIES[i + 2].key}
                >
                  {PgAMENITIES[i + 2].icon} {PgAMENITIES[i + 2].label}
                </label>
              </div>
              <div className="d-flex align-items-center justify-content-center w-100">
                <Field
                  type="checkbox"
                  name={PgAMENITIES[i + 3].key}
                  id={PgAMENITIES[i + 3].key}
                  className={`${styles.input_checkbox} w-25`}
                />
                <label
                  className={`${styles.input_label}  p-2 p-2 py-4 w-100`}
                  htmlFor={PgAMENITIES[i + 3].key}
                >
                  {PgAMENITIES[i + 3].icon} {PgAMENITIES[i + 3].label}
                </label>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return renderedItems;
  };

  return (
    <div className="container">
      <div className={`d-flex flex-column flex-sm-row justify-content-center`}>
        <div className={`w-20 ${styles.container}`}>
          <Sidebar pathname={location.pathname} />
        </div>
        <div
          className={`w-75 ms-2  px-4 d-flex flex-column ${styles.container}`}
        >
          <h5 className="ps-4 py-4 border-bottom">Amenities</h5>
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ values }) => (
              <Form className="w-100 p-2 px-4">
                {/* Bathroom Count */}
                <div className="d-flex flex-column flex-sm-row align-items-center justify-content-around w-100 gap-4"></div>

                <div className="d-flex flex-column flex-md-row align-items-center justify-content-around w-100 gap-4">
                  <div className="mb-3 w-100">
                    <label htmlFor="water_supply">Water Supply</label>
                    <Field
                      component="select"
                      id="water_supply"
                      name="water_supply"
                      className="form-control"
                    >
                      <option value="">Select</option>
                      {WATER_SUPPLY.map((type) => (
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

                  <div className="mb-3 w-100">
                    <label htmlFor="secondary_number">Secondary Number</label>
                    <Field
                      name="secondary_number"
                      id="secondary_number"
                      type="tel"
                      values={values}
                      variable="secondary_number"
                      component={CustomPhoneInput}
                    />
                  </div>
                </div>
                {renderAmenities()}
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

export default PgAmenities;
