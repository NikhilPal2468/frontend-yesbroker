import React, { useContext, useState } from "react";
import styles from "./styles.module.css";
import { GrUserManager } from "react-icons/gr";
import { GiFamilyHouse } from "react-icons/gi";
import { TbSofa } from "react-icons/tb";
import { VscKey } from "react-icons/vsc";
import { Link } from "react-router-dom";

import OwnerModal from "../../ShowOwnerModal/OwnerModal";
import LikeHandler from "../../likeHandler";
import { AuthContext } from "../../../context/AuthContext";

const HouseCard = ({
  userDetails = {},
  houses_id = "",
  //   apartment_name = "",
  locality = "",
  rent = 0,
  rent_negotiable = false,
  deposit = 0,
  builtup_area = "",
  furnishing_type = "",
  bhk_type = "",
  preferred_tenants = "",
  available_from = "",
  // propertyType = "",
  shortlistArray,
  media_url,
}) => {
  const { setShowLogin } = useContext(AuthContext);
  const [showOwnersContacted, setShowOwnersContacted] = useState(false);
  const [houseId, setHouseId] = useState("");

  const handleHouseClicked = (e, housesId) => {
    if (userDetails) {
      setHouseId(housesId);
      setShowOwnersContacted(true);
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="mb-4" key={houses_id}>
      <Link to={`/property/${houses_id}`} className="text-decoration-none">
        <div className="card border-bottom-0 rounded-bottom-0">
          <div className="card-body">
            <h5 className="card-title text-start">{`${bhk_type} in ${locality}`}</h5>
            <h6 className="font-weight-light mb-2 text-muted text-start">
              {/* <small>{house?.headline}</small> */}
            </h6>
          </div>
        </div>
      </Link>
      <div className="card rounded-top-0 rounded-bottom-0">
        <Link
          to={`/property/${houses_id}`}
          className="text-decoration-none text-dark"
        >
          <div className="card-body row text-center">
            <div
              className={`col-6 col-md d-flex flex-column ${styles.borderOpt2}`}
            >
              <h6 className="card-title mb-0">₹ {rent}</h6>
              <p className="mb-0">
                <small>{`Rent (${
                  rent_negotiable ? "Negotiable" : "Non-Negotiable"
                })`}</small>
              </p>
            </div>
            <div
              className={`col-6 col-md d-flex flex-column ${styles.borderOpt2}`}
            >
              <h6 className="card-title mb-0">₹ {deposit}</h6>
              <p className="mb-0">
                <small>Deposit</small>
              </p>
            </div>
            <div className="col-12 col-md d-flex flex-column d-none d-md-flex">
              <h6 className="card-title mb-0">{builtup_area}</h6>
              <p className="mb-0">
                <small>Builtup(sqft)</small>
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className="card rounded-top-0">
        <div className="card rounded-top-0">
          <div className="d-flex flex-column flex-lg-row p-3 gap-2">
            <div className="col-12 col-lg-4">
              <div id="carouselExample" className="carousel slide">
                <div
                  className={`carousel-inner overflow-hidden ${styles.listImageDiv}`}
                >
                  {media_url.map((image_url) => {
                    console.log(image_url);
                    return (
                      <div className="carousel-item active h-100">
                        <img
                          src={image_url}
                          className={`d-block w-100 ${styles.listImage}`}
                          alt="..."
                        />
                      </div>
                    );
                  })}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div className="col-12 col-lg-8 d-flex justify-contents-center">
              <div className="row w-100 h-100 m-0 m-2 p-2">
                <Link
                  to={`/property/${houses_id}`}
                  className="text-decoration-none text-dark"
                >
                  <div
                    className={`col-12 d-flex flex-row ${styles.borderOpt1}`}
                  >
                    <div
                      className={`w-50 d-flex flex-row justify-content-center align-items-center ${styles.borderOpt2}`}
                    >
                      <div className="px-2">
                        <TbSofa size={28} />
                      </div>
                      <div>
                        <p className="mb-0">{furnishing_type}</p>
                        <p className="card-title mb-0 text-bold">
                          <small>Furnishing</small>
                        </p>
                      </div>
                    </div>
                    <div className="w-50 d-flex flex-row justify-content-center align-items-center">
                      <div className="px-2">
                        <GiFamilyHouse size={28} />
                      </div>
                      <div>
                        <p className="mb-0">{bhk_type}</p>
                        <p className="card-title mb-0 text-bold">
                          <small>Apartment Type</small>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`col-12 d-flex flex-row ${styles.borderOpt1} border-top-0`}
                  >
                    <div
                      className={`w-50 d-flex flex-row justify-content-center align-items-center ${styles.borderOpt2}`}
                    >
                      <div className="px-2">
                        <GrUserManager size={28} />
                      </div>
                      <div>
                        <p className="mb-0">{preferred_tenants}</p>
                        <p className="card-title mb-0 text-bold">
                          <small>Preferred Tenants</small>
                        </p>
                      </div>
                    </div>
                    <div className="w-50 d-flex flex-row justify-content-center align-items-center">
                      <div className="px-2">
                        <VscKey size={28} />
                      </div>
                      <div>
                        <p className="mb-0">
                          {new Date(available_from).toLocaleString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <p className="card-title mb-0 text-bold">
                          <small>Available From</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="col-12 d-flex flex-row my-2">
                  <div className="d-flex flex-row justify-content-center align-items-center w-100">
                    <div
                      className={`flex-grow-1 p-2 text-white text-center rounded ${styles.primary_color}`}
                      role="button"
                      onClick={(e) => {
                        handleHouseClicked(e, houses_id);
                      }}
                    >
                      Get Owner Details
                    </div>
                    <LikeHandler
                      houses_id={houses_id}
                      shortlisted={shortlistArray.includes(houses_id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showOwnersContacted && (
        <OwnerModal
          showOwnersContacted={showOwnersContacted}
          setShowOwnersContacted={setShowOwnersContacted}
          houseId={houseId}
        />
      )}
    </div>
  );
};

export default HouseCard;
