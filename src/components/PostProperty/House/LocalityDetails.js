import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
// import * as Yup from "yup";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
// import PostFormError from "../PostFormError";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const initialValues = {
  city: "",
  street: "",
  locality: "",
};

const CITIES = ["Mumbai", "Bangalore", "Gurgaon", "Delhi", "Hyderabad"];

function LocalityDetails() {
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

  const [city, setCity] = useState(formValues.city);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locality, setLocality] = useState(formValues.locality);
  const [street, setStreet] = useState(formValues.street);
  const [suggestionList, setSuggestionList] = useState([]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setSuggestionList([]);
    setLocality("");
    setStreet("");
  };

  const handleLocalityChange = (e) => {
    setLocality(e.target.value);
    setShowSuggestions(true);
    setStreet("");
  };

  const handleCitySelect = (place) => {
    setLocality(place);
    setShowSuggestions(false);
    setSuggestionList([]);
  };

  useEffect(() => {
    const autoCompleteApi = async () => {
      if (locality && showSuggestions)
        await axios
          .get(`/public/api/autocomplete?city=${city}&text=${locality}`)
          .then((response) => {
            console.log(response.data);
            setSuggestionList(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
    };
    autoCompleteApi();
  }, [locality, city, showSuggestions]);

  const handleStreetChange = (e) => {
    setStreet(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!city || !locality || !street) return;

    const payLoad = {
      city: city,
      locality: locality,
      street: street,
    };

    try {
      const { data } = await axios.post(
        `secure/api/newProperty/house/update/${location.state.id}`,
        payLoad
      );

      const { house } = data;
      navigate(`/property/manage/house/${house.id}/rental`, {
        state: { ...house },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="city">Select City</label>
          <select
            name="city"
            id="city"
            value={city}
            onChange={handleCityChange}
            required
          >
            <option value="">Select</option>
            {CITIES &&
              CITIES.map((city) => {
                return (
                  <option value={city} key={city}>
                    {city}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="locality">Locality</label>
          <input
            type="text"
            name="locality"
            id="locality"
            value={locality}
            onChange={handleLocalityChange}
            required
          />
          {suggestionList &&
            suggestionList.map((place) => {
              return (
                <div
                  key={place?.placeId}
                  className={styles.suggestion_item}
                  role="button"
                  onClick={() => {
                    handleCitySelect(place?.description);
                  }}
                >
                  {place?.description}
                </div>
              );
            })}
        </div>
        <div className="mb-3">
          <label htmlFor="city">Landmark/Street</label>
          <input
            type="text"
            name="street"
            id="street"
            value={street}
            onChange={handleStreetChange}
            required
          />
        </div>
        <Button
          variant="primary"
          type="submit"
          className={`w-100 justify-content-end primary-color`}
        >
          Save & Continue
        </Button>
      </form>
    </div>
  );
}

export default LocalityDetails;
