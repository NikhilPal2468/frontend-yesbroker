import React from "react";

import { BsArrowCounterclockwise } from "react-icons/bs";
import styles from "./styles.module.css";
import { Slider } from "@mui/material";
import { BHKTYPE, PREFERRED_TENANTS } from "./constants";

function HouseFilters() {
  const [price, setPrice] = React.useState([20, 37]);
  console.log("price:", price);

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };
  return (
    <div className="p-1 col-12 col-md-5 col-lg-4">
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
              {BHKTYPE.map((bhk_type) => (
                <div key={bhk_type} className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={bhk_type}
                    name={bhk_type}
                    value={bhk_type}
                    // onChange={}
                  />
                  <label className={`form-check-label`} htmlFor="1rk">
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
                    className="form-check-input"
                    type="checkbox"
                    id={preferred_tenant}
                    name={preferred_tenant}
                    value={preferred_tenant}
                  />
                  <label
                    className={`form-check-label ${styles.filterOption}`}
                    htmlFor={preferred_tenant}
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
                <h6 className="w-100 mb-0">Price</h6>
              </label>
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={price}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                // getAriaValueText={valuetext}
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
  );
}

export default HouseFilters;
