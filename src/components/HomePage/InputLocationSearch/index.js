import React, { useEffect } from "react";
import { Button, Dropdown, DropdownButton, InputGroup } from "react-bootstrap";
import styles from "../styles.module.css";
import { CITIES } from "../../constants";
import { BsSearch } from "react-icons/bs";
import { Chip } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import useDebounceQuery from "../../hooks/useDebounceQuery";
import axios from "axios";
const InputLocationSearch = ({
  selectedCity = "",
  setSelectedCity = () => {},
  selectedLocality = [],
  setSelectedLocality = () => {},
  suggestionList = [],
  setSuggestionList = () => {},
  searchValue = "",
  setSearchValue = () => {},
  propertyType = "",
}) => {
  const navigate = useNavigate();
  const { query = "", debounceQuery } = useDebounceQuery();
  useEffect(() => {
    const autoCompleteApi = async () => {
      // if (searchValue)
      await axios
        .get(`/public/api/autocomplete?city=${selectedCity}&text=${query}`)
        .then((response) => {
          setSuggestionList(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    autoCompleteApi();
  }, [query, selectedCity]);
  useEffect(() => {
    debounceQuery(searchValue);
  }, [debounceQuery, searchValue]);
  const autoCompleteLocalities = (e) => {
    setSearchValue(e.target.value);
  };

  const addLocality = async (place) => {
    const checker = selectedLocality.some(
      (locality) => locality.place_id === place.place_id
    );

    if (checker === false) {
      setSelectedLocality([...selectedLocality, place]);
      setSuggestionList([]);
      setSearchValue("");
      // await axios
      //   .get(`/public/api/nearbyLocalities?text=${place?.description}`)
      //   .then((response) => {
      //     setNearbyLocalities(response.data);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
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
    const localityArray = selectedLocality.map((loc) => loc.description);
    const combinedLocality = localityArray.join(", ");
    navigate(
      `/properties?city=${selectedCity}&propertyType=${propertyType}&locality=${combinedLocality}&selectedLocality=${encodeURIComponent(
        JSON.stringify(selectedLocality)
      )}`
    );
    setSelectedLocality([]);
  };
  const removeChip = (place_id) => {
    setSelectedLocality((prevChips) =>
      prevChips.filter((chip) => chip.place_id !== place_id)
    );
  };

  return (
    <>
      <InputGroup
        className={`rounded-top d-flex flex-column flex-sm-row flex-xs-row ${styles.input_group_div}`}
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
                setSelectedLocality([]);
                setSuggestionList([]);
                setSearchValue("");
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
          >
            {place?.description}
          </div>
        ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default InputLocationSearch;
