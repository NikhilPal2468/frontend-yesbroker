import React from "react";
import { BsArrowCounterclockwise } from "react-icons/bs";
import styles from "./styles.module.css";

function FlatFilters() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-5">
          <div className={`card p-2 ${styles.sticky_card}`}>
            <div className="d-flex flex-row justify-content-between align-items-center pb-2 border-bottom border-3 border-dark">
              <h5 className="card-title my-auto">Filters</h5>
              <p className="my-auto">
                <BsArrowCounterclockwise /> Reset
              </p>
            </div>
            <div className="card-body">
              <div className="input-group d-flex flex-column border-bottom border-1 border-dark">
                <h6 className="text-start">Room Type</h6>
                <div className="d-flex pb-2 flex-row justify-content-between align-items-center text-start">
                  <div className="form-check flex-grow-1 form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="shared"
                      name="shared"
                      value="Shared Room"
                    />
                    <label
                      className={`form-check-label ${styles.filterOption}`}
                      htmlFor="shared"
                    >
                      Shared Room
                    </label>
                  </div>
                  <div className="form-check flex-grow-1 form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="singleRoom"
                      value="Single Room"
                      name="singleRoom"
                    />
                    <label
                      className={`form-check-label ${styles.filterOption}`}
                      htmlFor="singleRoom"
                    >
                      Single Room
                    </label>
                  </div>
                </div>
              </div>
              <div className="input-group d-flex flex-column mt-2 pt-1 border-bottom border-1 border-dark">
                <h6 className="text-start">Tenant Type</h6>
                <div className="d-flex pb-2 flex-row justify-content-between align-items-center text-start">
                  <div className="form-check flex-grow-1 form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="male"
                      name="male"
                      value="male"
                    />
                    <label
                      className={`form-check-label ${styles.filterOption}`}
                      htmlFor="male"
                    >
                      Male
                    </label>
                  </div>
                  <div className="form-check flex-grow-1 form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="female"
                      value="female"
                      name="female"
                    />
                    <label
                      className={`form-check-label ${styles.filterOption}`}
                      htmlFor="female"
                    >
                      Female
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
        <div className="col-12 col-md-6 col-lg-7"></div>
      </div>
    </div>
  );
}

export default FlatFilters;
