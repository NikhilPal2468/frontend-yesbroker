import React, { useEffect, useState, useContext } from "react";
import { GiHouse } from "react-icons/gi";
import PlaceGalleryPg from "../PlaceGalleryPg";
import styles from "./styles.module.css";
import { AMENITIES } from "../../constants";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import MapContainer from "../../common/gMap";
import { LoadContext } from "../../../context/load-context";
import { CiPaperplane } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { GiServerRack } from "react-icons/gi";
import { MdBathroom } from "react-icons/md";

function PgPage({ userDetails = {} }) {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const { setLoading } = useContext(LoadContext);

  useEffect(() => {
    const fetchPropertyApi = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/public/api/getPropertyPg/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyApi();
  }, [id]);

  if (property === null) return;

  console.log(property);

  const minRent = () => {
    let rent = 100000,
      deposit = 100000;

    if (property?.single_room && rent > property?.single_room_rent) {
      rent = property?.single_room_rent;
      deposit = property?.single_room_deposit;
    }

    if (property?.double_room && rent > property?.double_room_rent) {
      rent = property?.double_room_rent;
      deposit = property?.double_room_deposit;
    }

    if (property?.triple_room && rent > property?.triple_room_rent) {
      rent = property?.triple_room_rent;
      deposit = property?.triple_room_deposit;
    }

    if (property?.four_room && rent > property?.four_room_rent) {
      rent = property?.four_room_rent;
      deposit = property?.four_room_deposit;
    }

    return { rent, deposit };
  };

  return (
    <div className={`${styles.container}`}>
      <div className="d-flex flex-column flex-md-row w-100 card mb-4">
        <div className="d-flex flex-row border px-2 py-1 w-100 justify-content-around align-items-between text-center">
          <div className="p-2 border-end w-25">
            <Link to="/" style={{ textDecoration: "none" }}>
              <GiHouse size={30} color="black" />
            </Link>
          </div>
          <div className="w-75 px-2 py-1">
            <h5 className="m-0">
              {property?.title
                ? property?.title
                : `PG in ${property?.locality?.slice(0, 12)}...`}
            </h5>
            <small>{property?.locality}</small>
          </div>
        </div>
        <div className="d-flex flex-row border px-2 py-1 w-100 justify-content-around align-items-center text-center">
          <div className="border-end px-2 py-1 w-100">
            <h5 className="m-0">₹{minRent().rent}/M</h5>
          </div>

          <div className=" px-2 py-1 w-100">
            <h5 className="m-0">₹{minRent().deposit}/M</h5>
            <small>Deposit</small>
          </div>
        </div>
      </div>
      <div className="my-4">
        <PlaceGalleryPg
          userDetails={userDetails}
          property={property}
          propertyId={property?.pgs_id}
          propertyType={"pg"}
        />
      </div>
      {/* Single Room Details */}
      {property?.single_room && (
        <div className={`mt-4 card p-2 m-2`}>
          <div className="d-flex justify-content-center">
            <h5 className="fw-bold p-1 ml-4">
              <u>Single Sharing Room Details </u>
            </h5>
          </div>
          <div className="d-flex flex-row justify-content-between flex-md-row w-100 align-items-center justify-content-center ps-2">
            <div className="d-flex flex row">
              <h5> Rent For Single Occupancy</h5>{" "}
              <h5> ₹ {property?.single_room_rent}</h5>
            </div>

            <div className="d-flex flex row">
              <h5> Deposit For Single Occupancy</h5>{" "}
              <h5> ₹ {property?.single_room_deposit}</h5>
            </div>
          </div>
          <div className="d-flex flex-column flex-md-row w-100 align-items-center justify-content-center ps-2">
            <div className="w-100">
              <p className="d-flex gap-1">
                <div>{<GiServerRack />}</div>
                <div className="fw-bold w-100">CupBoard</div>
                <div className="w-100">
                  {property?.cupboard ? <FaCheckCircle /> : <ImCross />}
                </div>
              </p>
              <p className="d-flex gap-1">
                <div>{<PiTelevisionSimpleFill />}</div>
                <div className="fw-bold w-100">Tv</div>
                <div className="w-100">
                  {property?.tv ? <FaCheckCircle /> : <ImCross />}
                </div>
              </p>
              <p className="d-flex gap-1">
                <div>{<MdBathroom />}</div>
                <div className="fw-bold w-100"> Attached Bathroom</div>
                <div className="w-100">
                  {property?.attached_bathroom ? (
                    <FaCheckCircle />
                  ) : (
                    <ImCross />
                  )}
                </div>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Double Room Details */}
      {property?.double_room && (
        <div className={`mt-4 card p-2 m-2`}>
          <div className="d-flex justify-content-center">
            <h5 className="fw-bold p-1 ml-4">
              <u>Double Sharing Room Details </u>
            </h5>
          </div>
          <div className="d-flex flex-row justify-content-between flex-md-row w-100 align-items-center justify-content-center ps-2">
            <div d-flex flex row>
              <h5> Rent For Double Occupancy</h5>{" "}
              <h5> ₹ {property?.double_room_rent}</h5>
            </div>

            <div d-flex flex row>
              <h5> Deposit For Double Occupancy</h5>{" "}
              <h5> ₹ {property?.double_room_deposit}</h5>
            </div>
          </div>
          <div className="d-flex flex-column flex-md-row w-100 align-items-center justify-content-center ps-2">
            <div className="w-100">
              <p className="d-flex gap-1">
                <div>{<GiServerRack />}</div>
                <div className="fw-bold w-100">CupBoard</div>
                <div className="w-100">
                  {property?.cupboard ? <FaCheckCircle /> : <ImCross />}
                </div>
              </p>
              <p className="d-flex gap-1">
                <div>{<PiTelevisionSimpleFill />}</div>
                <div className="fw-bold w-100">Tv</div>
                <div className="w-100">
                  {property?.tv ? <FaCheckCircle /> : <ImCross />}
                </div>
              </p>
              <p className="d-flex gap-1">
                <div>{<MdBathroom />}</div>
                <div className="fw-bold w-100"> Attached Bathroom</div>
                <div className="w-100">
                  {property?.attached_bathroom ? (
                    <FaCheckCircle />
                  ) : (
                    <ImCross />
                  )}
                </div>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Triple Room Details */}
      {property?.triple_room && (
        <div className={`mt-4 card p-2 m-2`}>
          <div className="d-flex justify-content-center">
            <h5 className="fw-bold p-1 ml-4">
              <u>Triple Sharing Room Details </u>
            </h5>
          </div>
          <div className="d-flex flex-row justify-content-between flex-md-row w-100 align-items-center justify-content-center ps-2">
            <div d-flex flex row>
              <h5> Rent For Triple Occupancy</h5>{" "}
              <h5> ₹ {property?.triple_room_rent}</h5>
            </div>

            <div d-flex flex row>
              <h5> Deposit For Triple Occupancy</h5>{" "}
              <h5> ₹ {property?.triple_room_deposit}</h5>
            </div>
          </div>
          <div className="d-flex flex-column flex-md-row w-100 align-items-center justify-content-center ps-2">
            <div className="w-100">
              <p className="d-flex gap-1">
                <div>{<GiServerRack />}</div>
                <div className="fw-bold w-100">CupBoard</div>
                <div className="w-100">
                  {property?.cupboard ? <FaCheckCircle /> : <ImCross />}
                </div>
              </p>
              <p className="d-flex gap-1">
                <div>{<PiTelevisionSimpleFill />}</div>
                <div className="fw-bold w-100">Tv</div>
                <div className="w-100">
                  {property?.tv ? <FaCheckCircle /> : <ImCross />}
                </div>
              </p>
              <p className="d-flex gap-1">
                <div>{<MdBathroom />}</div>
                <div className="fw-bold w-100"> Attached Bathroom</div>
                <div className="w-100">
                  {property?.attached_bathroom ? (
                    <FaCheckCircle />
                  ) : (
                    <ImCross />
                  )}
                </div>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Four Room Details */}
      {property?.four_room && (
        <div className={`mt-4 card p-2 m-2`}>
          <div className="d-flex justify-content-center">
            <h5 className="fw-bold p-1 ml-4">
              <u>Triple Sharing Room Details </u>
            </h5>
          </div>
          <div className="d-flex flex-row justify-content-between flex-md-row w-100 align-items-center justify-content-center ps-2">
            <div d-flex flex row>
              <h5> Rent For Four Occupancy</h5>{" "}
              <h5> ₹ {property?.four_room_rent}</h5>
            </div>

            <div d-flex flex row>
              <h5> Deposit For Four Occupancy</h5>{" "}
              <h5> ₹ {property?.four_room_deposit}</h5>
            </div>
          </div>
          <div className="d-flex flex-column flex-md-row w-100 align-items-center justify-content-center ps-2">
            <div className="w-100">
              <p className="d-flex gap-1">
                <div>{<GiServerRack />}</div>
                <div className="fw-bold w-100">CupBoard</div>
                <div className="w-100">
                  {property?.cupboard ? <FaCheckCircle /> : <ImCross />}
                </div>
              </p>
              <p className="d-flex gap-1">
                <div>{<PiTelevisionSimpleFill />}</div>
                <div className="fw-bold w-100">Tv</div>
                <div className="w-100">
                  {property?.tv ? <FaCheckCircle /> : <ImCross />}
                </div>
              </p>
              <p className="d-flex gap-1">
                <div>{<MdBathroom />}</div>
                <div className="fw-bold w-100"> Attached Bathroom</div>
                <div className="w-100">
                  {property?.attached_bathroom ? (
                    <FaCheckCircle />
                  ) : (
                    <ImCross />
                  )}
                </div>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Details */}
      <div className={`mt-4 card p-2 m-2`}>
        <h5 className="fw-bold p-1">
          <u>Pg Rules</u>
        </h5>
        <div className="d-flex flex-column flex-md-row w-100 align-items-center justify-content-center ps-2">
          <div className="w-100">
            <p className="d-flex gap-1">
              <div>{<CiPaperplane />}</div>
              <div className="fw-bold w-100">Cooking Allowed</div>
              <div className="w-100">
                {property?.cooking_allowed ? <FaCheckCircle /> : <ImCross />}
              </div>
            </p>
            <p className="d-flex gap-1">
              <div>{<CiPaperplane />}</div>
              <div className="fw-bold w-100">Smoking Allowed</div>
              <div className="w-100">
                {property?.smoking ? <FaCheckCircle /> : <ImCross />}
              </div>
            </p>
            <p className="d-flex gap-1">
              <div>{<CiPaperplane />}</div>
              <div className="fw-bold w-100">Guardians Allowed</div>
              <div className="w-100">
                {property?.guardians_allowed ? <FaCheckCircle /> : <ImCross />}
              </div>
            </p>
            <p className="d-flex gap-1">
              <div>{<CiPaperplane />}</div>
              <div className="fw-bold w-100">Opposite Gender Allowed</div>
              <div className="w-100">
                {property?.opposite_gender ? <FaCheckCircle /> : <ImCross />}
              </div>
            </p>
          </div>
          <div className="w-100">
            <p className="d-flex gap-1">
              <div>{<CiPaperplane />}</div>
              <div className="fw-bold w-100">Drinking Allowed</div>
              <div className="w-100">
                {property?.drinking ? <FaCheckCircle /> : <ImCross />}
              </div>
            </p>
            <p className="d-flex gap-1">
              <div>{<CiPaperplane />}</div>
              <div className="fw-bold w-100">Non-Veg Allowed</div>
              <div className="w-100">
                {property?.nonveg ? <FaCheckCircle /> : <ImCross />}
              </div>
            </p>
          </div>
        </div>
      </div>

      {/* Facilities */}
      <div className={`mt-4 card p-2 m-2`}>
        <h5 className="fw-bold p-1">
          <u>Common Amenities</u>
        </h5>
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

      {/* Description */}
      <div className={`mt-4 card p-2 m-2`}>
        <h5 className="fw-bold p-1">
          <u>Description</u>
        </h5>
        <p>
          {property?.description ||
            `Luxorious Pg in ${property?.locality}  at just  ₹ ${
              minRent().rent
            }`}
        </p>
      </div>

      {/* Map */}
      <div className="mt-4 card p-2 m-2">
        {property && (
          <MapContainer latt={property?.latitude} langg={property?.longitude} />
        )}
      </div>
    </div>
  );
}

export default PgPage;
