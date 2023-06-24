import React, { useContext, useEffect, useState } from "react";
import HouseFilters from "./Filters/HouseFilters";
import { useLocation } from "react-router-dom";
import HouseList from "./HouseList";
import styles from "./styles.module.css";
import { setUserDetails } from "../../store/actions";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LoadContext } from "../../context/load-context";
import InputLocationSearch from "../HomePage/InputLocationSearch";
import { Dialog, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FiFilter } from "react-icons/fi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ListProperties = ({ userDetails = {} }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const city = searchParams.get("city");
  const propertyType = searchParams.get("propertyType");
  const locality = searchParams.get("locality");

  const [bhkType, setBhkType] = useState([]);
  const [preferredTenants, setPreferredTenants] = useState(["Both"]);
  const [price, setPrice] = useState([0, 100000]);
  const [furnishing, setFurnishing] = useState([]);
  const [twoWheelerParking, setTwoWheelerParking] = useState(false);
  const [fourWheelerParking, setFourWheelerParking] = useState(false);
  const [withImage, setWithImage] = useState(false);
  const dispatch = useDispatch();
  const { setLoading } = useContext(LoadContext);

  const [selectedCity, setSelectedCity] = useState("Bangalore");
  const [searchValue, setSearchValue] = useState("");
  const [selectedLocality, setSelectedLocality] = useState([]);
  const [suggestionList, setSuggestionList] = useState([]);
  useEffect(() => {
    try {
      setLoading(true);
      const setData = async () => {
        const { data } = await axios.get("/secure/api/user/me");
        dispatch(setUserDetails(data));
        setLoading(false);
      };

      if (userDetails) setData();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }, []);

  const [fullScreenFilters, setFullScreenFilters] = useState(false);

  const openFilters = () => {
    setFullScreenFilters(true);
  };
  const handleClose = () => {
    setFullScreenFilters(false);
  };

  return (
    <div>
      <div className={`${styles.search_again}`}>
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
        <Dialog
          fullScreen
          open={fullScreenFilters}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <CloseIcon onClick={handleClose} />
          <HouseFilters
            bhkType={bhkType}
            setBhkType={setBhkType}
            preferredTenants={preferredTenants}
            setPreferredTenants={setPreferredTenants}
            price={price}
            setPrice={setPrice}
            furnishing={furnishing}
            setFurnishing={setFurnishing}
            setTwoWheelerParking={setTwoWheelerParking}
            setFourWheelerParking={setFourWheelerParking}
            setWithImage={setWithImage}
          />
          <button className={styles.apply_filters} onClick={handleClose}>
            Apply Filters
          </button>
        </Dialog>
      </div>
      <div className={`d-flex px-3 py-2 ${styles.list_properties}`}>
        <div className={`p-1 col-12 col-md-5 col-lg-4 ${styles.hide_filters}`}>
          <HouseFilters
            bhkType={bhkType}
            setBhkType={setBhkType}
            preferredTenants={preferredTenants}
            setPreferredTenants={setPreferredTenants}
            price={price}
            setPrice={setPrice}
            furnishing={furnishing}
            setFurnishing={setFurnishing}
            setTwoWheelerParking={setTwoWheelerParking}
            setFourWheelerParking={setFourWheelerParking}
            setWithImage={setWithImage}
          />
        </div>
        <HouseList
          city={city}
          locality={locality}
          propertyType={propertyType}
          bhkType={bhkType}
          preferredTenants={preferredTenants}
          price={price}
          furnishing={furnishing}
          twoWheelerParking={twoWheelerParking}
          fourWheelerParking={fourWheelerParking}
          withImage={withImage}
          userDetails={userDetails}
        />
      </div>
    </div>
  );
};

export default ListProperties;
