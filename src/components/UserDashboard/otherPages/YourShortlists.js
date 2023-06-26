import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import HouseCard from "../../ListProperties/HouseCard";
import styles from "../styles.module.css";

function YourShortlists({ userDetails = {} }) {
  const { propertyType } = useParams();
  const shortlistArray = [
    ...(userDetails ? userDetails.house_shortlists : []),
    ...(userDetails ? userDetails.pg_shortlists : []),
  ];
  const [shortlistedProperty, setShortlistedProperty] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/secure/api/user/myshortlists?propertyType=${propertyType}`
        );
        setShortlistedProperty(data?.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, [propertyType]);

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={`${styles.sidebar_right}`}>
        <div className="container">
          <p className="fw-bold border-bottom py-4">My Shortlists</p>
        </div>
        <div className="container">
          <Link to={"/user/myshortlists/houses"}>
            <button
              type="button"
              className={`btn btn-outline-primary me-2 ${
                propertyType === "houses" ? "active" : ""
              }`}
            >
              Houses
            </button>
          </Link>
          <Link to={"/user/myshortlists/pgs"}>
            <button
              type="button"
              className={`btn btn-outline-primary me-2 ${
                propertyType === "pgs" ? "active" : ""
              }`}
            >
              PG/Hostel
            </button>
          </Link>
        </div>
        <div>
          {shortlistedProperty?.length === 0
            ? "You have not shortlisted any property"
            : `You have shortlisted ${shortlistedProperty?.length || "0"}
            ${shortlistedProperty?.length === 1 ? "property" : "properties"}`}
        </div>
        <div>
          {(shortlistedProperty || []).map(
            ({
              id = "",
              apartment_name = "",
              locality = "",
              rent = 0,
              rent_negotiable = false,
              deposit = 0,
              builtup_area = "",
              furnishing_type = "",
              bhk_type = "",
              preferred_tenants = "",
              available_from = "",
              images = [],
            }) => {
              return (
                <HouseCard
                  key={id}
                  houses_id={id}
                  apartment_name={apartment_name}
                  locality={locality}
                  rent={rent}
                  rent_negotiable={rent_negotiable}
                  deposit={deposit}
                  builtup_area={builtup_area}
                  furnishing_type={furnishing_type}
                  bhk_type={bhk_type}
                  preferred_tenants={preferred_tenants}
                  available_from={available_from}
                  propertyType={propertyType}
                  images={images}
                  shortlistArray={shortlistArray}
                  // setShowOwnersContacted={setShowOwnersContacted}
                />
                // <div key={id} className="card ">
                //   <div className="card-body">
                //     <h6 className="card-title">
                //       {bhk_type} in {locality}
                //     </h6>
                //     <p className="card-text">Rent: {rent}</p>
                //   </div>
                // </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default YourShortlists;
