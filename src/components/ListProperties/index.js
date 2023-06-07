import React, { useState } from "react";

import HouseFilters from "./Filters/HouseFilters";
import { useLocation } from "react-router-dom";
import HouseList from "./HouseList";

const ListProperties = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const city = searchParams.get("city");
  const propertyType = searchParams.get("propertyType");
  const locality = searchParams.get("locality");

  const [bhkType, setBhkType] = useState([]);
  return (
    <div className="d-flex px-3 py-2">
      <HouseFilters bhkType={bhkType} setBhkType={setBhkType} />
      <HouseList city={city} propertyType={propertyType} locality={locality} />
    </div>
  );
};

export default ListProperties;
