import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { TbSofa } from "react-icons/tb";
import { GiFamilyHouse } from "react-icons/gi";
import { GrUserManager } from "react-icons/gr";
import { VscKey } from "react-icons/vsc";
import noPhotoImg from "../../../../assets/no-image.png";
import { AuthContext } from "../../../../context/AuthContext";
import OwnerModal from "../../../ShowOwnerModal/OwnerModal";

const PropertyCard = ({
  listing = {},
  userDetails = {},
  propertyType,
  propertyId,
}) => {
  console.log(propertyType);

  const {
    bhk_type = "",
    locality = "",
    rent = 0,
    deposit = 0,
    images = [],
    builtup_area = "",
    furnishing_type = "",
    available_from = "",
    preferred_tenants = "",
    rent_negotiable = false,

    single_room = false,
    single_room_rent,
    single_room_deposit,

    double_room = false,
    double_room_rent,
    double_room_deposit,

    triple_room = false,
    triple_room_rent,
    triple_room_deposit,

    four_room = false,
    four_room_rent,
    four_room_deposit,

    food_available,
    breakfast = false,
    lunch = false,
    dinner = false,

    pg_name,
  } = listing;

  const addImgCarousel = (index) => {
    let classname = "carousel-item h-100";

    if (index === 0) {
      classname += " active";
    }

    return classname;
  };

  const { setShowLogin } = useContext(AuthContext);
  const [showOwnersContacted, setShowOwnersContacted] = useState(false);

  const handlePropertyClicked = (e) => {
    if (userDetails) {
      setShowOwnersContacted(true);
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div key={propertyId} className={`card w-100 mb-4 ${styles.property_card}`}>
      {propertyType === "house" ? (
        <div>
          <a
            href={`/property/house/${propertyId}`}
            className="text-decoration-none"
            target="_blank"
            rel="noreferrer"
          >
            <div className="card border-bottom-0 rounded-bottom-0">
              <div className="card-body">
                <h5 className="card-title text-start">{`${bhk_type} in ${locality}`}</h5>
                <h6 className="font-weight-light mb-2 text-muted text-start">
                  {/* <small>{house?.headline}</small> */}
                </h6>
              </div>
            </div>
          </a>
          <div className="card rounded-top-0 rounded-bottom-0">
            <a
              href={`/property/house/${propertyId}`}
              className="text-decoration-none text-dark"
              target="_blank"
              rel="noreferrer"
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
            </a>
          </div>
          <div className="card rounded-top-0">
            <div className="card rounded-top-0">
              <div className="d-flex flex-column flex-lg-row p-3 gap-2">
                <div className="col-12 col-lg-4">
                  <div propertyId={propertyId} className="carousel slide">
                    <div
                      className={`carousel-inner overflow-hidden ${styles.listImageDiv}`}
                    >
                      {images?.length ? (
                        images.map(({ media_url, propertyId }, index) => {
                          return (
                            <div
                              className={addImgCarousel(index)}
                              key={propertyId}
                            >
                              <img
                                src={media_url}
                                className={`d-block w-100 ${styles.listImage}`}
                                alt="..."
                              />
                            </div>
                          );
                        })
                      ) : (
                        <div className="carousel-item active h-100">
                          <img
                            src={noPhotoImg}
                            className={`d-block w-100 ${styles.listImage}`}
                            alt="..."
                          />
                        </div>
                      )}
                    </div>
                    <button
                      className="carousel-control-prev text-dark"
                      type="button"
                      data-bs-target={`#${propertyId}`}
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next text-dark"
                      type="button"
                      data-bs-target={`#${propertyId}`}
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
                    <a
                      href={`/property/house/${propertyId}`}
                      className="text-decoration-none text-dark"
                      target="_blank"
                      rel="noreferrer"
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
                              {new Date(available_from).toLocaleString(
                                "en-US",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </p>
                            <p className="card-title mb-0 text-bold">
                              <small>Available From</small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div className="col-12 d-flex flex-row my-2">
                      <div className="d-flex flex-row justify-content-center align-items-center w-100">
                        {Object.keys(userDetails).length === 0 ? (
                          <Link
                            to={`/property/manage/house/${propertyId}/property`}
                            className="text-white text flex-grow-1 p-2 rounded"
                            style={{ textDecoration: "none" }}
                          >
                            <div
                              className={`flex-grow-1 p-2 text-white text-center rounded ${styles.primary_color}`}
                            >
                              Edit
                            </div>
                          </Link>
                        ) : (
                          <div
                            className={`flex-grow-1 p-2 text-white text-center rounded ${styles.primary_color}`}
                            role="button"
                            onClick={(e) => {
                              handlePropertyClicked(e);
                            }}
                          >
                            Get Owner Details
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <a
            href={`/property/pg/${propertyId}`}
            className="text-decoration-none"
            target="_blank"
            rel="noreferrer"
          >
            <div className="card border-bottom-0 rounded-bottom-0">
              <div className="card-body">
                <h5 className="card-title text-start">{`PG in ${locality}`}</h5>
                <h6 className="font-weight-light mb-2 text-muted text-start">
                  {/* <small>{house?.headline}</small> */}
                </h6>
              </div>
            </div>
          </a>
          <div className="card rounded-top-0 rounded-bottom-0">
            <a
              href={`/property/pg/${propertyId}`}
              className="text-decoration-none text-dark"
              target="_blank"
              rel="noreferrer"
            >
              <div className="card-body row text-center">
                <div
                  className={`col-6 col-md d-flex flex-column ${styles.borderOpt2}`}
                >
                  <h6 className="card-title mb-0">₹ {single_room_rent}</h6>
                </div>
                <div
                  className={`col-6 col-md d-flex flex-column ${styles.borderOpt2}`}
                >
                  <h6 className="card-title mb-0">₹ {single_room_deposit}</h6>
                  <p className="mb-0">
                    <small>Deposit</small>
                  </p>
                </div>
              </div>
            </a>
          </div>

          <div className="card rounded-top-0">
            <div className="card rounded-top-0">
              <div className="d-flex flex-column flex-lg-row p-3 gap-2">
                <div className="col-12 col-lg-4">
                  <div propertyId={propertyId} className="carousel slide">
                    <div
                      className={`carousel-inner overflow-hidden ${styles.listImageDiv}`}
                    >
                      {images?.length ? (
                        images.map(({ media_url, filename }, index) => {
                          return (
                            <div
                              className={addImgCarousel(index)}
                              key={filename}
                            >
                              <img
                                src={media_url}
                                className={`d-block w-100 ${styles.listImage}`}
                                alt="..."
                              />
                            </div>
                          );
                        })
                      ) : (
                        <div className="carousel-item active h-100">
                          <img
                            src={noPhotoImg}
                            className={`d-block w-100 ${styles.listImage}`}
                            alt="..."
                          />
                        </div>
                      )}
                    </div>
                    <button
                      className="carousel-control-prev text-dark"
                      type="button"
                      data-bs-target={`#${propertyId}`}
                      data-bs-slide="prev"
                    ></button>

                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                    <button
                      className="carousel-control-next text-dark"
                      type="button"
                      data-bs-target={`#${propertyId}`}
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
                    <a
                      href={`/property/pg/${propertyId}`}
                      className="text-decoration-none text-dark"
                      target="_blank"
                      rel="noreferrer"
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
                            <p className="mb-0">{pg_name}</p>
                            <p className="card-title mb-0 text-bold">
                              <small>PG Name</small>
                            </p>
                          </div>
                        </div>
                        <div className="w-50 d-flex flex-row justify-content-center align-items-center">
                          <div className="px-2">
                            <GiFamilyHouse size={28} />
                          </div>
                          <div>
                            <p className="mb-0">{food_available}</p>
                            <p className="card-title mb-0 text-bold">
                              <small>Food Available</small>
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
                              {new Date(available_from).toLocaleString(
                                "en-US",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </p>
                            <p className="card-title mb-0 text-bold">
                              <small>Available From</small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div className="col-12 d-flex flex-row my-2">
                      <div className="d-flex flex-row justify-content-center align-items-center w-100">
                        {Object.keys(userDetails).length === 0 ? (
                          <Link
                            to={`/property/manage/pg/${propertyId}/property`}
                            className="text-white text flex-grow-1 p-2 rounded"
                            style={{ textDecoration: "none" }}
                          >
                            <div
                              className={`flex-grow-1 p-2 text-white text-center rounded ${styles.primary_color}`}
                            >
                              Edit
                            </div>
                          </Link>
                        ) : (
                          <div
                            className={`flex-grow-1 p-2 text-white text-center rounded ${styles.primary_color}`}
                            role="button"
                            onClick={(e) => {
                              handlePropertyClicked(e);
                            }}
                          >
                            Get Owner Details
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showOwnersContacted && (
        <OwnerModal
          showOwnersContacted={showOwnersContacted}
          setShowOwnersContacted={setShowOwnersContacted}
          propertyId={propertyId}
          propertyType={propertyType}
        />
      )}
    </div>
  );
};

export default PropertyCard;
