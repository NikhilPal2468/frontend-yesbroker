import axios from "axios";
import React, { useEffect, useState } from "react";
import PropertyList from "./PropertyList";

import Heading from "../common/Heading";

const ManageProperties = () => {
  const [houses, setHouses] = useState([]);
  const [pgs, setPgs] = useState([]);
  const [propertyType, setPropertyType] = useState("houses");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/private/api/property`);
        console.log("data:", data);
        setHouses(data?.houses);
        setPgs(data?.pgs);
      } catch (e) {
        console.log(e?.response?.data?.message);
        // setErrMsg(e?.response?.data?.message);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container">
      <Heading />
      <h3>Property Management</h3>
      <button
        type="button"
        onClick={() => setPropertyType("houses")}
        className={`btn btn-outline-primary me-2 ${
          propertyType === "houses" ? "active" : ""
        }`}
      >
        Houses
      </button>
      <button
        type="button"
        onClick={() => setPropertyType("pgs")}
        className={`btn btn-outline-primary me-2 ${
          propertyType === "pgs" ? "active" : ""
        }`}
      >
        PG/Hostel
      </button>
      <input type="text" placeholder="search by owner name" />
      <input type="text" placeholder="search by owner email" />

      <PropertyList properties={propertyType === "pgs" ? pgs : houses} />
      {/* {propertyType === "pgs"
        ? pgs.map((house) => <div key={house.id}>{house.id}</div>)
        : houses.map((house) => <div key={house.id}>{house.id}</div>)} */}
    </div>
  );
};

export default ManageProperties;
