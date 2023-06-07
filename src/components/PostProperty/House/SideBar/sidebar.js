import React from "react";
import { BsFillHouseFill, BsHouse } from "react-icons/bs";
import { IoLocationOutline, IoLocationSharp } from "react-icons/io5";
import { MdOutlineAddHomeWork, MdAddHomeWork } from "react-icons/md";
import { RiFridgeLine, RiFridgeFill } from "react-icons/ri";
import { RiGalleryLine, RiGalleryFill } from "react-icons/ri";
import styles from "./styles.module.css";

function sidebar({ pathname }) {
  const path = pathname.split("/");
  const currentPath = path[path.length - 1];

  const addClass = (path) => {
    let classVal = "w-75 text-start";

    if (path === currentPath) {
      classVal += " fw-bold";
    }

    return classVal;
  };

  const addIconClass = (path) => {
    let classVal = "w-25";

    if (path === currentPath) {
      classVal += ` ${styles.icon}`;
    }

    return classVal;
  };

  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center text-center gap-4 mt-4">
        <div className="d-flex flex-row justify-content-center align-items-center w-100 p-2 py-4 border-bottom">
          <div className={`${addIconClass("property")}`}>
            {currentPath === "property" ? (
              <BsFillHouseFill size={30} color="blue" />
            ) : (
              <BsHouse size={30} color="blue" />
            )}
          </div>
          <div className={`${addClass("property")}`}>Property Details</div>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center w-100 p-2 mx-2 py-4 border-bottom">
          <div className={`${addIconClass("locality")}`}>
            {currentPath === "locality" ? (
              <IoLocationSharp size={30} color="blue" />
            ) : (
              <IoLocationOutline size={30} color="blue" />
            )}
          </div>
          <div className={`${addClass("locality")}`}>Locality Details</div>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center  w-100 p-2 mx-2 py-4 border-bottom">
          <div className={`${addIconClass("rental")}`}>
            {currentPath === "rental" ? (
              <MdAddHomeWork size={30} color="blue" />
            ) : (
              <MdOutlineAddHomeWork size={30} color="blue" />
            )}
          </div>
          <div className={`${addClass("rental")}`}>Rental Details</div>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center  w-100 p-2 mx-2 py-4 border-bottom">
          <div className={`${addIconClass("amenities")}`}>
            {currentPath === "amenities" ? (
              <RiFridgeFill size={30} color="blue" />
            ) : (
              <RiFridgeLine size={30} color="blue" />
            )}
          </div>
          <div className={`${addClass("amenities")}`}>Amenities</div>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center w-100 p-2 mx-2 py-4 border-bottom">
          <div className={`${addIconClass("gallery")}`}>
            {currentPath === "gallery" ? (
              <RiGalleryFill size={30} color="blue" />
            ) : (
              <RiGalleryLine size={30} color="blue" />
            )}
          </div>
          <div className={`${addClass("gallery")}`}>Gallery</div>
        </div>
      </div>
    </div>
  );
}

export default sidebar;
