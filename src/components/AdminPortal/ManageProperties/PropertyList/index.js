import React from "react";
import PropertyCard from "../../../UserDashboard/otherPages/PropertyCard";

const PropertyList = ({ properties }) => {
  return (
    <div className="my-2">
      {properties.map((property) => (
        <PropertyCard key={property?.id} listing={property} />
      ))}
    </div>
  );
};

export default PropertyList;
