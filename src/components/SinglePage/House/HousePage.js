import React, { useEffect, useState, useContext } from "react";
import { GiHouse } from "react-icons/gi";
import PlaceGallery from "../PlaceGallery";
import styles from "./styles.module.css";
import { AMENITIES } from "../../constants";
import { useParams } from "react-router-dom";
import axios from "axios";
import MapContainer from "../../common/gMap";
import { LoadContext } from "../../../context/load-context";
import { CiPaperplane } from "react-icons/ci";

function HousePage({ userDetails = {} }) {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const { setLoading } = useContext(LoadContext);

  useEffect(() => {
    const fetchPropertyApi = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/public/api/getProperty/${id}`);
        setProperty(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchPropertyApi();
  }, [id]);

  if (property === null) return;
  return (
    <div className={`${styles.container}`}>
      <div className="d-flex flex-column flex-md-row w-100 card mb-4">
        <div className="d-flex flex-row border px-2 py-1 w-100 justify-content-around align-items-between text-center">
          <div className="p-2 border-end w-25">
            <GiHouse size={30} />
          </div>
          <div className="w-75 px-2 py-1">
            <h5 className="m-0">
              {property?.title
                ? property.title
                : `${property?.bhk_type} in ${property.locality?.slice(
                    0,
                    12
                  )}...`}
            </h5>
            <small>{property?.locality}</small>
          </div>
        </div>
        <div className="d-flex flex-row border px-2 py-1 w-100 justify-content-around align-items-center text-center">
          <div className="border-end px-2 py-1 w-100">
            <h5 className="m-0">₹{property?.rent}/M</h5>
            <small>
              {property?.rent_neogtiable === true
                ? "Negotiable"
                : "Non-negotiable"}
            </small>
          </div>
          <div className="border-end px-2 py-1 w-100">
            <h5 className="m-0">{property?.builtup_area}</h5>
            <small>Sq.ft.</small>
          </div>
          <div className=" px-2 py-1 w-100">
            <h5 className="m-0">₹{property?.deposit}/M</h5>
            <small>Deposit</small>
          </div>
        </div>
      </div>
      <div className="my-4">
        <PlaceGallery
          userDetails={userDetails}
          property={property}
          houses_id={property.houses_id}
        />
      </div>
      <div className={`mt-4 card p-2 m-2`}>
        <h5 className="fw-bold p-1">
          <u>Description</u>
        </h5>
        <p>
          {property?.description ||
            `${property.bhk_type} in ${property.locality} ${property.furnishing_type} @ ${property.rent}`}
        </p>
      </div>
      <div className={`mt-4 card p-2 m-2`}>
        <h5 className="fw-bold p-1">
          <u>Facilities</u>
        </h5>
        {/* <div className={`${styles.amenitiesContainer} text-center`}>
          {AMENITIES.map((cur) => {
            return property[cur.key] ? (
              <div className={`${styles.amenity}`}>
                <div>{cur.icon}</div>
                <div className="p-0.5">{cur.label}</div>
              </div>
            ) : (
              ""
            );
          })}
        </div> */}
        <div className={`${styles.amenitiesContainer} text-center`}>
          <div className={`row g-2 row-cols-lg-4 row-cols-md-3 row-cols-2`}>
            {AMENITIES.map((cur) => {
              const shouldDisplay = property[cur.key];
              return shouldDisplay ? (
                <div key={cur.key} className={`col-sm-6 col-md-4 col-lg-3`}>
                  <div className={`${styles.amenity}`}>
                    <div>{cur.icon}</div>
                    <div className="p-0.5">{cur.label}</div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
      <div className={`mt-4 card p-2 m-2`}>
        <h5 className="fw-bold p-1">
          <u>Details</u>
        </h5>
        <div className="d-flex flex-column flex-md-row w-100 align-items-center justify-content-center ps-2">
          <div className="w-100">
            <p className="d-flex gap-1">
              <div>{<CiPaperplane />}</div>
              <div className="fw-bold w-100">Floors:</div>
              <div className="w-100">{property.floor}</div>
            </p>
            <p className="d-flex gap-1">
              <div>{<CiPaperplane />}</div>
              <div className="fw-bold w-100">Total floors:</div>
              <div className="w-100">{property.total_floors}</div>
            </p>
            <p className="d-flex gap-1">
              <div>{<CiPaperplane />}</div>
              <div className="fw-bold w-100">Balcony:</div>
              <div className="w-100">
                {property.balcony_count ? property.balcony_count : "NA"}
              </div>
            </p>
            <p className="d-flex gap-1">
              <div>{<CiPaperplane />}</div>
              <div className="fw-bold w-100">Property Type:</div>
              <div className="w-100">
                {property.property_type ? property.property_type : "NA"}
              </div>
            </p>
          </div>
          <div className="w-100">
            <p className="d-flex gap-1">
              <div>{<CiPaperplane />}</div>
              <div className="fw-bold w-100">Water Supply:</div>
              <div className="w-100">{property.water_supply}</div>
            </p>
            <p className="d-flex gap-1">
              <div>{<CiPaperplane />}</div>
              <div className="fw-bold w-100">Monthly Maintenance:</div>
              <div className="w-100">{property.monthly_maintenance}</div>
            </p>
            {property?.lockin_period && (
              <p className="d-flex gap-1">
                <div>{<CiPaperplane />}</div>
                <div className="fw-bold w-100">Lockin Period:</div>
                <div className="w-100">{property.lockin_period}</div>
              </p>
            )}
            {property?.property_type === "Apartment" && (
              <p className="d-flex gap-1">
                <div>{<CiPaperplane />}</div>
                <div className="fw-bold w-100">Apartment name:</div>
                <div className="w-100">
                  {property?.apartment_name || "Not Provided"}
                </div>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 card p-2 m-2">
        {property && (
          <MapContainer latt={property.latitude} langg={property.longitude} />
        )}
      </div>
    </div>
  );
}

export default HousePage;
