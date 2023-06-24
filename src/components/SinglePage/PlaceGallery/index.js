import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { RiHotelBedLine } from "react-icons/ri";
import {
  HiOutlineBuildingOffice,
  HiOutlineKey,
  HiOutlineCake,
} from "react-icons/hi2";
import { BsPerson } from "react-icons/bs";
import { GiHomeGarage } from "react-icons/gi";
import { TbSofa } from "react-icons/tb";
import { AiOutlineCompass } from "react-icons/ai";
import { Backdrop } from "@mui/material";
import OwnerModal from "../../ShowOwnerModal/OwnerModal";
import LikeHandler from "../../likeHandler";

import { AuthContext } from "../../../context/AuthContext";
import { useDispatch } from "react-redux";
import { LoadContext } from "../../../context/load-context";
import axios from "axios";
import { setUserDetails } from "../../../store/actions";
import noPhotoImg from "../../../assets/no-image.png";

const renderAge = (age) => {
  let propertyAge = "";

  switch (age) {
    case "Less than 1 year":
      propertyAge = "<1";
      break;
    case "Between 1 to 3 years":
      propertyAge = "1-3";
      break;
    case "Between 3 to 5 years":
      propertyAge = "3-5";
      break;
    case "Between 5 to 10 years":
      propertyAge = "5-10";
      break;
    case "Greater than 10 years":
      propertyAge = ">10";
      break;
    default:
      propertyAge = "Unknown";
      break;
  }

  return propertyAge;
};

const addImgCarousel = (idx) => {
  console.log(idx);

  let classname = "carousel-item w-100";

  if (idx === 0) {
    classname += " active";
  }

  console.log(classname);
  return classname;
};

const PlaceGallery = ({ userDetails, property, houses_id }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const dispatch = useDispatch();
  const { setLoading } = useContext(LoadContext);

  useEffect(() => {
    try {
      setLoading(true);
      const setData = async () => {
        const { data } = await axios.get("/secure/api/user/me");
        dispatch(setUserDetails(data));
        setLoading(false);
      };
      if (userDetails) {
        setData();
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }, []);

  const shortlistArray = [
    ...(userDetails ? userDetails.house_shortlists : []),
    ...(userDetails ? userDetails.pg_shortlists : []),
  ];

  const [showOwnersContacted, setShowOwnersContacted] = useState(false);
  const { setShowLogin } = useContext(AuthContext);
  const handleHouseClicked = () => {
    if (userDetails) setShowOwnersContacted(true);
    else setShowLogin(true);
  };

  const showImages = () => {
    if (property?.media?.length > 0) {
      setShowAllPhotos(true);
    }
  };

  // const handleLeftClick = () => {
  //   setMediaIndex((prevIndex) => {
  //     return prevIndex === 0 ? property.media.length - 1 : prevIndex - 1;
  //   });
  // };

  // const handleRightClick = () => {
  //   setMediaIndex((prevIndex) => {
  //     return prevIndex + 1 === property.media.length ? 0 : prevIndex + 1;
  //   });
  // };

  if (showAllPhotos) {
    return (
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "black", // Set the background color to black
        }}
        open={showAllPhotos}
      >
        {/* <div className="d-flex flex-column align-items-center w-100 h-100 text-center">
          <div className="d-flex w-100 justify-content-between align-items-center p-2 mt-0">
            <h4 className="text-xl mt-4">
              Photos of
              {property?.title
                ? property.title
                : ` ${property?.bhk_type} in ${property?.locality}`}
            </h4>
            <button
              onClick={() => setShowAllPhotos(false)}
              className={`${styles.button} fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black`}
            >
              X
            </button>
          </div>
          <div
            className={`d-flex w-100 h-100 justify-content-between align-items-center `}
          >
            <button
              className={`${styles.button} ms-0`}
              onClick={handleLeftClick}
            >
              <BsFillArrowLeftCircleFill size={20} color="white" />
            </button>
            <div className={`d-flex align-items-center ${styles.imageDiv}`}>
              <img
                src={property.media[mediaIndex].media_url}
                alt={property.media[mediaIndex].description}
                className={`${styles.singleImage}`}
              />
            </div>
            <button
              className={`${styles.button} me-0`}
              onClick={handleRightClick}
            >
              <BsFillArrowRightCircleFill size={20} color="white" />
            </button>
          </div>
          {property?.media?.length > 0 &&
            property?.media?.map(({ media_url, description }) => (
              <div key={description}>
                <Image src={media_url} alt="" />
              </div>
            ))}
        </div> */}
        <div className="d-flex flex-column align-items-center w-100 h-100 text-center">
          <div className="d-flex w-100 justify-content-between align-items-center p-2 mt-0">
            <h4 className="text-xl mt-4">
              Photos of
              {property?.title
                ? property.title
                : ` ${property?.bhk_type} in ${property?.locality}`}
            </h4>
            <button
              onClick={() => setShowAllPhotos(false)}
              className={`${styles.button} fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black`}
            >
              X
            </button>
          </div>
          <div id={houses_id} className="carousel slide w-75">
            <div
              className={`carousel-inner w-100 overflow-hidden ${styles.listImageDiv}`}
            >
              {property?.media.map(({ media_url, description }, index) => {
                return (
                  <div className={addImgCarousel(index)} key={media_url}>
                    <img
                      src={media_url}
                      className={`d-block w-100 ${styles.carouselImg}`}
                      alt="..."
                    />
                    <div className="">
                      <h5 className="text-light">{description}</h5>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              className="carousel-control-prev text-dark"
              type="button"
              data-bs-target={`#${houses_id}`}
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next text-dark"
              type="button"
              data-bs-target={`#${houses_id}`}
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </Backdrop>
    );
  }
  return (
    <div>
      <div className="d-flex flex-column flex-md-row gap-1">
        <div className={`${styles.imageContainer}`} role="button">
          <div className="d-flex w-100 h-100">
            {property?.media?.length ? (
              <>
                <div
                  className={`${styles.mainImageContainer} overflow-hidden`}
                  onClick={showImages}
                >
                  <img
                    src={
                      property?.media?.[0]
                        ? property.media[0].media_url
                        : "https://cdn.pixabay.com/photo/2019/08/22/15/21/modern-4423814_1280.png"
                    }
                    className={`img-fluid h-100 ${styles.image}`}
                    alt=""
                  />
                </div>
                <div className={`${styles.sideImageContainer}`}>
                  <div className="d-flex flex-column w-100 h-100">
                    <div
                      className={`h-100 ${styles.imageDiv1} overflow-hidden`}
                      onClick={showImages}
                    >
                      <img
                        src={
                          property?.media?.[1]
                            ? property.media[1].media_url
                            : "https://cdn.pixabay.com/photo/2019/08/22/15/21/modern-4423814_1280.png"
                        }
                        className={`img-fluid h-100 ${styles.image}`}
                        alt=""
                      />
                    </div>
                    <div
                      className={`h-100 ${styles.imageDiv2} overflow-hidden`}
                      onClick={showImages}
                    >
                      <img
                        src={
                          property?.media?.[2]
                            ? property.media[2].media_url
                            : "https://cdn.pixabay.com/photo/2019/08/22/15/21/modern-4423814_1280.png"
                        }
                        className={`img-fluid h-100 ${styles.image}`}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className={`${styles.noImageDiv}`}>
                <img
                  src={noPhotoImg}
                  className={`d-block w-100 ${styles.listImage}`}
                  alt="..."
                />
              </div>
            )}
          </div>
        </div>
        <div className={`${styles.amenityContainer} border`}>
          <div className="d-flex flex-column w-100 p-2">
            <div className="d-flex w-100 border">
              <div className="d-flex w-100 p-2 border-end">
                <div className="w-25">
                  <RiHotelBedLine size={20} />
                </div>
                <div className="w-75">
                  <p className="m-0">{property?.bhk_type?.split[0]} Bedroom</p>
                  <small>No. of Bedrooms</small>
                </div>
              </div>
              <div className="d-flex w-100 p-2">
                <div className="w-25">
                  <HiOutlineBuildingOffice size={20} />
                </div>
                <div className="w-75">
                  <p className="m-0">
                    {property?.property_type?.slice(0, 8) + "..."}
                  </p>
                  <small>Property Type</small>
                </div>
              </div>
            </div>
            <div className="d-flex w-100 border">
              <div className="d-flex w-100 p-2 border-end">
                <div className="w-25">
                  <BsPerson size={20} />
                </div>
                <div className="w-75">
                  <p className="m-0">{property?.preferred_tenants}</p>
                  <small>Preferred Tenant</small>
                </div>
              </div>
              <div className="d-flex w-100 p-2">
                <div className="w-25">
                  <HiOutlineKey size={20} />
                </div>
                <div className="w-75">
                  <p className="m-0">
                    {new Date(property?.available_from).toLocaleString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                  <small>Available From</small>
                </div>
              </div>
            </div>
            <div className="d-flex w-100 border">
              <div className="d-flex w-100 p-2 border-end">
                <div className="w-25">
                  <GiHomeGarage size={20} />
                </div>
                <div className="w-75">
                  <p className="m-0">{property?.parking}</p>
                  <small>Parking</small>
                </div>
              </div>
              <div className="d-flex w-100 p-2">
                <div className="w-25">
                  <HiOutlineCake size={20} />
                </div>
                <div className="w-75">
                  <p className="m-0">
                    {renderAge(property?.property_age)} years
                  </p>
                  <small>Age of Building</small>
                </div>
              </div>
            </div>
            <div className="d-flex w-100 border">
              <div className="d-flex w-100 p-2 border-end">
                <div className="w-25">
                  <TbSofa size={20} />
                </div>
                <div className="w-75">
                  <p className="m-0">{property?.furnishing_type}</p>
                  <small>Furnishing Type</small>
                </div>
              </div>
              <div className="d-flex w-100 p-2">
                <div className="w-25">
                  <AiOutlineCompass size={20} />
                </div>
                <div className="w-75">
                  <p className="m-0">
                    {property.facing ? property.facing : "NA"}
                  </p>
                  <small>Facing</small>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center w-100 mt-4 pt-4">
              {/* <button>Get Owner Details</button> */}
              <div
                className={`flex-grow-1 p-2 text-white text-center rounded ${styles.primary_color}`}
                role="button"
                onClick={() => {
                  handleHouseClicked();
                }}
              >
                Get Owner Details
              </div>
              <LikeHandler
                houses_id={property.houses_id}
                shortlisted={shortlistArray.includes(houses_id)}
                userDetails={userDetails}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        {showOwnersContacted && (
          <OwnerModal
            showOwnersContacted={showOwnersContacted}
            setShowOwnersContacted={setShowOwnersContacted}
            houseId={houses_id}
          />
        )}
      </div>
    </div>
  );
};

export default PlaceGallery;
