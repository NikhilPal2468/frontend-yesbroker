import React from "react";
import { BsFillHouseFill, BsHouse } from "react-icons/bs";
import { IoLocationOutline, IoLocationSharp } from "react-icons/io5";
import { MdOutlineAddHomeWork, MdAddHomeWork } from "react-icons/md";
import { RiFridgeLine, RiFridgeFill } from "react-icons/ri";
import { RiGalleryLine, RiGalleryFill } from "react-icons/ri";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = ({ pathname, pgId, postPropertyPageNo }) => {
  const url1 = `/property/manage/pg/${pgId}/property`;
  const url2 = `/property/manage/pg/${pgId}/locality`;
  const url3 = `/property/manage/pg/${pgId}/rental`;
  const url4 = `/property/manage/pg/${pgId}/amenities`;
  const url5 = `/property/manage/pg/${pgId}/gallery`;

  const path = pathname.split("/");
  const navigate = useNavigate();
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

  const handleClick = (e, url, current) => {
    console.log(current, " ", postPropertyPageNo);

    if (parseInt(current) <= parseInt(postPropertyPageNo) + 1) {
      navigate(url);
    } else {
      e.preventDefault();
      toast.error("Please Fill current form first", {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
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
          role="button"
          onClick={(e) => handleClick(e, url1, 1)}
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
          role="button"
          onClick={(e) => handleClick(e, url2, 2)}
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
          role="button"
          onClick={(e) => handleClick(e, url3, 3)}
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
          role="button"
          onClick={(e) => handleClick(e, url4, 4)}
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
          role="button"
          onClick={(e) => handleClick(e, url5, 5)}
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
        <div
          className={`d-flex w-100 p-2 mx-2 py-4 `}
          role="button"
          onClick={(e) => handleClick(e, url5, 5)}
        >
          <div className={`${addIconSmall("gallery")} pb-2`}>
            {currentPath === "gallery" ? (
              <RiGalleryFill size={20} className={`${styles.icon}`} />
            ) : (
              <RiGalleryLine size={20} className={`${styles.icon}`} />
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Sidebar;
