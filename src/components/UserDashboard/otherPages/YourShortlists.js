import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import axios from "axios";
import { useLocation } from "react-router-dom";

function YourShortlists() {
  const location = useLocation();
  const propertyType = location.pathname.split("/")[3];

  const [shortlistedProperty, setShortlistedProperty] = useState(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await axios.get(
          `/secure/api/user/myshortlists?propertyType=${propertyType}`
        );
        setShortlistedProperty(data);
      };

      fetchData();
    } catch (err) {
      console.log(err.message);
    }
  }, [propertyType]);

  return (
    <div>
      <div className="row">
        <div className="col-12 col-lg-3">
          <SideBar />
        </div>
        <div className="col-12 col-lg-9">
          <div className="container">
            <p className="fw-bold border-bottom py-4">My Shortlists</p>
          </div>
          <div>
            {shortlistedProperty.map((property) => {
              return <p>{property}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourShortlists;
