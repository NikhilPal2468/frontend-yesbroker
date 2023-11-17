import React, { useContext, useEffect, useState } from "react";
import SideBar from "../SideBar";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import HouseCard from "../../ListProperties/HouseCard";
import styles from "../styles.module.css";
import { LoadContext } from "../../../context/load-context";

function YourShortlists({ userDetails = {} }) {
  const { propertyType } = useParams();
  const shortlistArray = [
    ...(userDetails ? userDetails.house_shortlists : []),
    ...(userDetails ? userDetails.pg_shortlists : []),
  ];

  const [shortlistedProperty, setShortlistedProperty] = useState([]);
  const { setLoading } = useContext(LoadContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `/secure/api/user/myshortlists?propertyType=${propertyType}`
        );

        setLoading(false);
        setShortlistedProperty(data?.data);
      } catch (err) {
        setLoading(false);
        console.log(err.message);
      }
    };

    fetchData();
  }, [propertyType]);

  return (
    <div className={`${styles.container}`}>
      <SideBar />
      <div className={`${styles.sidebar_right}`}>
        <div className="container">
          <p className="fw-bold border-bottom py-4">My Shortlists</p>
        </div>
        <div className="container">
          <Link to={"/user/myshortlists/house"}>
            <button
              type="button"
              className={`btn btn-outline-primary me-2 ${
                propertyType === "house" ? "active" : ""
              }`}
            >
              Houses
            </button>
          </Link>
          <Link to={"/user/myshortlists/pg"}>
            <button
              type="button"
              className={`btn btn-outline-primary me-2 ${
                propertyType === "pg" ? "active" : ""
              }`}
            >
              PG/Hostel
            </button>
          </Link>
        </div>
        <div className="row gap-4 py-2 my-2">
          <p>
            {shortlistedProperty?.length === 0
              ? "You have not shortlisted any property"
              : `You have shortlisted ${shortlistedProperty?.length || "0"}
            ${shortlistedProperty?.length === 1 ? "property" : "properties"}`}
          </p>
        </div>
        <div className={`container flex-column flex-md-row ${styles.cards}`}>
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
                  setShortlistedProperty={setShortlistedProperty}
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
