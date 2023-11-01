import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import PostFormError from "../PostFormError";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./SideBar/sidebar";
import styles from "./styles.module.css";
import { LoadContext } from "../../../context/load-context";

const initialValues = {
  pg_name: "",
  food_available: false,
  breakfast: false,
  lunch: false,
  dinner: false,
  gender: "any",
  smoking: false,
  drinking: false,
  nonveg: false,
  party: false,
  opposite_gender: false,
  preferred_tenant: "any",
  warden_facilities: false,
};

const validationSchema = Yup.object({
  pg_name: Yup.string().required(),
  food_available: Yup.boolean(),
  breakfast: Yup.boolean(),
  lunch: Yup.boolean(),
  dinner: Yup.boolean(),
  gender: Yup.string(),
  preferred_tenant: Yup.string(),
  smoking: Yup.boolean(),
  drinking: Yup.boolean(),
  nonveg: Yup.boolean(),
  party: Yup.boolean(),
  opposite_gender: Yup.boolean(),
  warden_facilities: Yup.boolean(),
});

function RoomDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setLoading } = useContext(LoadContext);

  const [pgObject, setPgObject] = useState(null);
  const { id: pgId } = useParams();
  const [postPropertyPageNo, setPostPropertyPageNo] = useState(0);

  let curPageNo = 1;

  useEffect(() => {
    try {
      setLoading(true);
      const fetchData = async (pgId) => {
        const { data } = await axios.get(`/secure/api/getpg?pgId=${pgId}`);
        setPgObject(data);
        setPostPropertyPageNo(data?.post_property_page_no);
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

  formValues.partNo = "1";

  const onSubmit = async (values) => {
    try {
      values.postPropertyPageNo = Math.max(postPropertyPageNo, curPageNo);
      await axios.post(`/secure/api/newProperty/pg/update/${pgId}`, values);
      navigate(`/property/manage/pg/${pgId}/locality`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`container`}>
      <div className={`d-flex flex-column flex-sm-row justify-content-center`}>
        <div className={`w-20 ${styles.container}`}>
          <Sidebar
            pathname={location.pathname}
            pgId={pgId}
            postPropertyPageNo={postPropertyPageNo}
          />
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
                <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center w-100 gap-4"></div>
                <div className="d-flex w-100 gap-2">
                  <div className="w-100">
                    <div className="w-100 mb-3">
                      <label htmlFor="pg_name">PG Name</label>
                      <Field
                        type="text"
                        id="pg_name"
                        name="pg_name"
                        className="form-control"
                      />
                      <ErrorMessage name="pg_name" component={PostFormError} />
                    </div>
                    <div className="mb-3 w-100">
                      <div className="mb-3">PG Type</div>
                      <div className="w-100 mb-3 d-flex">
                        <div className="col-sm">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender_type" // Updated the name attribute here
                              id="gender_type1"
                              value="male"
                              checked={values.gender === "male"}
                              onClick={() => {
                                setFieldValue("gender", "male");
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gender_type1"
                            >
                              Boys
                            </label>
                          </div>
                        </div>
                        <div className="col-sm">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender_type" // Updated the name attribute here
                              id="gender_type2"
                              value="female"
                              checked={values.gender === "female"}
                              onClick={() => {
                                setFieldValue("gender", "female");
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gender_type2"
                            >
                              Girls
                            </label>
                          </div>
                        </div>
                        <div className="col-sm">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender_type" // Updated the name attribute here
                              id="gender_type3"
                              value="any"
                              onClick={() => {
                                setFieldValue("gender", "any");
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gender_type3"
                            >
                              Anyone
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 w-100">
                      <div className="mb-3 w-100">
                        <input
                          className=""
                          type="checkbox"
                          id="food_available"
                          name="food_available"
                          checked={values.food_available}
                          onClick={(e) => {
                            setFieldValue("food_available", e.target.checked);
                            if (e.target.checked === false) {
                              setFieldValue("breakfast", false);
                              setFieldValue("lunch", false);
                              setFieldValue("dinner", false);
                            }
                          }}
                        />
                        <label
                          className="m-1"
                          htmlFor="food_available"
                          role="button"
                        >
                          Food Included
                        </label>
                      </div>
                      {values.food_available === true ? (
                        <div className="d-flex text-center gap-4">
                          <div className="mb-3 w-100">
                            <input
                              className={`${styles.input_checkbox1} w-100`}
                              type="checkbox"
                              id="breakfast"
                              name="breakfast"
                              checked={values.breakfast}
                              onClick={(e) => {
                                setFieldValue("breakfast", e.target.checked);
                              }}
                            />
                            <label
                              className={`${styles.input_label1} m-1`}
                              htmlFor="breakfast"
                              role="button"
                            >
                              Breakfast
                            </label>
                          </div>
                          <div className="mb-3 w-100">
                            <input
                              className={`${styles.input_checkbox1} w-100`}
                              type="checkbox"
                              id="lunch"
                              name="lunch"
                              checked={values.lunch}
                              onClick={(e) => {
                                setFieldValue("lunch", e.target.checked);
                              }}
                            />
                            <label
                              className={`${styles.input_label1} m-1`}
                              htmlFor="lunch"
                              role="button"
                            >
                              Lunch
                            </label>
                          </div>
                          <div className="mb-3 w-100">
                            <input
                              className={`${styles.input_checkbox1} w-100`}
                              type="checkbox"
                              id="dinner"
                              name="dinner"
                              checked={values.dinner}
                              onClick={(e) => {
                                console.log(e.target.checked);
                                setFieldValue("dinner", e.target.checked);
                              }}
                            />
                            <label
                              className={`${styles.input_label1} m-1`}
                              htmlFor="dinner"
                              role="button"
                            >
                              Dinner
                            </label>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="mb-3 w-100">
                      <div className="mb-3 w-100">PG Rules</div>
                      <div className="d-flex text-center gap-4">
                        <div className="mb-3 w-100">
                          <input
                            className={`${styles.input_checkbox1} w-100`}
                            type="checkbox"
                            id="smoking"
                            name="smoking"
                            checked={values.smoking}
                            onClick={(e) => {
                              setFieldValue("smoking", e.target.checked);
                            }}
                          />
                          <label
                            className={`${styles.input_label1} m-1`}
                            htmlFor="smoking"
                            role="button"
                          >
                            No Smoking
                          </label>
                        </div>
                        <div className="mb-3 w-100">
                          <input
                            className={`${styles.input_checkbox1} w-100`}
                            type="checkbox"
                            id="drinking"
                            name="drinking"
                            checked={values.drinking}
                            onClick={(e) => {
                              setFieldValue("drinking", e.target.checked);
                            }}
                          />
                          <label
                            className={`${styles.input_label1} m-1`}
                            htmlFor="drinking"
                            role="button"
                          >
                            No Drinking
                          </label>
                        </div>
                        <div className="mb-3 w-100">
                          <input
                            className={`${styles.input_checkbox1} w-100`}
                            type="checkbox"
                            id="nonveg"
                            name="nonveg"
                            checked={values.nonveg}
                            onClick={(e) => {
                              setFieldValue("nonveg", e.target.checked);
                            }}
                          />
                          <label
                            className={`${styles.input_label1} m-1`}
                            htmlFor="nonveg"
                            role="button"
                          >
                            No Non-veg
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 w-100">
                      <label
                        className="m-1 w-100 mx-8"
                        htmlFor="preferred_tenant"
                      >
                        Preferred For
                      </label>
                      <div className="d-flex text-center gap-4">
                        <div className="mb-3 w-100">
                          <Field
                            as="select"
                            name="preferred_tenant"
                            className="form-select"
                            value={values.preferred_tenant}
                            onChange={(e) => {
                              setFieldValue("preferred_tenant", e.target.value);
                            }}
                          >
                            <option value="student">Student</option>
                            <option value="working">Working</option>
                            <option value="any">Anyone</option>
                          </Field>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default RoomDetails;
