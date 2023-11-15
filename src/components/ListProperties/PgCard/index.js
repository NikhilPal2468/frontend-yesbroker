import React, { useContext, useState } from "react";
import styles from "./styles.module.css";
import { GrUserManager } from "react-icons/gr";
import { GiFamilyHouse } from "react-icons/gi";
import { TbSofa } from "react-icons/tb";
import { VscKey } from "react-icons/vsc";

import OwnerModal from "../../ShowOwnerModal/OwnerModal";
import LikeHandler from "../../likeHandler";
import { AuthContext } from "../../../context/AuthContext";
import noPhotoImg from "../../../assets/no-image.png";

const PgCard = ({
  userDetails = {},
  propertyType = "pg",
  pgs_id = "",
  pg_name = "",
  locality = "",
  single_room = true,
  single_room_rent = 20000,
  single_room_deposit = 20000,

  double_room = true,
  // double_room_rent = 20000,
  // double_room_deposit = 20000,

  triple_room = true,
  // triple_room_rent = 20000,
  // triple_room_deposit = 20000,

  four_room = true,
  // four_room_rent = 20000,
  // four_room_deposit = 20000,

  food_available = true,

  // breakfast = true,
  // lunch = false,
  // dinner = true,
  preferred_tenants = "",
  available_from = "",
  shortlistArray,
  setShortlistedProperty = () => {},
  images,
  // attachedBathroom = false,
  // preferredTenantsPG = [],
  // foodType = [],
  // roomType = [],
}) => {
  const { setShowLogin } = useContext(AuthContext);
  const [showOwnersContacted, setShowOwnersContacted] = useState(false);

  const addImgCarousel = (index) => {
    let classname = "carousel-item h-100";

    if (index === 0) {
      classname += " active";
    }

    return classname;
  };

  const handlePgClicked = () => {
    if (userDetails) {
      setShowOwnersContacted(true);
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="mb-4" key={pgs_id}>
      <a
        href={`/property/pg/${pgs_id}`}
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
          href={`/property/pg/${pgs_id}`}
          className="text-decoration-none text-dark"
          target="_blank"
          rel="noreferrer"
        >
          <div className="card-body row text-center">
            <div
              className={`col-6 col-md d-flex flex-column ${styles.borderOpt2}`}
            >
              <h6 className="card-title mb-0">₹ {single_room_rent}</h6>
              <p className="mb-0">
                <small>Rent/month</small>
              </p>
            </div>
            <div
              className={`col-6 col-md d-flex flex-column ${styles.borderOpt2}`}
            >
              <h6 className="card-title mb-0">
                {single_room && (double_room || triple_room || four_room)
                  ? "Single and Shared"
                  : single_room
                  ? "Single Room Available"
                  : "Shared Room Available"}
              </h6>
              <p className="mb-0">
                <small>Room Type available</small>
              </p>
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
              <div className="carousel slide">
                <div
                  className={`carousel-inner overflow-hidden ${styles.listImageDiv}`}
                >
                  {images?.length ? (
                    images.map(({ media_url, filename }, index) => {
                      return (
                        <div className={addImgCarousel(index)} key={filename}>
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
                  data-bs-target={`#${pgs_id}`}
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
                  data-bs-target={`#${pgs_id}`}
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
                  href={`/property/pg/${pgs_id}`}
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
                </a>
                <div className="col-12 d-flex flex-row my-2">
                  <div className="d-flex flex-row justify-content-center align-items-center w-100">
                    <div
                      className={`flex-grow-1 p-2 text-white text-center rounded ${styles.primary_color}`}
                      role="button"
                      onClick={(e) => {
                        handlePgClicked(e);
                      }}
                    >
                      Get Owner Details
                    </div>

                    <LikeHandler
                      propertyId={pgs_id}
                      propertyType={propertyType}
                      shortlisted={shortlistArray?.includes(pgs_id)}
                      userDetails={userDetails}
                      setShortlistedProperty={setShortlistedProperty}
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
          propertyId={pgs_id}
          propertyType={propertyType}
        />
      )}
    </div>
  );
};

export default PgCard;
