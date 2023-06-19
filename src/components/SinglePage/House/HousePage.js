import React, { useEffect, useState, useContext } from "react";
import { GiHouse } from "react-icons/gi";
import PlaceGallery from "../PlaceGallery";
import styles from "./styles.module.css";
import { AMENITIES } from "../../constants";
import { useParams } from "react-router-dom";
import axios from "axios";
import MapContainer from "../../common/gMap";
import { LoadContext } from "../../../context/load-context";

function HousePage() {
  const { id } = useParams();

  const [property, setProperty] = useState({});
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

  return (
    <div className={`${styles.container}`}>
      <div className="d-flex flex-column flex-md-row w-100 card">
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
              {property.rent_neogtiable === true
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
      <div className="mt-4">
        <PlaceGallery property={property} houses_id={property.houses_id} />
      </div>
      <div className="mt-4 card p-4">
        <h5>
          <u>Facilities</u>
        </h5>
        <div className="d-flex flex-wrap gap-4 m-2 align-items-center">
          {AMENITIES.map((cur) => {
            return property[cur.key] ? (
              <div className="px-2 py-1">
                {cur.icon}
                <span className="p-1">{cur.label}</span>
              </div>
            ) : (
              ""
            );
          })}
        </div>
      </div>
      <div className="mt-4 card p-4">
        <h5>
          <u>Details</u>
        </h5>
        <div className="d-flex flex-column flex-md-row w-100 align-items-center justify-content-center">
          <div className="w-100">
            <h6>Property Details</h6>
            <p>Floors: {property.floor}</p>
            <p>Total floors: {property.total_floors}</p>
            <p>
              Balcony: {property.balcony_count ? property.balcony_count : "NA"}
            </p>
          </div>
          <div className="w-100">
            <h6>Specific Details</h6>
            <p>Water Supply: {property.water_supply}</p>
            <p>Monthly Maintenance: {property.monthly_maintenance}</p>
            <p>
              Lockin Period:
              {property.lockin_period ? property.lockin_period : "NA"}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 card p-4">
        <h5>
          <u>Description</u>
        </h5>
        {property.property_type === "APARTMENT" ? property.apartment_name : ""}
        {property.location}
      </div>

      <div className="mt-4 card p-4">
        {property && (
          <MapContainer latt={property.latitude} langg={property.longitude} />
        )}
      </div>
    </div>
  );
}

export default HousePage;
