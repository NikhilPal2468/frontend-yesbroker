import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import PostFormError from "../PostFormError";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./SideBar/sidebar";
import styles from "./styles.module.css";
import { LoadContext } from "../../../context/load-context";

const initialValues = {
  partNo: "1",
  property_type: "",
  apartment_name: "",
  bhk_type: "",
  floor: 0,
  total_floors: 0,
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
  { key: "Ground", value: 0 },
  { key: "1", value: 1 },
  { key: "2", value: 2 },
  { key: "3", value: 3 },
  { key: "4", value: 4 },
  { key: "5", value: 5 },
  { key: "6", value: 6 },
  { key: "7", value: 7 },
  { key: "8", value: 8 },
  { key: "9", value: 9 },
  { key: "10", value: 10 },
  { key: "11", value: 11 },
  { key: "12", value: 12 },
  { key: "13", value: 13 },
  { key: "14", value: 14 },
  { key: "15", value: 15 },
  { key: "16", value: 16 },
  { key: "17", value: 17 },
  { key: "18", value: 18 },
  { key: "19", value: 19 },
  { key: "20", value: 20 },
  { key: "21", value: 21 },
  { key: "22", value: 22 },
  { key: "23", value: 23 },
  { key: "24", value: 24 },
  { key: "25", value: 25 },
  { key: "26", value: 26 },
  { key: "27", value: 27 },
  { key: "28", value: 28 },
  { key: "29", value: 29 },
  { key: "30", value: 30 },
  { key: "31", value: 31 },
  { key: "32", value: 32 },
  { key: "33", value: 33 },
  { key: "34", value: 34 },
  { key: "35", value: 35 },
  { key: "36", value: 36 },
  { key: "37", value: 37 },
  { key: "38", value: 38 },
  { key: "39", value: 39 },
  { key: "40", value: 40 },
  { key: "41", value: 41 },
  { key: "42", value: 42 },
  { key: "43", value: 43 },
  { key: "44", value: 44 },
  { key: "45", value: 45 },
  { key: "46", value: 46 },
  { key: "47", value: 47 },
  { key: "48", value: 48 },
  { key: "49", value: 49 },
  { key: "50", value: 50 },
  { key: "51", value: 51 },
  { key: "52", value: 52 },
  { key: "53", value: 53 },
  { key: "54", value: 54 },
  { key: "55", value: 55 },
  { key: "56", value: 56 },
  { key: "57", value: 57 },
  { key: "58", value: 58 },
  { key: "59", value: 59 },
  { key: "60", value: 60 },
  { key: "61", value: 61 },
  { key: "62", value: 62 },
  { key: "63", value: 63 },
  { key: "64", value: 64 },
  { key: "65", value: 65 },
  { key: "66", value: 66 },
  { key: "67", value: 67 },
  { key: "68", value: 68 },
  { key: "69", value: 69 },
  { key: "70", value: 70 },
  { key: "71", value: 71 },
  { key: "72", value: 72 },
  { key: "73", value: 73 },
  { key: "74", value: 74 },
  { key: "75", value: 75 },
  { key: "76", value: 76 },
  { key: "77", value: 77 },
  { key: "78", value: 78 },
  { key: "79", value: 79 },
  { key: "80", value: 80 },
  { key: "81", value: 81 },
  { key: "82", value: 82 },
  { key: "83", value: 83 },
  { key: "84", value: 84 },
  { key: "85", value: 85 },
  { key: "86", value: 86 },
  { key: "87", value: 87 },
  { key: "88", value: 88 },
  { key: "89", value: 89 },
  { key: "90", value: 90 },
  { key: "91", value: 91 },
  { key: "92", value: 92 },
  { key: "93", value: 93 },
  { key: "94", value: 94 },
  { key: "95", value: 95 },
  { key: "96", value: 96 },
  { key: "97", value: 97 },
  { key: "98", value: 98 },
  { key: "99", value: 99 },
];

const validationSchema = Yup.object({
  property_type: Yup.string().required("Select Property Type"),
  apartment_name: Yup.string(),
  bhk_type: Yup.string().required("Select BHK Type"),
  floor: Yup.number().required("Floors required"),
  total_floors: Yup.number().required("Total floors required"),
  property_age: Yup.string().required("Property Age required"),
  facing: Yup.string().required("Building Facing is required"),
  builtup_area: Yup.number().required("Built Up Area is Required"),
});

let curPageNo = 1;

function PropertyDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setLoading } = useContext(LoadContext);

  const [houseObject, setHouseObject] = useState(null);
  const [postPropertyPageNo, setPostPropertyPageNo] = useState(0);

  const { id: houseId } = useParams();

  useEffect(() => {
    try {
      setLoading(true);
      const fetchData = async (houseId) => {
        const { data } = await axios.get(
          `/secure/api/gethouse?houseId=${houseId}`
        );

        // console.log(houseId, data);
        setPostPropertyPageNo(data?.post_property_page_no);
        setHouseObject(data);
      };
      fetchData(houseId);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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

  formValues.partNo = "1";

  const onSubmit = async (values) => {
    try {
      values.floor = parseInt(values.floor);
      values.total_floors = parseInt(values.total_floors);
      values.postPropertyPageNo = Math.max(postPropertyPageNo, curPageNo);

      if (values.floor > values.total_floors) {
        toast.error("Floor value must be smaller than Total Floors", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        await axios.post(
          `secure/api/newProperty/house/update/${houseId}`,
          values
        );
        navigate(`/property/manage/house/${houseId}/locality`);
      }
    } catch (e) {
      console.log(e);
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

  const handleSelectChange = (setFieldValue, propertyType) => {
    setFieldValue("property_type", propertyType);
  };

  return (
    <div className={`container`}>
      <div className={`d-flex flex-column flex-sm-row justify-content-center`}>
        <div className={`w-20 ${styles.container}`}>
          <Sidebar
            pathname={location.pathname}
            houseId={houseId}
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
                <div className="d-flex flex-column flex-sm-row align-items-center justify-content-around w-100 gap-4">
                  <div className="mb-3 w-100">
                    <label htmlFor="property_type">Property Type</label>
                    <Field
                      component="select"
                      id="property_type"
                      name="property_type"
                      className={`form-control ${styles.selectBox}`}
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
                      className={`form-control ${styles.selectBox}`}
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
                      <label htmlFor="floor">Floor</label>
                      <Field
                        component="select"
                        id="floor"
                        name="floor"
                        className={`form-control h-25 ${styles.selectBox}`}
                      >
                        <option value="">Select</option>
                        {FLOORS.map((type) => (
                          <option key={type.key} value={type.value}>
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
                        className={`form-control ${styles.selectBox}`}
                      >
                        <option value="">Select</option>
                        {FLOORS.map((type) => (
                          <option key={type.key} value={type.value}>
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
                    className={`form-control ${styles.selectBox}`}
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
                    className={`form-control ${styles.selectBox}`}
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
      <ToastContainer />
    </div>
  );
}

export default PropertyDetails;
