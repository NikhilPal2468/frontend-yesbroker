import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button, Dropdown, DropdownButton, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const BHKTypes = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"];
const TenantTypes = ["Male", "Female", "Both"];
const RoomTypesPG = [
  "Single Room",
  "Double Sharing",
  "Triple Sharing",
  "Four Sharing",
];
const RoomTypesFlat = ["Single Room", "Shared Room"];

const HomePage = () => {
  const [selectedCity, setSelectedCity] = useState("Banglore");
  const [searchValue, setSearchValue] = useState("");
  const [propertyType, setPropertyType] = useState("house");

  const [bhkType, setbhkType] = useState([]);
  const [tenantTypes, setTenantTypes] = useState([]);
  const [roomTypesPG, setRoomTypesPG] = useState([]);
  const [roomTypesFlat, setRoomTypesFlat] = useState([]);

  const handleBHKChange = (event) => {
    const {
      target: { value },
    } = event;
    setbhkType(typeof value === "string" ? value.split(",") : value);
  };

  const handleTenantChange = (event) => {
    const {
      target: { value },
    } = event;
    setTenantTypes(typeof value === "string" ? value.split(",") : value);
  };

  const handleRoomTypeFlat = (event) => {
    const {
      target: { value },
    } = event;
    setRoomTypesFlat(typeof value === "string" ? value.split(",") : value);
  };

  const handleRoomTypePG = (event) => {
    const {
      target: { value },
    } = event;
    setRoomTypesPG(typeof value === "string" ? value.split(",") : value);
  };

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  return (
    <div className={styles.homepage}>
      <div className={styles.homepage_heading}>
        World&apos;s Largest Brokerage Property Site
      </div>
      <div
        className={`${styles.input_group} d-flex flex-column justify-content-center align-items-center`}
      >
        <InputGroup className="w-75 rounded-top d-flex flex-column flex-sm-row flex-xs-row">
          <DropdownButton
            variant="outline-primary"
            title={selectedCity}
            id="input-group-dropdown"
            className="outline-none"
          >
            <Dropdown.Item
              onClick={() => {
                setSelectedCity("Banglore");
              }}
              href="#"
            >
              Banglore
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setSelectedCity("Mumbai");
              }}
              href="#"
            >
              Mumbai
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setSelectedCity("Hyderabad");
              }}
              href="#"
            >
              Hyderabad
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setSelectedCity("Gurgaon");
              }}
              href="#"
            >
              Gurgaon
            </Dropdown.Item>
          </DropdownButton>
          <input
            type="text"
            className={`shadow-none form-control ${styles.custom_width}`}
            aria-label="Text input with dropdown button"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <Button className="d-flex flex-row justify-content-center align-items-center gap-2">
            <BsSearch />
            <p className="my-auto">Search</p>
          </Button>
        </InputGroup>
        <div
          className={`input-group p-2 w-75 row align-items-center rounded-bottom ${styles.filterGroup}`}
        >
          <div className="col-12 col-md-7">
            <div className="row">
              <div className="col-sm">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="property_type1"
                    id="property_type1"
                    value="house"
                    checked={propertyType === "house"}
                    onChange={handlePropertyTypeChange}
                  />
                  <label className="form-check-label" htmlFor="property_type1">
                    House
                  </label>
                </div>
              </div>
              <div className="col-sm">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="property_type2"
                    id="property_type2"
                    value="pg"
                    checked={propertyType === "pg"}
                    onChange={handlePropertyTypeChange}
                  />
                  <label className="form-check-label" htmlFor="property_type2">
                    PG/Hostel
                  </label>
                </div>
              </div>
              <div className="col-sm">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="property_type3"
                    id="property_type3"
                    value="flat"
                    checked={propertyType === "flat"}
                    onChange={handlePropertyTypeChange}
                  />
                  <label className="form-check-label" htmlFor="property_type3">
                    Flatmates
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5 gap-2 justify-content-center align-items-center">
            {propertyType === "house" ? (
              <FormControl fullWidth className={`${styles.selectForm}`}>
                <InputLabel id="demo-multiple-checkbox-label">
                  BHK Type
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={bhkType}
                  onChange={handleBHKChange}
                  input={<OutlinedInput label="BHK Type" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {BHKTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      <Checkbox checked={bhkType.indexOf(type) > -1} />
                      <ListItemText primary={type} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <div className="row">
                <div className="col-12 col-md-6">
                  <FormControl fullWidth className={`${styles.selectForm}`}>
                    <InputLabel id="demo-multiple-checkbox-label">
                      Tenant Type
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={tenantTypes}
                      onChange={handleTenantChange}
                      input={<OutlinedInput label="Tenant Type" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {TenantTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          <Checkbox checked={tenantTypes.indexOf(type) > -1} />
                          <ListItemText primary={type} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-12 col-md-6">
                  {propertyType === "pg" ? (
                    <FormControl fullWidth className={`${styles.selectForm}`}>
                      <InputLabel id="demo-multiple-checkbox-label">
                        Room Type
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={roomTypesPG}
                        onChange={handleRoomTypePG}
                        input={<OutlinedInput label="Room Type" />}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                      >
                        {RoomTypesPG.map((type) => (
                          <MenuItem key={type} value={type}>
                            <Checkbox
                              checked={roomTypesPG.indexOf(type) > -1}
                            />
                            <ListItemText primary={type} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <FormControl fullWidth className={`${styles.selectForm}`}>
                      <InputLabel id="demo-multiple-checkbox-label">
                        Room Type
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={roomTypesFlat}
                        onChange={handleRoomTypeFlat}
                        input={<OutlinedInput label="Flat Type" />}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                      >
                        {RoomTypesFlat.map((type) => (
                          <MenuItem key={type} value={type}>
                            <Checkbox
                              checked={roomTypesFlat.indexOf(type) > -1}
                            />
                            <ListItemText primary={type} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
