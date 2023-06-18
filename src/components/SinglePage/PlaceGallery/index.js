import React, { useState } from "react";
import { Image } from "react-bootstrap";
import styles from "./styles.module.css";
import { RiHotelBedLine } from "react-icons/ri";
import {
  HiOutlineBuildingOffice,
  HiOutlineKey,
  HiOutlineCake,
  HiHeart,
  HiOutlineHeart,
} from "react-icons/hi2";
import { BsPerson } from "react-icons/bs";
import { GiHomeGarage } from "react-icons/gi";
import { TbSofa } from "react-icons/tb";
import { AiOutlineCompass } from "react-icons/ai";

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
const PlaceGallery = ({ property }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleHouseClicked = () => {};
  const likeHandler = () => {
    setLiked((prev) => !prev);
  };

  console.log(property);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48">
              Photos of
              {property?.title
                ? property.title
                : `${property?.bhk_type} in ${property?.locality}`}
            </h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              Close photos
            </button>
          </div>
          {property?.media?.length > 0 &&
            property?.media?.map(({ media_url, description }) => (
              <div key={description}>
                <Image src={media_url} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <div className="d-flex flex-column flex-md-row gap-1">
        <div className={`${styles.imageContainer}`}>
          <div className="d-flex w-100 h-100">
            <div className={`${styles.mainImageContainer} overflow-hidden`}>
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
                <div className={`h-100 ${styles.imageDiv1} overflow-hidden`}>
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
                <div className={`h-100 ${styles.imageDiv2} overflow-hidden`}>
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
                  <p className="m-0">
                    {property?.bhk_type?.split(" ")[0]} Bedroom
                  </p>
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
              <div
                className={`p-1 rounded ms-2 ${styles.likeBorder}`}
                role="button"
                onClick={() => {
                  likeHandler();
                }}
              >
                {liked ? (
                  <HiHeart size={28} color="#6c63ff" />
                ) : (
                  <HiOutlineHeart size={28} color="#6c63ff" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceGallery;
