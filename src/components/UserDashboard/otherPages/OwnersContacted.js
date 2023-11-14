import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import styles from "../styles.module.css";
import PropertyCard from "./PropertyCard";
import axios from "axios";
function OwnersContacted({ userDetails = {} }) {
  // const { propertyType } = useParams();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/secure/api/user/getAllPropertiesContacted`
        );
        setListings(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={`${styles.sidebar_right}`}>
        <div className="container">
          <p className="fw-bold border-bottom py-4">Owners Contacted</p>
        </div>
        {/* <div className="container">
          <Link to={"/user/mylistings/houses"}>
            <button
              type="button"
              className={`btn btn-outline-primary me-2 ${
                propertyType === "house" ? "active" : ""
              }`}
            >
              Houses
            </button>
          </Link>
          <Link to={"/user/mylistings/pgs"}>
            <button
              type="button"
              className={`btn btn-outline-primary me-2 ${
                propertyType === "pg" ? "active" : ""
              }`}
            >
              PG/Hostel
            </button>
          </Link>
        </div> */}

        <div className="row gap-4 py-2 my-2">
          <p>
            {listings?.length === 0
              ? "You have not contacted any property"
              : `You have contacted ${listings?.length}
            ${listings?.length === 1 ? "property" : "properties"}`}
          </p>
        </div>

        <div className={`container flex-column flex-md-row ${styles.cards}`}>
          {listings &&
            listings.map((listing) => {
              return (
                <PropertyCard
                  key={listing.id}
                  listing={listing}
                  userDetails={userDetails}
                  propertyId={listing.id}
                  propertyType={listing.propertyType}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default OwnersContacted;
