import React from "react";

import { BsArrowCounterclockwise } from "react-icons/bs";
import styles from "./styles.module.css";
import { GrUserManager } from "react-icons/gr";
import { GiFamilyHouse } from "react-icons/gi";
import { TbSofa } from "react-icons/tb";
import { VscKey } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi";

function HouseFilters() {
  const houses = [
    {
      id: "djdj3r23r32mv",
      ownerId: "fvnfdvdfvfbvfdb",
      title: "1 RK For Rent in sector 24",
      headline:
        "Standalone building, U Block, DLF Phase 3 near ASHA MULTI SPECIALITY CLINIC",
      description: `This fully furnished 1BHK is available for rent in Sector 24 with parking space for car and bike. Take a look before it's gone. All families & bachelors looking for an apartment will find this home attractive at Rs. 20,000. This home is 600 sqft & is situated on the 1st floor of the building,
      With a subway station located nearby, this home is well connected & offers many transit options.With an ATM, petrol pump & super market near this home, you'll never have to go far for these essentials.
      Never miss out on lifestyle as City Centre, Sahara Mall and JMD Regent Plaza Mall are so close by. With VR Sahara, PVR Cinemas Pvt Ltd & Invasion Films close by, you can catch your favourite movies running & never worry about missing a show because of traffic.
      With Govt Sr Sec School Chakkarpur, Rack Up Cambridge School and KLAY Prep Schools and DayCare close to this home, you'll be able to provide your children with many options to choose from. St Stephen's Hospital Health Care Facility and Narayana Superspeciality Hospital, Gurugram are close by and are known for providing exceptional medical care.`,
      rent: "17000",
      rent_negotiable: "false",
      deposit: "17000",
      lockin_period: "2 months",
      furnishing: "full",
      preferred_tenants: "all",
      builtup_area: "200 sqft",
      bhk_type: "1rk",
      parking: "Bike and Car",
      street: "1 A, ram verma street",
      colony: "dlf phase 3",
      city: "delhi",
      state: "delhi",
      country: "india",
      property_age: "5",
      bedrooms: "1",
      bathrooms: "1",
      available_from: "2 June, 2023",
    },
    {
      id: "djdj3r23r32mv",
      ownerId: "fvnfdvdfvfbvfdb",
      title: "1 RK For Rent in sector 24",
      headline:
        "Standalone building, U Block, DLF Phase 3 near ASHA MULTI SPECIALITY CLINIC",
      description: `This fully furnished 1BHK is available for rent in Sector 24 with parking space for car and bike. Take a look before it's gone. All families & bachelors looking for an apartment will find this home attractive at Rs. 20,000. This home is 600 sqft & is situated on the 1st floor of the building,
      With a subway station located nearby, this home is well connected & offers many transit options.With an ATM, petrol pump & super market near this home, you'll never have to go far for these essentials.
      Never miss out on lifestyle as City Centre, Sahara Mall and JMD Regent Plaza Mall are so close by. With VR Sahara, PVR Cinemas Pvt Ltd & Invasion Films close by, you can catch your favourite movies running & never worry about missing a show because of traffic.
      With Govt Sr Sec School Chakkarpur, Rack Up Cambridge School and KLAY Prep Schools and DayCare close to this home, you'll be able to provide your children with many options to choose from. St Stephen's Hospital Health Care Facility and Narayana Superspeciality Hospital, Gurugram are close by and are known for providing exceptional medical care.`,
      rent: "17000",
      rent_negotiable: "false",
      deposit: "17000",
      lockin_period: "2 months",
      furnishing: "full",
      preferred_tenants: "all",
      builtup_area: "200 sqft",
      bhk_type: "1 RK",
      parking: "Bike and Car",
      street: "1 A, ram verma street",
      colony: "dlf phase 3",
      city: "delhi",
      state: "delhi",
      country: "india",
      property_age: "5",
      bedrooms: "1",
      bathrooms: "1",
      available_from: "22 May, 2023",
    },
    {
      id: "djdj3r23r32mv",
      ownerId: "fvnfdvdfvfbvfdb",
      title: "1 RK For Rent in sector 24",
      headline:
        "Standalone building, U Block, DLF Phase 3 near ASHA MULTI SPECIALITY CLINIC",
      description: `This fully furnished 1BHK is available for rent in Sector 24 with parking space for car and bike. Take a look before it's gone. All families & bachelors looking for an apartment will find this home attractive at Rs. 20,000. This home is 600 sqft & is situated on the 1st floor of the building,
      With a subway station located nearby, this home is well connected & offers many transit options.With an ATM, petrol pump & super market near this home, you'll never have to go far for these essentials.
      Never miss out on lifestyle as City Centre, Sahara Mall and JMD Regent Plaza Mall are so close by. With VR Sahara, PVR Cinemas Pvt Ltd & Invasion Films close by, you can catch your favourite movies running & never worry about missing a show because of traffic.
      With Govt Sr Sec School Chakkarpur, Rack Up Cambridge School and KLAY Prep Schools and DayCare close to this home, you'll be able to provide your children with many options to choose from. St Stephen's Hospital Health Care Facility and Narayana Superspeciality Hospital, Gurugram are close by and are known for providing exceptional medical care.`,
      rent: "17000",
      rent_negotiable: "false",
      deposit: "17000",
      lockin_period: "2 months",
      furnishing: "full",
      preferred_tenants: "all",
      builtup_area: "200 sqft",
      bhk_type: "1 RK",
      parking: "Bike and Car",
      street: "1 A, ram verma street",
      colony: "dlf phase 3",
      city: "delhi",
      state: "delhi",
      country: "india",
      property_age: "5",
      bedrooms: "1",
      bathrooms: "1",
      available_from: "22 August, 2023",
    },
    {
      id: "djdj3r23r32mv",
      ownerId: "fvnfdvdfvfbvfdb",
      title: "1 RK For Rent in sector 24",
      headline:
        "Standalone building, U Block, DLF Phase 3 near ASHA MULTI SPECIALITY CLINIC",
      description: `This fully furnished 1BHK is available for rent in Sector 24 with parking space for car and bike. Take a look before it's gone. All families & bachelors looking for an apartment will find this home attractive at Rs. 20,000. This home is 600 sqft & is situated on the 1st floor of the building,
      With a subway station located nearby, this home is well connected & offers many transit options.With an ATM, petrol pump & super market near this home, you'll never have to go far for these essentials.
      Never miss out on lifestyle as City Centre, Sahara Mall and JMD Regent Plaza Mall are so close by. With VR Sahara, PVR Cinemas Pvt Ltd & Invasion Films close by, you can catch your favourite movies running & never worry about missing a show because of traffic.
      With Govt Sr Sec School Chakkarpur, Rack Up Cambridge School and KLAY Prep Schools and DayCare close to this home, you'll be able to provide your children with many options to choose from. St Stephen's Hospital Health Care Facility and Narayana Superspeciality Hospital, Gurugram are close by and are known for providing exceptional medical care.`,
      rent: "17000",
      rent_negotiable: "false",
      deposit: "17000",
      lockin_period: "2 months",
      furnishing: "full",
      preferred_tenants: "all",
      builtup_area: "200 sqft",
      bhk_type: "1 RK",
      parking: "Bike and Car",
      street: "1 A, ram verma street",
      colony: "dlf phase 3",
      city: "delhi",
      state: "delhi",
      country: "india",
      property_age: "5",
      bedrooms: "1",
      bathrooms: "1",
      available_from: "2 June, 2023",
    },
  ];

  // const propertyAmmenities = [
  //   {
  //     id: "vfjvndfjvnfd3323",
  //     property_id: "djdj3r23r32mv",
  //     fridge: "true",
  //     ac: "true",
  //   },
  // ];

  const renderBHKType = (type) => {
    switch (type) {
      case "1rk":
        return "1 RK";
      case "1bhk":
        return "1 BHK";
      case "2bhk":
        return "2 BHK";
      case "3bhk":
        return "3 BHK";
      case "4bhk":
        return "4 BHK";
      default:
        return "4+ BHK";
    }
  };

  const renderFurnishing = (type) => {
    switch (type) {
      case "full":
        return "Fully Furnished";
      case "semi":
        return "Semi Furnished";
      default:
        return "None";
    }
  };

  const renderPreferedTenants = (type) => {
    switch (type) {
      case "bachelor":
        return "Bachelor";
      case "family":
        return "Family";
      default:
        return "Any";
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-5 col-lg-4">
          <div className={`card p-2 ${styles.sticky_card}`}>
            <div className="d-flex flex-row justify-content-between align-items-center pb-2 border-bottom border-3 border-dark">
              <h5 className="card-title my-auto">Filters</h5>
              <p className="my-auto">
                <BsArrowCounterclockwise /> Reset
              </p>
            </div>
            <div className="card-body">
              <div className="input-group d-flex flex-column border-bottom border-1 border-dark">
                <h6 className="text-start">BHK Type</h6>
                <div className="grid pb-2 justify-content-between align-items-center text-start">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="1rk"
                      name="1rk"
                      value="1rk"
                    />
                    <label className={`form-check-label`} htmlFor="1rk">
                      1 RK
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="1bhk"
                      value="1bhk"
                      name="1bhk"
                    />
                    <label className={`form-check-label `} htmlFor="1bhk">
                      1 BHK
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="2bhk"
                      value="2bhk"
                      name="2bhk"
                    />
                    <label className={`form-check-label `} htmlFor="2bhk">
                      2 BHK
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="3bhk"
                      value="3bhk"
                      name="3bhk"
                    />
                    <label className={`form-check-label `} htmlFor="3bhk">
                      3 BHK
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="4bhk"
                      value="4bhk"
                      name="4bhk"
                    />
                    <label className={`form-check-label `} htmlFor="4bhk">
                      4 BHK
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="4+bhk"
                      value="4+bhk"
                      name="4+bhk"
                    />
                    <label className={`form-check-label `} htmlFor="4+bhk">
                      4+ BHK
                    </label>
                  </div>
                </div>
              </div>
              <div className="input-group d-flex flex-column mt-2 pt-1 border-bottom border-1 border-dark">
                <h6 className="text-start">Preferred Tenant</h6>
                <div className="d-flex pb-2 flex-row justify-content-between align-items-center text-start">
                  <div className="form-check flex-grow-1 form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="family"
                      name="family"
                      value="family"
                    />
                    <label
                      className={`form-check-label ${styles.filterOption}`}
                      htmlFor="family"
                    >
                      Family
                    </label>
                  </div>
                  <div className="form-check flex-grow-1 form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="bachelor"
                      value="bachelor"
                      name="bachelor"
                    />
                    <label
                      className={`form-check-label ${styles.filterOption}`}
                      htmlFor="bachelor"
                    >
                      Bachelor
                    </label>
                  </div>
                </div>
              </div>
              <div className="input-group d-flex flex-column mt-2 pt-1 border-bottom border-1 border-dark">
                <div className="flex-grow-1 mb-0">
                  <label
                    htmlFor="price"
                    className="form-label w-100 text-start"
                  >
                    <h6 className="w-100 mb-0">Price</h6>
                  </label>
                  <input
                    type="range"
                    className="form-range"
                    min="2000"
                    max="200000"
                    step="5000"
                    name="price"
                    id="price"
                  />
                </div>
              </div>
              <div className="input-group d-flex flex-column mt-2 pt-1 border-bottom border-1 border-dark">
                <h6 className="text-start">Furnishing</h6>
                <div className="d-flex pb-2 flex-row justify-content-between align-items-center text-start">
                  <div className="form-check flex-grow-1 form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="full"
                      name="full"
                      value="full"
                    />
                    <label
                      className={`form-check-label ${styles.filterOption}`}
                      htmlFor="full"
                    >
                      Full
                    </label>
                  </div>
                  <div className="form-check flex-grow-1 form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="semi"
                      value="semi"
                      name="semi"
                    />
                    <label
                      className={`form-check-label ${styles.filterOption}`}
                      htmlFor="semi"
                    >
                      Semi
                    </label>
                  </div>
                  <div className="form-check flex-grow-1 form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="none"
                      value="none"
                      name="none"
                    />
                    <label
                      className={`form-check-label ${styles.filterOption}`}
                      htmlFor="none"
                    >
                      None
                    </label>
                  </div>
                </div>
              </div>
              <div className="input-group d-flex flex-column mt-2 pt-1 border-bottom border-1 border-dark">
                <h6 className="text-start">Parking</h6>
                <div className="d-flex pb-2 flex-row justify-content-between align-items-center text-start">
                  <div className="form-check flex-grow-1 form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="twowheeler"
                      name="twowheeler"
                      value="twowheeler"
                    />
                    <label
                      className={`form-check-label ${styles.filterOption}`}
                      htmlFor="twowheeler"
                    >
                      2 Wheeler
                    </label>
                  </div>
                  <div className="form-check flex-grow-1 form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="fourwheeler"
                      value="fourwheeler"
                      name="fourwheeler"
                    />
                    <label
                      className={`form-check-label ${styles.filterOption}`}
                      htmlFor="fourwheeler"
                    >
                      4 Wheeler
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-7 col-lg-8">
          {houses.map((house) => {
            return (
              <div className="mb-4" key={house?.id}>
                <div className="card border-bottom-0 rounded-bottom-0">
                  <div className="card-body">
                    <h5 className="card-title text-start">{house.title}</h5>
                    <h6 className="font-weight-light mb-2 text-muted text-start">
                      <small>{house.headline}</small>
                    </h6>
                  </div>
                </div>
                <div className="card rounded-top-0 rounded-bottom-0">
                  <div className="card-body row">
                    <div
                      className={`col-sm d-flex flex-column ${styles.borderOpt2}`}
                    >
                      <h6 className="card-title mb-0">{house.rent}</h6>
                      <p className="mb-0">
                        <small>{`Rent (${
                          house.rent_negotiable === "true"
                            ? "Negotiable"
                            : "Non-Negotiable"
                        })`}</small>
                      </p>
                    </div>
                    <div
                      className={`col-sm d-flex flex-column ${styles.borderOpt2}`}
                    >
                      <h6 className="card-title mb-0">{house.deposit}</h6>
                      <p className="mb-0">
                        <small>Deposit</small>
                      </p>
                    </div>
                    <div className="col-sm d-flex flex-column">
                      <h6 className="card-title mb-0">{house.builtup_area}</h6>
                      <p className="mb-0">
                        <small>Builtup</small>
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
                              <p className="mb-0">
                                {renderFurnishing(house.furnishing)}
                              </p>
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
                              <p className="mb-0">
                                {renderBHKType(house.bhk_type)}
                              </p>
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
                              <p className="mb-0">
                                {renderPreferedTenants(house.preferred_tenants)}
                              </p>
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
                              <p className="mb-0">{house.available_from}</p>
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
                            >
                              Get Owner Details
                              {/* <h6 className="mb-0">Get Owner Details</h6> */}
                            </div>
                            <div
                              className={`p-1 rounded ms-2 ${styles.likeBorder}`}
                              role="button"
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
        </div>
      </div>
    </div>
  );
}

export default HouseFilters;
