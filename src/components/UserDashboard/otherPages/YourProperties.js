import React, { useContext, useEffect, useState } from "react";
import SideBar from "../SideBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PropertyCard from "./PropertyCard";
import styles from "../styles.module.css";
import { LoadContext } from "../../../context/load-context";

function YourProperties() {
  const { propertyType } = useParams();
  const [listings, setListings] = useState([]);
  const { setLoading } = useContext(LoadContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `/secure/api/user/mylistings?propertyType=${propertyType}`
        );

        setLoading(false);
        setListings(data?.listings);
      } catch (err) {
        setLoading(false);
        console.log(err?.message);
      }
    };
    fetchData();
  }, [propertyType]);

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={`${styles.sidebar_right}`}>
        <div className="container">
          <p className="fw-bold border-bottom py-4">My Properties</p>
        </div>
        <div className="container">
          <Link to={"/user/mylistings/house"}>
            <button
              type="button"
              className={`btn btn-outline-primary me-2 ${
                propertyType === "house" ? "active" : ""
              }`}
            >
              Houses
            </button>
          </Link>
          <Link to={"/user/mylistings/pg"}>
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
            {listings?.length === 0
              ? "You have not listed any property"
              : `You have posted ${listings?.length}
            ${listings?.length === 1 ? "property" : "properties"}`}
          </p>
        </div>

        <div className={`container flex-column flex-md-row ${styles.cards}`}>
          {listings.map((listing) => {
            return (
              <PropertyCard
                key={listing?.id}
                listing={listing}
                propertyId={listing?.id}
                propertyType={propertyType}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default YourProperties;
