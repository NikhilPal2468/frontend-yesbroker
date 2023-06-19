import React from "react";

import { BsArrowCounterclockwise } from "react-icons/bs";
import styles from "./styles.module.css";
import { Slider } from "@mui/material";
import { BHKTYPE, FURNISHING_TYPES, PREFERRED_TENANTS } from "./constants";

function HouseFilters({
  bhkType = [],
  setBhkType = () => {},
  setPreferredTenants = () => {},
  price = [],
  setPrice = () => {},
  setFurnishing = () => {},
  setTwoWheelerParking = () => {},
  setFourWheelerParking = () => {},
  setWithImage = () => {},
}) {
  console.log("bhkType:", bhkType);

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
  const resetFilters = () => {
    setBhkType([]);
    setPreferredTenants(["Both"]);
    setPrice([0, 100000]);
    setFurnishing([]);
    setTwoWheelerParking(false);
    setFourWheelerParking(false);
    setWithImage(false);
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false;
    });
  };
  return (
    <div className="p-1 col-12 col-md-5 col-lg-4">
      <div className={`card p-2 ${styles.sticky_card}`}>
        <div className="d-flex flex-row justify-content-between align-items-center pb-2 border-bottom border-3 border-dark">
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
                    className={`${styles.input_checkbox}`}
                    type="checkbox"
                    id={bhk_type}
                    name={bhk_type}
                    value={bhk_type}
                    onChange={(event) => handleBhkTypeChange(event, bhk_type)}
                  />
                  <label
                    className={`${styles.input_label} m-1`}
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
                    className={`${styles.input_checkbox}`}
                    type="checkbox"
                    id={preferred_tenant}
                    name={preferred_tenant}
                    value={preferred_tenant}
                    onChange={(event) =>
                      handlePreferredTenantsChange(event, preferred_tenant)
                    }
                  />
                  <label
                    className={`${styles.filterOption} ${styles.input_label} m-1`}
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
            <div className="grid pb-2 justify-content-between align-items-center text-start gap-2">
              {FURNISHING_TYPES.map((furnishing_type) => (
                <div
                  key={furnishing_type}
                  className="form-check flex-grow-1 form-check-inline gap-2"
                >
                  <input
                    className={`${styles.input_checkbox}`}
                    type="checkbox"
                    id={furnishing_type}
                    name={furnishing_type}
                    value={furnishing_type}
                    onChange={(event) =>
                      handleFurnishingChange(event, furnishing_type)
                    }
                  />
                  <label
                    className={`${styles.filterOption} ${styles.input_label} m-2`}
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
              <div className="form-check flex-grow-1 form-check-inline">
                <input
                  className={`${styles.input_checkbox}`}
                  type="checkbox"
                  id="twowheeler"
                  name="twowheeler"
                  value="twowheeler"
                  onChange={(event) =>
                    setTwoWheelerParking(event.target.checked)
                  }
                />
                <label
                  className={`${styles.filterOption} ${styles.input_label} m-1`}
                  htmlFor="twowheeler"
                  role="button"
                >
                  {" "}
                  2 Wheeler
                </label>
              </div>
              <div className="form-check flex-grow-1 form-check-inline">
                <input
                  className={`${styles.input_checkbox}`}
                  type="checkbox"
                  id="fourwheeler"
                  value="fourwheeler"
                  name="fourwheeler"
                  onChange={(event) =>
                    setFourWheelerParking(event.target.checked)
                  }
                />
                <label
                  className={`${styles.filterOption} ${styles.input_label} m-1`}
                  htmlFor="fourwheeler"
                  role="button"
                >
                  4 Wheeler
                </label>
              </div>
            </div>
          </div>
          <div className="input-group d-flex flex-column mt-2 pt-1 border-bottom border-1 border-dark">
            <h6 className="text-start">Show Only</h6>
            <div className="d-flex pb-2 flex-row justify-content-between align-items-center text-start">
              <div className="form-check flex-grow-1 form-check-inline">
                <input
                  className={`${styles.input_checkbox}`}
                  type="checkbox"
                  id="withImage"
                  name="withImage"
                  value="withImage"
                  onChange={(event) => setWithImage(event.target.checked)}
                />
                <label
                  className={`${styles.filterOption} ${styles.input_label} m-1`}
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
    </div>
  );
}

export default HouseFilters;
