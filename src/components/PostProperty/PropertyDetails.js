import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import PostFormError from "./PostFormError";
import styles from "./styles.modules.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

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

const apartmentTypes = ["house", "pg"];
const bhkTypes = ["1 rk", "1 bhk", "2 bhk", "3 bhk", "4 bhk", "4+ bhk"];
const propertyAge = ["<1", "1-3", "3-5", "5-10", ">10"];
const facing = ["N", "S", "E", "W", "NE", "NW", "SE", "SW", "unknown"];

const validationSchema = Yup.object({
  property_type: Yup.string.required("Select Property Type"),
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
  // const navigate = useNavigate();

  // const [formValues, setFormValues] = useState(location.state);

  // const onSubmit = async (values) => {
  //   try {
  //     if (values.propertyType === "house") {
  //       let house = await axios.post(
  //         `/newProperty/house/update/${houseId}`,
  //         values
  //       );
  //       navigate(`/property/manage/house/${house.id}/property`, {
  //         state: { ...house },
  //       });
  //     } else if (values.propertyType === "house") {
  //       let pg = await axios.post("/secure/api/newProperty/pg/create", values);
  //       navigate(`/property/manage/house/${pg.id}/property`, {
  //         state: { ...pg },
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="">
      <h5>Property Details</h5>
      {/* <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
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
              Save & Continue
            </Button>
          </Form>
        )}
      </Formik> */}
    </div>
  );
}

export default PropertyDetails;
