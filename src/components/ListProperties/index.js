import React, { useState } from "react";
import HouseFilters from "./Filters/HouseFilters";
import { useLocation } from "react-router-dom";
import HouseList from "./HouseList";
import styles from "./styles.module.css";

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

  return (
    <div className={`d-flex px-3 py-2 ${styles.list_properties}`}>
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
  );
};

export default ListProperties;
