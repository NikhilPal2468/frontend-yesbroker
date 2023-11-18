import React, { useContext } from "react";
import { BsArrowCounterclockwise } from "react-icons/bs";
import styles from "./styles.module.css";
import { LoadContext } from "../../../context/load-context";
import {
  FOOD_INCLUDED,
  GENDER,
  PREFERRED_TENANTS_PG,
  ROOM_TYPE,
} from "./constants";
import { Slider } from "@mui/material";

function PGFilters({
  setPreferredTenantsPG = () => {},
  price = [0, 100000],
  setPrice = () => {},
  setWithImage = () => {},
  setAttachedBathroom = () => {},

  selectedGender = null,
  setSelectedGender = () => {},
  setSingleRoom = () => {},
  setDoubleRoom = () => {},
  setTripleRoom = () => {},
  setFourRoom = () => {},
  setBreakfast = () => {},
  setLunch = () => {},
  setDinner = () => {},
}) {
  const { setReset } = useContext(LoadContext);

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };
  const handleGenderChange = (event, item) => {
    setSelectedGender(item);
  };
  const handlePreferredTenantsChange = (event, item) => {
    if (event.target.checked) {
      setPreferredTenantsPG((prev) => [...prev, item]);
    } else {
      setPreferredTenantsPG((prev) => prev.filter((i) => i !== item));
    }
  };
  const handleRoomTypeChange = (event, item) => {
    if (item === "single_room") {
      event.target.checked ? setSingleRoom(true) : setSingleRoom(false);
    } else if (item === "double_room") {
      event.target.checked ? setDoubleRoom(true) : setDoubleRoom(false);
    } else if (item === "triple_room") {
      event.target.checked ? setTripleRoom(true) : setTripleRoom(false);
    } else if (item === "four_room") {
      event.target.checked ? setFourRoom(true) : setFourRoom(false);
    }
  };

  const handleFoodChange = (event, item) => {
    if (item === "breakfast") {
      event.target.checked ? setBreakfast(true) : setBreakfast(false);
    } else if (item === "lunch") {
      event.target.checked ? setLunch(true) : setLunch(false);
    } else if (item === "dinner") {
      event.target.checked ? setDinner(true) : setDinner(false);
    }
  };

  const resetFilters = () => {
    setReset(true);
    setPreferredTenantsPG(["Both"]);
    setPrice([0, 500000]);

    setWithImage(false);
    setSelectedGender(null);
    setSingleRoom(false);
    setDoubleRoom(false);
    setTripleRoom(false);
    setFourRoom(false);
    setBreakfast(false);
    setLunch(false);
    setDinner(false);
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
        <div className="input-group d-flex flex-column mt-2 pt-1 border-bottom border-1 border-dark">
          <h6 className="text-start">PG for</h6>
          <div className="d-flex pb-2 flex-row justify-content-center align-items-center text-start">
            {GENDER.map((gender) => (
              <div
                key={gender}
                className="form-check form-check-inline text-center"
              >
                <input
                  className={`${styles.input_checkbox1}`}
                  type="radio"
                  id={gender}
                  name={gender}
                  value={gender}
                  checked={gender === selectedGender}
                  onChange={(event) => handleGenderChange(event, gender)}
                />
                <label
                  className={`${styles.input_label1} m-1`}
                  htmlFor={gender}
                  role="button"
                >
                  {gender}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="input-group d-flex flex-column mt-2 pt-1 border-bottom border-1 border-dark">
          <h6 className="text-start">Preferred For</h6>
          <div className="d-flex pb-2 flex-row justify-content-between align-items-center text-start">
            {PREFERRED_TENANTS_PG.map((preferred_tenant) => (
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
              max={500000}
              // getAriaValueText={valuetext}
            />
          </div>
        </div>
        <div className="input-group d-flex flex-column mt-2 pt-1 border-bottom border-1 border-dark">
          <h6 className="text-start">Room Type</h6>
          <div className="grid pb-2 mx-auto justify-content-between align-items-center text-start">
            {ROOM_TYPE.map((room_type) => (
              <div
                key={room_type.dbName}
                className="form-check flex-grow-1 form-check-inline"
              >
                <input
                  className={`${styles.input_checkbox1}`}
                  type="checkbox"
                  id={room_type.dbName}
                  name={room_type.dbName}
                  value={room_type.dbName}
                  onChange={(event) =>
                    handleRoomTypeChange(event, room_type.dbName)
                  }
                />
                <label
                  className={`${styles.filterOption} ${styles.input_label1} m-2`}
                  htmlFor={room_type.dbName}
                  role="button"
                >
                  {room_type.viewName}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="input-group d-flex flex-column mt-2 pt-1 border-bottom border-1 border-dark">
          <h6 className="text-start">Food Included</h6>
          <div className="d-flex pb-2 flex-row justify-content-between align-items-center text-start">
            {FOOD_INCLUDED.map((food) => (
              <div
                key={food.dbName}
                className="form-check flex-grow-1 form-check-inline"
              >
                <input
                  className={`${styles.input_checkbox1}`}
                  type="checkbox"
                  id={food.dbName}
                  value={food.dbName}
                  name={food.dbName}
                  onChange={(event) => handleFoodChange(event, food.dbName)}
                />
                <label
                  className={`${styles.filterOption} ${styles.input_label1} m-1`}
                  htmlFor={food.dbName}
                  role="button"
                >
                  {food.viewName}
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
            <div className="form-check flex-grow-1 form-check-inline">
              <input
                className={`${styles.input_checkbox1}`}
                type="checkbox"
                id="attachedBathroom"
                name="attachedBathroom"
                value="attachedBathroom"
                onChange={(event) => setAttachedBathroom(event.target.checked)}
              />
              <label
                className={`${styles.filterOption} ${styles.input_label1} m-1`}
                htmlFor="attachedBathroom"
                role="button"
              >
                Attached Bathroom
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PGFilters;
