import React, { useState, useEffect, useContext } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import PostFormError from "../PostFormError";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./SideBar/sidebar";
import styles from "./styles.module.css";
import { LoadContext } from "../../../context/load-context";

import { BiBed } from "react-icons/bi";

const initialValues = {
  single_room: false,
  single_room_rent: 0,
  single_room_deposit: 0,

  double_room: false,
  double_room_rent: 0,
  double_room_deposit: 0,

  triple_room: false,
  triple_room_rent: 0,
  triple_room_deposit: 0,

  four_room: false,
  four_room_rent: 0,
  four_room_deposit: 0,
};

const validationSchema = Yup.object({
  single_room: Yup.boolean(),
  single_room_rent: Yup.number().min(0),
  single_room_deposit: Yup.number().min(0),

  double_room_rent: Yup.number().min(0),
  double_room: Yup.boolean(),
  double_room_deposit: Yup.number().min(0),

  triple_room: Yup.boolean(),
  triple_room_rent: Yup.number().min(0),
  triple_room_deposit: Yup.number().min(0),

  four_room: Yup.boolean(),
  four_room_rent: Yup.number().min(0),
  four_room_deposit: Yup.number().min(0),
});

function RoomDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const { setLoading } = useContext(LoadContext);

  // const [pgObject, setPgObject] = useState(null);
  const { id: pgId } = useParams();
  const [postPropertyPageNo, setPostPropertyPageNo] = useState(0);
  const [pgObject, setPgObject] = useState(null);

  let curPageNo = 3;

  useEffect(() => {
    try {
      setLoading(true);
      const fetchData = async (pgId) => {
        const { data } = await axios.get(`/secure/api/getPg?pgId=${pgId}`);
        setPgObject(data);
        setPostPropertyPageNo(data?.post_property_page_no);
      };
      fetchData(pgId);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
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

  formValues.partNo = "3";

  const onSubmit = async (values) => {
    try {
      values.postPropertyPageNo = Math.max(postPropertyPageNo, curPageNo);
      await axios.post(`secure/api/newProperty/pg/update/${pgId}`, values);
      navigate(`/property/manage/pg/${pgId}/amenities`);
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
            {({ values }) => (
              <Form className="w-100 p-2 px-4">
                {/* Property Type */}
                <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center w-100 gap-4">
                  <div className="mb-3 w-100 d-flex flex-column align-items-center justify-content-center text-center">
                    <BiBed size={30} />
                    <Field
                      type="checkbox"
                      name="single_room"
                      id="single_room"
                      className={`${styles.input_checkbox} w-25 mt-4`}
                    />
                    <label
                      className={`${styles.input_label}  p-2 p-2 py-4 w-100`}
                      htmlFor="single_room"
                    >
                      Single Room
                    </label>
                  </div>
                  <div className="mb-3 w-100 d-flex flex-column align-items-center justify-content-center text-center">
                    <div className="d-flex">
                      <BiBed size={30} />
                      <BiBed size={30} />
                    </div>
                    <Field
                      type="checkbox"
                      name="double_room"
                      id="double_room"
                      className={`${styles.input_checkbox} w-25 mt-4`}
                    />
                    <label
                      className={`${styles.input_label}  p-2 p-2 py-4 w-100`}
                      htmlFor="double_room"
                    >
                      Double Share
                    </label>
                  </div>
                  <div className="mb-3 w-100 d-flex flex-column align-items-center justify-content-center text-center">
                    <div className="d-flex">
                      <BiBed size={30} />
                      <BiBed size={30} />
                      <BiBed size={30} />
                    </div>
                    <Field
                      type="checkbox"
                      name="triple_room"
                      id="triple_room"
                      className={`${styles.input_checkbox} w-25 mt-4`}
                    />
                    <label
                      className={`${styles.input_label}  p-2 p-2 py-4 w-100`}
                      htmlFor="triple_room"
                    >
                      Triple Share
                    </label>
                  </div>
                  <div className="mb-3 w-100 d-flex flex-column align-items-center justify-content-center text-center">
                    <div className="d-flex flex-column">
                      <div>
                        <BiBed size={30} />
                        <BiBed size={30} />
                      </div>
                      <div>
                        <BiBed size={30} />
                        <BiBed size={30} />
                      </div>
                    </div>
                    <Field
                      type="checkbox"
                      name="four_room"
                      id="four_room"
                      className={`${styles.input_checkbox} w-25 mt-4`}
                    />
                    <label
                      className={`${styles.input_label}  p-2 p-2 py-4 w-100`}
                      htmlFor="four_room"
                    >
                      Four Share
                    </label>
                  </div>
                </div>
                <div className="d-flex w-100 gap-2">
                  <div className="w-100">
                    {values.single_room && (
                      <div>
                        <div className="w-100 mb-3">
                          <div className="mb-2">
                            <label htmlFor="rent">Rent</label>
                            <Field
                              type="number"
                              id="single_room_rent"
                              name="single_room_rent"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="single_room_rent"
                              component={PostFormError}
                            />
                          </div>
                        </div>

                        {/* Expected Deposit */}
                        <div className="mb-3 w-100">
                          <label htmlFor="deposit">Deposit</label>
                          <Field
                            type="number"
                            id="single_room_deposit"
                            name="single_room_deposit"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="single_room_deposit"
                            component={PostFormError}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-100">
                    {values.double_room && (
                      <div>
                        <div className="w-100 mb-3">
                          <div className="mb-2">
                            <label htmlFor="rent">Rent</label>
                            <Field
                              type="number"
                              id="single_room_rent"
                              name="single_room_rent"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="single_room_rent"
                              component={PostFormError}
                            />
                          </div>
                        </div>

                        {/* Expected Deposit */}
                        <div className="mb-3 w-100">
                          <label htmlFor="deposit">Deposit</label>
                          <Field
                            type="number"
                            id="single_room_deposit"
                            name="single_room_deposit"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="single_room_deposit"
                            component={PostFormError}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-100">
                    {values.triple_room && (
                      <div>
                        <div className="w-100 mb-3">
                          <div className="mb-2">
                            <label htmlFor="rent">Rent</label>
                            <Field
                              type="number"
                              id="single_room_rent"
                              name="single_room_rent"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="single_room_rent"
                              component={PostFormError}
                            />
                          </div>
                        </div>

                        {/* Expected Deposit */}
                        <div className="mb-3 w-100">
                          <label htmlFor="deposit">Deposit</label>
                          <Field
                            type="number"
                            id="single_room_deposit"
                            name="single_room_deposit"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="single_room_deposit"
                            component={PostFormError}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-100">
                    {values.four_room && (
                      <div>
                        <div className="w-100 mb-3">
                          <div className="mb-2">
                            <label htmlFor="rent">Rent</label>
                            <Field
                              type="number"
                              id="single_room_rent"
                              name="single_room_rent"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="single_room_rent"
                              component={PostFormError}
                            />
                          </div>
                        </div>

                        {/* Expected Deposit */}
                        <div className="mb-3 w-100">
                          <label htmlFor="deposit">Deposit</label>
                          <Field
                            type="number"
                            id="single_room_deposit"
                            name="single_room_deposit"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="single_room_deposit"
                            component={PostFormError}
                          />
                        </div>
                      </div>
                    )}
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
