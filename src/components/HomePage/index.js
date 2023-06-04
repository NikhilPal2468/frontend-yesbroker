import React, { useEffect, useState } from "react";
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
import {
  BHKTypes,
  CITIES,
  MenuProps,
  RoomTypesFlat,
  RoomTypesPG,
  TenantTypes,
} from "../constants";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Chip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("Bangalore");
  const [searchValue, setSearchValue] = useState("");
  const [propertyType, setPropertyType] = useState("house");
  const [suggestionList, setSuggestionList] = useState([]);
  const [selectedLocality, setSelectedLocality] = useState([]);

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

  useEffect(() => {
    const autoCompleteApi = async () => {
      // if (searchValue)
      await axios
        .get(
          `/public/api/autocomplete?city=${selectedCity}&text=${searchValue}`
        )
        .then((response) => {
          setSuggestionList(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    autoCompleteApi();
  }, [searchValue, selectedCity]);

  const autoCompleteLocalities = (e) => {
    setSearchValue(e.target.value);
  };

  const addLocality = (place) => {
    const checker = selectedLocality.some(
      (locality) => locality.place_id === place.place_id
    );

    if (checker === false) {
      setSelectedLocality([...selectedLocality, place]);
      setSuggestionList([]);
      setSearchValue("");
    } else {
      toast.error("Locality already selected", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const listProperties = () => {
    navigate(`/properties`);
  };
  const removeChip = (place_id) => {
    setSelectedLocality((prevChips) =>
      prevChips.filter((chip) => chip.place_id !== place_id)
    );
  };
  return (
    <div className={styles.homepage}>
      <ToastContainer />
      <div className={styles.homepage_heading}>
        World&apos;s Largest Brokerage Property Site
      </div>
      <div
        className={`${styles.input_group} d-flex flex-column justify-content-center align-items-center`}
      >
        <InputGroup
          className={`w-75 rounded-top d-flex flex-column flex-sm-row flex-xs-row `}
        >
          <DropdownButton
            variant="outline-primary"
            title={selectedCity}
            id="input-group-dropdown"
            className="outline-none"
          >
            {CITIES.map((city) => (
              <Dropdown.Item
                key={city}
                onClick={() => {
                  setSelectedCity(city);
                }}
                href="#"
              >
                {city}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <input
            type="text"
            className={`shadow-none form-control ${styles.custom_width} ${styles.input_group_bs}`}
            aria-label="Text input with dropdown button"
            value={searchValue}
            onChange={autoCompleteLocalities}
            disabled={selectedLocality.length >= 3}
            placeholder={
              selectedLocality.length >= 3
                ? "you can add upto 3 localities for search"
                : "search locality..."
            }
          />
          <Button
            className="d-flex flex-row justify-content-center align-items-center gap-2"
            disabled={selectedLocality.length === 0}
            onClick={listProperties}
          >
            <BsSearch />
            <p className="my-auto">Search</p>
          </Button>
        </InputGroup>
        <div className={styles.chip_container}>
          {selectedLocality.map(({ place_id = "", terms = [] }) => {
            const [chip_text] = terms;
            const { value: chip_text_value } = chip_text;
            return (
              <Chip
                key={place_id}
                label={chip_text_value}
                variant="outlined"
                onDelete={() => {
                  removeChip(place_id);
                }}
                className={styles.chips}
              />
            );
          })}
        </div>
        <div
          className={`${styles.autocomplete_dropdown_container} ${
            suggestionList.length === 0 ? styles.remove_dropdown_container : ""
          }`}
        >
          {suggestionList.map((place) => (
            <div
              key={place?.place_id}
              className={styles.suggestion_item}
              onClick={() => addLocality(place)}
              role="option"
            >
              {place?.description}
            </div>
          ))}
        </div>
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
      <div className={styles.property_owner}>Are you a Property Owner?</div>
      <Link to="/list-your-property-for-rent">
        <Button>Post your property</Button>
      </Link>
    </div>
  );
};

export default HomePage;
