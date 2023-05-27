import React, { useState } from "react";
import styles from "./styles.module.css";
import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
} from "react-bootstrap";

const HomePage = () => {
  const [selectedCity, setSelectedCity] = useState("Banglore");
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className={styles.homepage}>
      <div className={styles.homepage_heading}>
        World&apos;s Largest Brokerage Property Site
      </div>
      <div className={styles.input_group}>
        <InputGroup className="mb-3 w-75 ">
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
          <Form.Control
            className="shadow-none"
            aria-label="Text input with dropdown button"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <Button>Search</Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default HomePage;
