import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarBattery,
  faCompactDisc,
  faCouch,
  faDumbbell,
  faElevator,
  faFireExtinguisher,
  faGlassWaterDroplet,
  faHotTubPerson,
  faMaskVentilator,
  faPersonMilitaryPointing,
  faPersonSwimming,
  faPuzzlePiece,
  faShirt,
  faShop,
  faSquareParking,
  faSunPlantWilt,
  faTachographDigital,
  faToiletPortable,
  faTv,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";

export const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const BHKTypes = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"];
export const TenantTypes = ["Male", "Female", "Both"];
export const RoomTypesPG = [
  "Single Room",
  "Double Sharing",
  "Triple Sharing",
  "Four Sharing",
];
export const RoomTypesFlat = ["Single Room", "Shared Room"];

export const CITIES = ["Mumbai", "Bangalore", "Gurgaon", "Delhi", "Hyderabad"];

export const AMENITIES = [
  {
    key: "lift",
    icon: <FontAwesomeIcon icon={faElevator} size="xl" />,
    label: "Lift",
  },
  {
    key: "cctv",
    icon: <FontAwesomeIcon icon={faCompactDisc} size="xl" />,
    label: "CCTV",
  },
  {
    key: "fridge",
    icon: <FontAwesomeIcon icon={faToiletPortable} size="xl" />,
    label: "Fridge",
  },
  {
    key: "tv",
    icon: <FontAwesomeIcon icon={faTv} size="xl" />,
    label: "TV",
  },
  {
    key: "power_backup",
    icon: <FontAwesomeIcon icon={faCarBattery} size="xl" />,
    label: "Power Backup",
  },
  {
    key: "gas_pipeline",
    icon: <FontAwesomeIcon icon={faMaskVentilator} size="xl" />,
    label: "Gas Pipeline",
  },
  {
    key: "fire_safety",
    icon: <FontAwesomeIcon icon={faFireExtinguisher} size="xl" />,
    label: "Fire Security",
  },
  {
    key: "club_house",
    icon: <FontAwesomeIcon icon={faPuzzlePiece} size="xl" />,
    label: "Club House",
  },
  {
    key: "wifi",
    icon: <FontAwesomeIcon icon={faWifi} size="xl" />,
    label: "Wifi",
  },
  {
    key: "park",
    icon: <FontAwesomeIcon icon={faSunPlantWilt} size="xl" />,
    label: "Park",
  },
  {
    key: "ac",
    icon: <FontAwesomeIcon icon={faTachographDigital} size="xl" />,
    label: "AC",
  },
  {
    key: "gym",
    icon: <FontAwesomeIcon icon={faDumbbell} size="xl" />,
    label: "Gym",
  },
  {
    key: "geyser",
    icon: <FontAwesomeIcon icon={faHotTubPerson} size="xl" />,
    label: "Geyser",
  },
  {
    key: "visitor_parking",
    icon: <FontAwesomeIcon icon={faSquareParking} size="xl" />,
    label: "Parking",
  },
  {
    key: "water_filter",
    icon: <FontAwesomeIcon icon={faGlassWaterDroplet} size="xl" />,
    label: "Water Filter",
  },
  {
    key: "furniture",
    icon: <FontAwesomeIcon icon={faCouch} size="xl" />,
    label: "Furniture",
  },
  {
    key: "swimming_pool",
    icon: <FontAwesomeIcon icon={faPersonSwimming} size="xl" />,
    label: "Swimming Pool",
  },
  {
    key: "shopping_center",
    icon: <FontAwesomeIcon icon={faShop} size="xl" />,
    label: "Shopping Center",
  },
  {
    key: "washing_machine",
    icon: <FontAwesomeIcon icon={faShirt} size="xl" />,
    label: "Washing Machine",
  },
  {
    key: "gated_security",
    icon: <FontAwesomeIcon icon={faPersonMilitaryPointing} size="xl" />,
    label: "Gated Security",
  },
];

export const PgAMENITIES = [
  {
    key: "lift",
    icon: <FontAwesomeIcon icon={faElevator} size="xl" />,
    label: "Lift",
  },
  {
    key: "induction",
    icon: <FontAwesomeIcon icon={faElevator} size="xl" />,
    label: "Induction",
  },
  {
    key: "cctv",
    icon: <FontAwesomeIcon icon={faCompactDisc} size="xl" />,
    label: "CCTV",
  },
  {
    key: "fridge",
    icon: <FontAwesomeIcon icon={faToiletPortable} size="xl" />,
    label: "Fridge",
  },
  {
    key: "tv",
    icon: <FontAwesomeIcon icon={faTv} size="xl" />,
    label: "TV",
  },
  {
    key: "power_backup",
    icon: <FontAwesomeIcon icon={faCarBattery} size="xl" />,
    label: "Power Backup",
  },
  {
    key: "gas_pipeline",
    icon: <FontAwesomeIcon icon={faMaskVentilator} size="xl" />,
    label: "Gas Pipeline",
  },
  {
    key: "fire_safety",
    icon: <FontAwesomeIcon icon={faFireExtinguisher} size="xl" />,
    label: "Fire Security",
  },
  {
    key: "club_house",
    icon: <FontAwesomeIcon icon={faPuzzlePiece} size="xl" />,
    label: "Club House",
  },
  {
    key: "wifi",
    icon: <FontAwesomeIcon icon={faWifi} size="xl" />,
    label: "Wifi",
  },
  {
    key: "ac",
    icon: <FontAwesomeIcon icon={faTachographDigital} size="xl" />,
    label: "AC",
  },
  {
    key: "gym",
    icon: <FontAwesomeIcon icon={faDumbbell} size="xl" />,
    label: "Gym",
  },
  {
    key: "geyser",
    icon: <FontAwesomeIcon icon={faHotTubPerson} size="xl" />,
    label: "Geyser",
  },
  {
    key: "visitor_parking",
    icon: <FontAwesomeIcon icon={faSquareParking} size="xl" />,
    label: "Parking",
  },
  {
    key: "water_filter",
    icon: <FontAwesomeIcon icon={faGlassWaterDroplet} size="xl" />,
    label: "Water Filter",
  },
  {
    key: "furniture",
    icon: <FontAwesomeIcon icon={faCouch} size="xl" />,
    label: "Furniture",
  },
  {
    key: "washing_machine",
    icon: <FontAwesomeIcon icon={faShirt} size="xl" />,
    label: "Washing Machine",
  },
  {
    key: "gated_security",
    icon: <FontAwesomeIcon icon={faPersonMilitaryPointing} size="xl" />,
    label: "Gated Security",
  },
];
