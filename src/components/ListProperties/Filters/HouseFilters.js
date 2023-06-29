import React, { useContext } from "react";

import { BsArrowCounterclockwise } from "react-icons/bs";
import styles from "./styles.module.css";
import { Slider } from "@mui/material";
import {
  BHKTYPE,
  FURNISHING_TYPES,
  PARKING,
  PREFERRED_TENANTS,
} from "./constants";

import { LoadContext } from "../../../context/load-context";

function HouseFilters({
  // bhkType = [],
  setBhkType = () => {},
  setPreferredTenants = () => {},
  price = [],
  setPrice = () => {},
  setFurnishing = () => {},
  setParking = () => {},
  setWithImage = () => {},
}) {
  // console.log("bhkType:", bhkType);
  const { setReset } = useContext(LoadContext);

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };
  const handleBhkTypeChange = (event, item) => {
    if (event.target.checked) {
      setBhkType((prev) => [...prev, item]);
    } else {
      setBhkType((prev) => prev.filter((i) => i !== item));
    }
  };
  const handlePreferredTenantsChange = (event, item) => {
    if (event.target.checked) {
      setPreferredTenants((prev) => [...prev, item]);
    } else {
      setPreferredTenants((prev) => prev.filter((i) => i !== item));
    }
  };
  const handleFurnishingChange = (event, item) => {
    if (event.target.checked) {
      setFurnishing((prev) => [...prev, item]);
    } else {
      setFurnishing((prev) => prev.filter((i) => i !== item));
    }
  };

  const handleParkingChange = (event, item) => {
    if (event.target.checked) {
      setParking((prev) => [...prev, item]);
    } else {
      setParking((prev) => prev.filter((i) => i !== item));
    }
  };

  const resetFilters = () => {
    setReset(true);
    setBhkType([]);
    setPreferredTenants(["Both"]);
    setPrice([0, 100000]);
    setFurnishing([]);
    setParking(["Both"]);
    setWithImage(false);
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  return (
    <div className={`card mb-4 ${styles.sticky_card}`}>
      <div className="d-flex flex-row justify-content-between align-items-center p-1 pb-2 border-bottom border-3 border-dark">
        <h5 className="card-title my-auto">Filters</h5>
        <p
          className={`my-auto ${styles.cursor_pointer}`}
          onClick={resetFilters}
        >
          <BsArrowCounterclockwise /> Reset
        </p>
      </div>
      <div className="card-body">
        <div className="input-group d-flex flex-column border-bottom border-1 border-dark">
          <h6 className="text-start">BHK Type</h6>
          <div className="grid pb-2 mx-auto justify-content-center align-items-center text-start">
            {BHKTYPE.map((bhk_type) => (
              <div
                key={bhk_type}
                className="form-check form-check-inline text-center"
              >
                <input
                  className={`${styles.input_checkbox1}`}
                  type="checkbox"
                  id={bhk_type}
                  name={bhk_type}
                  value={bhk_type}
                  onChange={(event) => handleBhkTypeChange(event, bhk_type)}
                />
                <label
                  className={`${styles.input_label1} m-1`}
                  htmlFor={bhk_type}
                  role="button"
                >
                  {bhk_type}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="input-group d-flex flex-column mt-2 pt-1 border-bottom border-1 border-dark">
          <h6 className="text-start">Preferred Tenant</h6>
          <div className="d-flex pb-2 flex-row justify-content-between align-items-center text-start">
            {PREFERRED_TENANTS.map((preferred_tenant) => (
              <div
                key={preferred_tenant}
                className="form-check flex-grow-1 form-check-inline"
              >
                <input
                  className={`${styles.input_checkbox1}`}
                  type="checkbox"
                  id={preferred_tenant}
                  name={preferred_tenant}
                  value={preferred_tenant}
                  onChange={(event) =>
                    handlePreferredTenantsChange(event, preferred_tenant)
                  }
                />
                <label
                  className={`${styles.filterOption} ${styles.input_label1} m-1 `}
                  htmlFor={preferred_tenant}
                  role="button"
                >
                  {preferred_tenant}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="input-group d-flex flex-column mt-2 pt-1 border-bottom border-1 border-dark">
          <div className="flex-grow-1 mb-0">
            <label htmlFor="price" className="form-label w-100 text-start">
              <h6 className="w-100 mb-0">
                Rent Range ₹ {`${price[0]} to ₹ ${price[1]}`}
              </h6>
            </label>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={100000}
              // getAriaValueText={valuetext}
            />
          </div>
        </div>
        <div className="input-group d-flex flex-column mt-2 pt-1 border-bottom border-1 border-dark">
          <h6 className="text-start">Furnishing</h6>
          <div className="d-flex pb-2 flex-row justify-content-between align-items-center text-start">
            {FURNISHING_TYPES.map((furnishing_type) => (
              <div
                key={furnishing_type}
                className="form-check flex-grow-1 form-check-inline"
              >
                <input
                  className={`${styles.input_checkbox1}`}
                  type="checkbox"
                  id={furnishing_type}
                  name={furnishing_type}
                  value={furnishing_type}
                  onChange={(event) =>
                    handleFurnishingChange(event, furnishing_type)
                  }
                />
                <label
                  className={`${styles.filterOption} ${styles.input_label1} m-2`}
                  htmlFor={furnishing_type}
                  role="button"
                >
                  {furnishing_type}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="input-group d-flex flex-column mt-2 pt-1 border-bottom border-1 border-dark">
          <h6 className="text-start">Parking</h6>
          <div className="d-flex pb-2 flex-row justify-content-between align-items-center text-start">
            {PARKING.map((parking) => (
              <div
                key={parking.dbName}
                className="form-check flex-grow-1 form-check-inline"
              >
                <input
                  className={`${styles.input_checkbox1}`}
                  type="checkbox"
                  id={parking.dbName}
                  value={parking.dbName}
                  name={parking.dbName}
                  onChange={(event) =>
                    handleParkingChange(event, parking.dbName)
                  }
                />
                <label
                  className={`${styles.filterOption} ${styles.input_label1} m-1`}
                  htmlFor={parking.dbName}
                  role="button"
                >
                  {parking.viewName}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="input-group d-flex flex-column mt-2 pt-1 border-bottom border-1 border-dark">
          <h6 className="text-start">Show Only</h6>
          <div className="d-flex pb-2 flex-row justify-content-between align-items-center text-start">
            <div className="form-check flex-grow-1 form-check-inline">
              <input
                className={`${styles.input_checkbox1}`}
                type="checkbox"
                id="withImage"
                name="withImage"
                value="withImage"
                onChange={(event) => setWithImage(event.target.checked)}
              />
              <label
                className={`${styles.filterOption} ${styles.input_label1} m-1`}
                htmlFor="withImage"
                role="button"
              >
                With Image
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HouseFilters;
