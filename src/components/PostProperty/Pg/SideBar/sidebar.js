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
    let classVal = "";

    if (path === currentPath) {
      classVal += ` ${styles.activeBig}`;
    }

    return classVal;
  };

  const addIconClass2 = (path) => {
    console.log("path:", path);
    let classVal = "w-25";
    return classVal;
  };

  const addIconSmall = (path) => {
    let classVal = "w-100";

    if (path === currentPath) {
      classVal += ` ${styles.activeSmall}`;
    }

    return classVal;
  };

  return (
    <div>
      <div
        className={`flex-row flex-sm-column justify-content-center align-items-center text-center gap-4 mt-4 w-100 ${styles.showBig}`}
      >
        <div
          className={`d-flex flex-column flex-sm-row justify-content-center align-items-center w-100 p-2 pb-4 border-bottom ${addIconClass(
            "property"
          )}`}
        >
          <div className={`${addIconClass2("property")}`}>
            {currentPath === "property" ? (
              <BsFillHouseFill size={30} className={`${styles.icon}`} />
            ) : (
              <BsHouse size={30} className={`${styles.icon}`} />
            )}
          </div>
          <div className={`${addClass("property")}`}>PG Details</div>
        </div>
        <div
          className={`d-flex flex-column flex-sm-row justify-content-center align-items-center w-100 p-2 mx-2 py-4 border-bottom ${addIconClass(
            "locality"
          )}`}
        >
          <div className={`${addIconClass2("locality")}`}>
            {currentPath === "locality" ? (
              <IoLocationSharp size={30} className={`${styles.icon}`} />
            ) : (
              <IoLocationOutline size={30} className={`${styles.icon}`} />
            )}
          </div>
          <div className={`${addClass("locality")}`}>Locality Details</div>
        </div>
        <div
          className={`d-flex flex-column flex-sm-row justify-content-center align-items-center  w-100 p-2 mx-2 py-4 border-bottom ${addIconClass(
            "rental"
          )}`}
        >
          <div className={`${addIconClass2("rental")}`}>
            {currentPath === "rental" ? (
              <MdAddHomeWork size={30} className={`${styles.icon}`} />
            ) : (
              <MdOutlineAddHomeWork size={30} className={`${styles.icon}`} />
            )}
          </div>
          <div className={`${addClass("rental")}`}>Rental Details</div>
        </div>
        <div
          className={`d-flex flex-column flex-sm-row justify-content-center align-items-center  w-100 p-2 mx-2 py-4 border-bottom ${addIconClass(
            "amenities"
          )}`}
        >
          <div className={`${addIconClass2("amenities")}`}>
            {currentPath === "amenities" ? (
              <RiFridgeFill size={30} className={`${styles.icon}`} />
            ) : (
              <RiFridgeLine size={30} className={`${styles.icon}`} />
            )}
          </div>
          <div className={`${addClass("amenities")}`}>Amenities</div>
        </div>
        <div
          className={`d-flex flex-column flex-sm-row justify-content-center align-items-center w-100 p-2 mx-2 py-4 border-bottom ${addIconClass(
            "gallery"
          )}`}
        >
          <div className={`${addIconClass2("gallery")}`}>
            {currentPath === "gallery" ? (
              <RiGalleryFill size={30} className={`${styles.icon}`} />
            ) : (
              <RiGalleryLine size={30} className={`${styles.icon}`} />
            )}
          </div>
          <div className={`${addClass("gallery")}`}>Gallery</div>
        </div>
      </div>
      {/* small screen div */}
      <div
        className={`flex-row flex-sm-column justify-content-center align-items-center text-center gap-1 mt-4 w-100 border-bottom ${styles.showSmall}`}
      >
        <div className={`d-flex w-100 p-2 mx-2 py-4 `}>
          <div className={`${addIconSmall("property")} pb-2`}>
            {currentPath === "property" ? (
              <BsFillHouseFill size={20} className={`${styles.icon}`} />
            ) : (
              <BsHouse size={20} className={`${styles.icon}`} />
            )}
          </div>
        </div>
        <div className={`d-flex w-100 p-2 mx-2 py-4 `}>
          <div className={`${addIconSmall("locality")} pb-2`}>
            {currentPath === "locality" ? (
              <IoLocationSharp size={20} className={`${styles.icon}`} />
            ) : (
              <IoLocationOutline size={20} className={`${styles.icon}`} />
            )}
          </div>
        </div>
        <div className={`d-flex w-100 p-2 mx-2 py-4 `}>
          <div className={`${addIconSmall("rental")} pb-2`}>
            {currentPath === "rental" ? (
              <MdAddHomeWork size={20} className={`${styles.icon}`} />
            ) : (
              <MdOutlineAddHomeWork size={20} className={`${styles.icon}`} />
            )}
          </div>
        </div>
        <div className={`d-flex w-100 p-2 mx-2 py-4 `}>
          <div className={`${addIconSmall("amenities")} pb-2`}>
            {currentPath === "amenities" ? (
              <RiFridgeFill size={20} className={`${styles.icon}`} />
            ) : (
              <RiFridgeLine size={20} className={`${styles.icon}`} />
            )}
          </div>
        </div>
        <div className={`d-flex w-100 p-2 mx-2 py-4 `}>
          <div className={`${addIconSmall("gallery")} pb-2`}>
            {currentPath === "gallery" ? (
              <RiGalleryFill size={20} className={`${styles.icon}`} />
            ) : (
              <RiGalleryLine size={20} className={`${styles.icon}`} />
            )}
          </div>
        </div>
      </div>
      ;
    </div>
  );
}

export default sidebar;
