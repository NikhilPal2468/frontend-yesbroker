import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./SideBar/sidebar";

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
    <div className="container h-100">
      <div className={`d-flex flex-row justify-content-center`}>
        <div className={`w-20 ${styles.container}`}>
          <Sidebar pathname={location.pathname} />
        </div>
        <div
          className={`w-75 ms-2 px-4 d-flex flex-column ${styles.container}`}
        >
          <h5 className="ps-4 py-4 border-bottom">Property Details</h5>
          <form
            onSubmit={handleFormSubmit}
            className="h-100 d-flex flex-column"
          >
            <div className="d-flex flex-row w-100 justify-content-center align-items-center gap-4">
              <div className={`mb-3 w-100 ${styles.sticky_city}`}>
                <label htmlFor="city">Select City</label>
                <select
                  name="city"
                  id="city"
                  value={city}
                  onChange={handleCityChange}
                  className="form-control"
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
              <div className="mb-3 w-100">
                <label htmlFor="locality">Locality</label>
                <input
                  type="text"
                  name="locality"
                  id="locality"
                  className="form-control"
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
            </div>
            <div className="d-flex flex-row w-100 justify-content-center align-items-center gap-4">
              <div className="mb-3 w-100">
                <label htmlFor="city">Landmark/Street</label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  value={street}
                  className="form-control"
                  onChange={handleStreetChange}
                  required
                />
              </div>
              <div className="w-100"></div>
            </div>

            <div className="">
              <Button
                variant="primary"
                type="submit"
                className={`w-100 justify-content-end primary-color align-self-end`}
              >
                Save & Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LocalityDetails;
