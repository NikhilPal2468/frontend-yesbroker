import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PropertyCard from "./PropertyCard";
import styles from "../styles.module.css";
function YourProperties() {
  const { propertyType } = useParams();
  const [listings, setListings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/secure/api/user/mylistings?propertyType=${propertyType}`
        );
        setListings(data?.listings);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, [propertyType]);
  return (
    <div className="h-100">
      <div className="row h-100">
        <div className="col-12 col-lg-3">
          <SideBar />
        </div>
        <div className="col-12 col-lg-9">
          <div className="container">
            <p className="fw-bold border-bottom py-4">My Properties</p>
          </div>
          <div className="container">
            <Link to={"/user/mylistings/houses"}>
              <button
                type="button"
                className={`btn btn-outline-primary me-2 ${
                  propertyType === "houses" ? "active" : ""
                }`}
              >
                Houses
              </button>
            </Link>
            <Link to={"/user/mylistings/pgs"}>
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
            You have posted {listings && listings.length ? listings.length : 0}{" "}
            {listings && listings.length === 1 ? "property" : "properties"}
          </div>
          <div className={`container ${styles.cards}`}>
            {listings.map((listing) => (
              <PropertyCard key={listing.houses_id} listing={listing} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourProperties;
