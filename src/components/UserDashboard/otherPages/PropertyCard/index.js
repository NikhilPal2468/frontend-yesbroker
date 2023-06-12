import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
const PropertyCard = ({ listing = {} }) => {
  const { houses_id = "", bhk_type = "", locality = "", rent = 0 } = listing;
  console.log("listing:", listing);
  return (
    <div key={houses_id} className={`card ${styles.property_card}`}>
      <div className="card-body">
        <h6 className="card-title">
          {bhk_type} in {locality}
        </h6>
        <p className="card-text">Rent: {rent}</p>
        <Link
          to={`/property/manage/house/${houses_id}/property`}
          className="btn btn-light"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
