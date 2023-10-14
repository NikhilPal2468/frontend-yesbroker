import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./SideBar/sidebar";
import { LoadContext } from "../../../context/load-context";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LocateMeButton from "../../common/LocateMeButton";
const CITIES = ["Mumbai", "Bangalore", "Gurgaon", "Delhi", "Hyderabad"];

function LocalityDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadContext);

  const { id: houseId } = useParams();

  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locality, setLocality] = useState("");
  const [street, setStreet] = useState("");
  const [suggestionList, setSuggestionList] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    try {
      const fetchData = async (houseId) => {
        setLoading(true);
        const { data } = await axios.get(
          `/secure/api/gethouse?houseId=${houseId}`
        );

        setCity(data?.city);
        setLocality(data?.locality);
        setStreet(data?.street);
        setHouseNo(data?.houseno);
        setPincode(data?.pincode);
        setAddress(data?.address);
        setDescription(data?.description);
      };

      fetchData(houseId);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [houseId]);

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
      if (showSuggestions)
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
      partNo: "2",
      pincode: pincode,
      houseNo: houseNo,
      address: address,
      description: description,
    };

    try {
      await axios.post(
        `secure/api/newProperty/house/update/${houseId}`,
        payLoad
      );
      navigate(`/property/manage/house/${houseId}/rental`);
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

  return (
    <div className="container h-100">
      <div className={`d-flex flex-column flex-sm-row justify-content-center`}>
        <div className={`w-20 ${styles.container}`}>
          <Sidebar pathname={location.pathname} />
        </div>
        <div
          className={`w-75 ms-2 px-4 d-flex flex-column ${styles.container}`}
        >
          <h5 className="ps-4 py-4 border-bottom">Locality Details</h5>
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
                  className={`form-control ${styles.selectBox}`}
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
              <div className="position-relative mb-3 w-100">
                <div>
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
                  <div
                    className={`${styles.autocomplete_dropdown_container} ${
                      suggestionList.length === 0
                        ? styles.remove_dropdown_container
                        : ""
                    }`}
                  >
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
                <div>
                  <LocateMeButton />
                </div>
              </div>
            </div>
            <div className="d-flex flex-row w-100 justify-content-center align-items-center gap-4">
              <div className="mb-3 w-100">
                <label htmlFor="houseno">House No</label>
                <input
                  type="text"
                  name="houseno"
                  id="houseno"
                  value={houseNo}
                  className="form-control"
                  onChange={(e) => {
                    setHouseNo(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="mb-3 w-100">
                <label htmlFor="address">Complete Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={address}
                  className="form-control"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="d-flex flex-row w-100 justify-content-center align-items-center gap-4">
              <div className="mb-3 w-100">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  id="pincode"
                  value={pincode}
                  className="form-control"
                  onChange={(e) => setPincode(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 w-100">
                <label htmlFor="street">Landmark/Street</label>
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
            </div>

            <div className="d-flex flex-row w-100 justify-content-center align-items-center gap-4">
              <div className="mb-3 w-100">
                <label htmlFor="description">Description (optional)</label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  className="form-control"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
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
      <ToastContainer />
    </div>
  );
}

export default LocalityDetails;
