import React, { useContext, useEffect, useState } from "react";
import HouseFilters from "./Filters/HouseFilters";
import PGFilters from "./Filters/PGFilters";
import { useLocation } from "react-router-dom";
import HouseList from "./HouseList";
import styles from "./styles.module.css";
import { setUserDetails } from "../../store/actions";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LoadContext } from "../../context/load-context";
import InputLocationSearch from "../HomePage/InputLocationSearch";
// import { Dialog, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FiFilter } from "react-icons/fi";

import PgList from "./PgList";
// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });
const ListProperties = ({ userDetails = {} }) => {
  const location = useLocation();

  // Attributes recieved from navigation url
  const searchParams = new URLSearchParams(location.search);
  const city = searchParams.get("city");
  const propertyType = searchParams.get("propertyType");
  const locality = searchParams.get("locality");
  const selectedLocalityArray = searchParams.get("selectedLocality");
  const selectedLocalityArrayData =
    JSON.parse(decodeURIComponent(selectedLocalityArray)) || [];

  // For House Filters
  const [bhkType, setBhkType] = useState([]);
  const [preferredTenants, setPreferredTenants] = useState(["Both"]);
  const [parking, setParking] = useState(["Both"]);
  const [furnishing, setFurnishing] = useState([]);

  const dispatch = useDispatch();
  const { setLoading } = useContext(LoadContext);

  const [withImage, setWithImage] = useState(false);
  const [price, setPrice] = useState([0, 100000]);
  const [selectedCity, setSelectedCity] = useState(city);
  const [searchValue, setSearchValue] = useState("");
  const [selectedLocality, setSelectedLocality] = useState([
    ...selectedLocalityArrayData,
  ]);
  const [suggestionList, setSuggestionList] = useState([]);

  useEffect(() => {
    try {
      setLoading(true);
      const setData = async () => {
        const { data } = await axios.get("/secure/api/user/me");
        setLoading(false);
        dispatch(setUserDetails({ user: data }));
      };
      if (userDetails) setData();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }, []);

  const [fullScreenFilters, setFullScreenFilters] = useState(false);

  const openFilters = () => {
    setFullScreenFilters(!fullScreenFilters);
  };
  const handleClose = () => {
    setFullScreenFilters(false);
  };

  return (
    <div className={`${fullScreenFilters ? styles.list_properties_page : ""}`}>
      <div className={`ms-3 col-12 col-md-5 col-lg-4 ${styles.search_again}`}>
        <InputLocationSearch
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedLocality={selectedLocality}
          setSelectedLocality={setSelectedLocality}
          suggestionList={suggestionList}
          setSuggestionList={setSuggestionList}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          propertyType={propertyType}
        />
      </div>
      <div className={styles.filter_modal}>
        <button className={styles.filter_button} onClick={openFilters}>
          <FiFilter /> Filter
        </button>
        {fullScreenFilters && (
          <div className={`${styles.mobile_view_filter}`}>
            <CloseIcon
              className={styles.cursor_pointer}
              onClick={handleClose}
            />
            {propertyType === "house" ? (
              <HouseFilters
                bhkType={bhkType}
                setBhkType={setBhkType}
                preferredTenants={preferredTenants}
                setPreferredTenants={setPreferredTenants}
                price={price}
                setPrice={setPrice}
                furnishing={furnishing}
                parking={parking}
                setFurnishing={setFurnishing}
                setParking={setParking}
                setWithImage={setWithImage}
              />
            ) : (
              <PGFilters />
            )}
            <button className={styles.apply_filters} onClick={handleClose}>
              Apply Filters
            </button>
          </div>
        )}
      </div>
      <div className={`d-flex px-3 py-2 ${styles.list_properties}`}>
        <div className={`p-1 col-12 col-md-5 col-lg-4 ${styles.hide_filters}`}>
          {propertyType === "house" ? (
            <HouseFilters
              bhkType={bhkType}
              setBhkType={setBhkType}
              preferredTenants={preferredTenants}
              setPreferredTenants={setPreferredTenants}
              price={price}
              setPrice={setPrice}
              furnishing={furnishing}
              parking={parking}
              setFurnishing={setFurnishing}
              setParking={setParking}
              setWithImage={setWithImage}
            />
          ) : (
            <PGFilters />
          )}
        </div>
        {propertyType === "house" ? (
          <HouseList
            city={city}
            locality={locality}
            propertyType={propertyType}
            bhkType={bhkType}
            preferredTenants={preferredTenants}
            price={price}
            furnishing={furnishing}
            parking={parking}
            withImage={withImage}
            userDetails={userDetails}
          />
        ) : (
          <PgList
            city={city}
            locality={locality}
            preferredTenants={preferredTenants}
            price={price}
            parking={parking}
            withImage={withImage}
            userDetails={userDetails}
          />
        )}
      </div>
    </div>
  );
};

export default ListProperties;
