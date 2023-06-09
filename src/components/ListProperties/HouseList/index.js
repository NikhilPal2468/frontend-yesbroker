import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { GrUserManager } from "react-icons/gr";
import { GiFamilyHouse } from "react-icons/gi";
import { TbSofa } from "react-icons/tb";
import { VscKey } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi";
import OwnerModal from "../OwnerModal";
const HouseList = ({
  city = "",
  propertyType = "",
  locality = "",
  bhkType = [],
  preferredTenants = [],
  price = [],
  furnishing = [],
  twoWheelerParking = false,
  fourWheelerParking = false,
  withImage = false,
}) => {
  console.log("locality:", locality);
  const [houses, setHouses] = useState([]);
  if (bhkType === []) {
    console.log("first");
  }

  function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  useEffect(() => {
    const fetchData = async () => {
      let payload = {
        city: city,
        // text: ["bangalore"],
        text: [locality],
        pgNo: "1",
        propertyType: propertyType,
        filters: {
          bhk_type: bhkType.length === 0 ? undefined : bhkType,
          preferred_tenants:
            preferredTenants.length === 1 ? undefined : preferredTenants,
          price_greater_than: price[0],
          price_less_than: price[1],
          furnishing_type: furnishing.length === 0 ? undefined : furnishing,
          two_wheeler_parking:
            twoWheelerParking === false ? undefined : twoWheelerParking,
          four_wheeler_parking:
            fourWheelerParking === false ? undefined : fourWheelerParking,
          property_with_image: withImage === false ? undefined : withImage,
        },
      };

      try {
        const { data } = await axios.post(
          "/public/api/listProperties",
          payload
        );
        const { allhouses = [], count = 0 } = data || {};
        console.log("count:", count);
        setHouses(allhouses);
      } catch (error) {
        console.error(error);
      }
    };

    // fetchData();
    const debouncedAPIRequest = debounce(fetchData, 500);
    debouncedAPIRequest();
    return () => {
      clearTimeout(debouncedAPIRequest);
    };
  }, [
    city,
    propertyType,
    locality,
    bhkType,
    preferredTenants,
    price,
    furnishing,
    twoWheelerParking,
    fourWheelerParking,
    withImage,
  ]);

  const likeHandler = async (houses_id) => {
    console.log("houseId:", houses_id);
    try {
      const { data } = await axios.post("/secure/api/user/property/shortlist", {
        propertyId: houses_id,
        propertyType,
      });
      console.log("data:", data);
    } catch (err) {
      console.log(err);
    }
  };

  // const renderBHKType = (type) => {
  //   console.log("type:", type);
  //   switch (type) {
  //     case "1rk":
  //       return "1 RK";
  //     case "1bhk":
  //       return "1 BHK";
  //     case "2bhk":
  //       return "2 BHK";
  //     case "3bhk":
  //       return "3 BHK";
  //     case "4bhk":
  //       return "4 BHK";
  //     default:
  //       return "4+ BHK";
  //   }
  // };

  // const renderFurnishing = (type) => {
  //   switch (type) {
  //     case "full":
  //       return "Fully Furnished";
  //     case "semi":
  //       return "Semi Furnished";
  //     default:
  //       return "None";
  //   }
  // };

  // const renderPreferedTenants = (type) => {
  //   switch (type) {
  //     case "bachelor":
  //       return "Bachelor";
  //     case "family":
  //       return "Family";
  //     default:
  //       return "Any";
  //   }
  // };

  const [showOwnersContacted, setShowOwnersContacted] = useState(false);

  const handleHouseClicked = () => {
    setShowOwnersContacted(true);
  };

  return (
    <div className="p-1 col-12 col-md-7 col-lg-8">
      {houses.map((house) => {
        const {
          houses_id = "",
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
        } = house || {};
        console.log("houses_id:", houses_id);
        return (
          <div className="mb-4" key={houses_id}>
            <div className="card border-bottom-0 rounded-bottom-0">
              <div className="card-body">
                <h5 className="card-title text-start">{`${apartment_name} in ${locality}`}</h5>
                <h6 className="font-weight-light mb-2 text-muted text-start">
                  <small>{house?.headline}</small>
                </h6>
              </div>
            </div>
            <div className="card rounded-top-0 rounded-bottom-0">
              <div className="card-body row">
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
            </div>
            <div className="card rounded-top-0">
              <div className="d-flex flex-column flex-lg-row p-3 gap-2">
                <div className="col-12 col-lg-4">
                  <div
                    id="carouselExampleControls"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div
                      className={`carousel-inner overflow-hidden ${styles.listImageDiv}`}
                    >
                      <div className="carousel-item active h-100">
                        <img
                          src="https://images.nobroker.in/images/8a9ffd8488337eca018833ae08d41c58/8a9ffd8488337eca018833ae08d41c58_22925_281699_medium.jpg"
                          className={`d-block w-100 ${styles.listImage}`}
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item h-100">
                        <img
                          src="https://images.nobroker.in/images/8a9f0782880e219201880e411e310cf0/8a9f0782880e219201880e411e310cf0_252667_804472_thumbnail.jpg"
                          className={`d-block w-100 ${styles.listImage}`}
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item h-100">
                        <img
                          src="https://images.nobroker.in/images/8a9fcc83880ee8cb01880f6435ad4a2c/8a9fcc83880ee8cb01880f6435ad4a2c_41407_272325_medium.jpg"
                          className={`d-block w-100 ${styles.listImage}`}
                          alt="..."
                        />
                      </div>
                    </div>
                    <Link
                      className="carousel-control-prev"
                      to="#carouselExampleControls"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                    </Link>
                    <Link
                      className="carousel-control-next"
                      to="#carouselExampleControls"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-lg-8 d-flex justify-contents-center">
                  <div className="row w-100 h-100 m-0 m-2 p-2">
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
                    <div className="col-12 d-flex flex-row my-2">
                      <div className="d-flex flex-row justify-content-center align-items-center w-100">
                        <div
                          className={`flex-grow-1 p-2 text-white text-center rounded ${styles.primary_color}`}
                          role="button"
                          onClick={handleHouseClicked}
                        >
                          Get Owner Details
                        </div>
                        <div
                          className={`p-1 rounded ms-2 ${styles.likeBorder}`}
                          role="button"
                          onClick={() => {
                            likeHandler(houses_id);
                          }}
                        >
                          <HiOutlineHeart size={28} color="#6c63ff" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {showOwnersContacted && (
        <OwnerModal
          showOwnersContacted={showOwnersContacted}
          setShowOwnersContacted={setShowOwnersContacted}
        />
      )}
    </div>
  );
};

export default HouseList;
