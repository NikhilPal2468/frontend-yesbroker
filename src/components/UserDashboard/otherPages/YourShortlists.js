import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import HouseCard from "../../ListProperties/HouseCard";

function YourShortlists() {
  const { propertyType } = useParams();

  const [shortlistedProperty, setShortlistedProperty] = useState([]);
  console.log("shortlistedProperty:", shortlistedProperty);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/secure/api/user/myshortlists?propertyType=${propertyType}`
        );
        console.log("data:", data.data);
        setShortlistedProperty(data?.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, [propertyType]);
  console.log("shortlistedProperty:", shortlistedProperty);

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
            You have shortlisted {shortlistedProperty?.length}{" "}
            {shortlistedProperty?.length === 1 ? "property" : "properties"}
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
    </div>
  );
}

export default YourShortlists;
