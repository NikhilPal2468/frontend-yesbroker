import React from "react";
import { BsArrowCounterclockwise } from "react-icons/bs";
import styles from "./styles.module.css";

function PGFilters() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card p-2">
            <div className="d-flex flex-row justify-content-between align-items-center pb-2 border-bottom border-3 border-dark">
              <h5 className="card-title my-auto">Filters</h5>
              <p className="my-auto">
                <BsArrowCounterclockwise /> Reset
              </p>
            </div>
            <div className="card-body">
              <div className="input-group d-flex flex-column border-bottom border-1 border-dark">
                <h6 className="text-start">PG for</h6>
                <div className="grid pb-2 justify-content-between align-items-center text-start">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                    />
                    <label className="form-check-label" htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="any"
                      value="any"
                    />
                    <label className="form-check-label" htmlFor="any">
                      Anyone
                    </label>
                  </div>
                </div>
              </div>
              <div className="input-group d-flex flex-column mt-2 pt-1 border-bottom border-1 border-dark">
                <h6 className="text-start">Room Type</h6>
                <div className="grid pb-2 justify-content-between align-items-center text-start">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="single"
                      name="single"
                      value="single"
                    />
                    <label className={`form-check-label`} htmlFor="single">
                      Single Room
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="double"
                      value="double"
                      name="double"
                    />
                    <label className={`form-check-label `} htmlFor="double">
                      Double
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="triple"
                      value="triple"
                      name="triple"
                    />
                    <label className={`form-check-label `} htmlFor="triple">
                      Triple
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="four"
                      value="four"
                      name="four"
                    />
                    <label className={`form-check-label `} htmlFor="four">
                      Four
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
                <h6 className="text-start">Preferred for</h6>
                <div className="d-flex pb-2 flex-row justify-content-between align-items-center text-start">
                  <div className="form-check flex-grow-1 form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="student"
                      name="student"
                      value="student"
                    />
                    <label
                      className={`form-check-label ${styles.filterOption}`}
                      htmlFor="student"
                    >
                      Students
                    </label>
                  </div>
                  <div className="form-check flex-grow-1 form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="working"
                      value="working"
                      name="working"
                    />
                    <label
                      className={`form-check-label ${styles.filterOption}`}
                      htmlFor="working"
                    >
                      Professional
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
        <div className="col-12 col-md-6 col-lg-8"></div>
      </div>
    </div>
  );
}

export default PGFilters;
