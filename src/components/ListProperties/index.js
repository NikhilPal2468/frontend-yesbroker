import React from "react";
import RecipeReviewCard from "../utils/card";
import FlatFilters from "./Filters/FlatFilters";
import HouseFilters from "./Filters/HouseFilters";
import PGFilters from "./Filters/PGFilters";

const properties = [
  {
    id: "11e1nffkfkfkkfnfow",
    title: "2BHK flat for sale",
    description: "Vasant kunj fully furnished near by resources",
    address: "DLF Phase 3 sector 25A, Gurgaon",
    city: "Gurgaon",
    state: "Delhi",
    country: "India",
    zip_code: "456740",
    price: "34000",
    bedrooms: "3",
    bathrooms: "1",
    property_type: "3BHK",
    preffered_tenants: ["Bachelor", "Family"],
    images_array: ["", "", ""],
    area_sq_ft: "400 sq ft",
    facilities: "",
  },
];

const ListProperties = () => {
  return <HouseFilters />;
};

export default ListProperties;
