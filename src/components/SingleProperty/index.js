import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import "bootstrap/dist/css/bootstrap.css";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import ChairIcon from "@mui/icons-material/Chair";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import {
  BsFillCheckSquareFill,
  BsBuildingsFill,
  BsPeopleFill,
} from "react-icons/bs";
import { BsFillXSquareFill } from "react-icons/bs";
import { GiGate } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
// import MyMapComponent from "../common/gMaps/index";

import { useParams } from "react-router-dom";
// import ContactUs from "../common/ContactUs/index";
// import Footer from "../common/LastFooter";
import axios from "axios";
function convertDateStringToFormattedDate(dateString) {
  const date = new Date().toISOString;
  const options = { day: "numeric", month: "long" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
}

const SingleProperty = () => {
  const { id } = useParams();

  const [property, setProperty] = useState({});

  useEffect(() => {
    const fetchPropertyApi = async () => {
      try {
        const response = await axios.get(`/public/api/getProperty/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPropertyApi();
  }, [id]);

  let { data } = property;

  return (
    <div className={styles.single_property}>
      <div className={styles.firstdiv}>
        <div className={styles.image_div}>
          <div
            id="carouselExampleInterval"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="10000">
                <img
                  src="https://images.unsplash.com/photo-1682687221248-3116ba6ab483?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                  className="d-block w-100"
                  alt="a"
                />
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img
                  src="https://images.unsplash.com/photo-1685950871149-b2cee6808f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                  className="d-block w-100"
                  alt="b"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=365&q=80"
                  className="d-block w-100"
                  alt="c"
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleInterval"
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

        <div className={styles.description_div}>
          <div className={styles.locality_div}>
            <h6>{data?.locality}</h6>
            <h2>
              {!data?.apartment_name ? "Apartment" : data?.apartment_name}
            </h2>
          </div>

          <div className={styles.details}>
            <div className={styles.details1}>
              <table>
                <tr>
                  <td>
                    {" "}
                    <ChairIcon fontSize="small" color="action" />
                    Furnishing Type
                  </td>
                  <td>
                    {!data?.furnishing_type
                      ? "Unfurnished"
                      : data?.furnishing_type}
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <BsBuildingsFill></BsBuildingsFill>Deposit
                  </td>
                  <td>
                    <FaRupeeSign />
                    {!data?.deposit ? "0" : data?.deposit}
                  </td>
                </tr>
                <tr>
                  <td>
                    <BsBuildingsFill></BsBuildingsFill>Beds
                  </td>
                  <td>{data?.bedrooms_count}</td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <DriveEtaIcon fontSize="small" color="action" />
                    Parking
                  </td>
                  <td> {data?.visitor_parking ? "Available" : "None"}</td>
                </tr>
              </table>
            </div>
            <div className={styles.details1}>
              <table>
                <tr>
                  <td>
                    <BsBuildingsFill></BsBuildingsFill>Size
                  </td>
                  <td>{data?.builtup_area}sqft</td>
                </tr>
                <tr>
                  <td>
                    <MdApartment />
                    Property Type
                  </td>
                  <td>{data?.apartment_type}</td>
                </tr>
                <tr>
                  <td>
                    <GiGate />
                    Facing
                  </td>
                  <td>{data?.facing}</td>
                </tr>
                <tr>
                  <td>
                    <BsPeopleFill />
                    Preferred Tenants
                  </td>
                  <td>{data?.preferred_tenants}</td>
                </tr>
              </table>
            </div>
          </div>

          <div className={styles.Footer}>
            <div>
              <p>Price</p>

              <h5>
                {" "}
                <FaRupeeSign /> {data?.rent}
              </h5>
            </div>
            <div className={styles.icons}>
              <a href="#">
                <FavoriteIcon fontSize="large" color="primary" />
              </a>
              <a href="#">
                <ShareIcon fontSize="large" color="primary" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={` ${styles.seconddiv}`}>
        <div className={styles.owner}>
          <h8>Agent/Owner</h8>
          <h6>Mark Duncan</h6>
        </div>
        <div className={styles.direction}>
          <a href="">Contact Us</a>
        </div>
        <div className={styles.direction}>
          <a href="">GET DIRECTION</a>
        </div>
      </div>
      <div className={` ${styles.thirddiv}`}>
        <div className={styles.thirdDivDetails}>
          <div>Property Details</div>
          <table>
            <tr></tr>
            <tr>
              <td>property_age</td>
              <td>{data?.property_age}</td>
            </tr>
            <tr>
              <td>Floor</td>
              <td>{data?.floor}</td>
            </tr>
            <tr>
              <td> Total Floors</td>
              <td>{data?.floors}</td>
            </tr>
            <tr>
              <td>Rent-negotiable</td>
              <td>{data?.rent_negotiable ? "True" : "False"}</td>
            </tr>
            <tr>
              <td>Available-from</td>
              <td>{convertDateStringToFormattedDate(data?.available_from)}</td>
            </tr>
          </table>
        </div>
        <div className={styles.thirdDivDetails}>
          <div>Exterior Details</div>
          <table>
            <tr></tr>
            <tr>
              <td>Gated-Security</td>
              <td>{data?.gated_security ? "True" : "False"}</td>
            </tr>
            <tr>
              <td>Balconi-count</td>
              <td>{data?.balcony_count}</td>
            </tr>
            <tr>
              <td>Gas-pipeline</td>
              <td>{data?.gas_pipeline ? "True" : "False"}</td>
            </tr>
            <tr>
              <td>power_backup</td>
              <td>{data?.power_backup ? "True" : "False"}</td>
            </tr>
            <tr>
              <td>Club-house</td>
              <td>{data?.club_house ? "True" : "False"}</td>
            </tr>
          </table>
        </div>
        <div className={styles.thirdDivDetails}>
          <div>Specific Details</div>
          <table>
            <tr></tr>
            <tr>
              <td>Lockin_period</td>
              <td>{data?.lockin_period ? data.lockin_period : "none"}</td>
            </tr>
            <tr>
              <td>Monthly_maintenance</td>
              <td>
                {data?.monthly_maintenance ? data.monthly_maintenance : "none"}
              </td>
            </tr>
            <tr>
              <td>Maintenance_amount</td>
              <td>
                <FaRupeeSign />
                {data?.maintenance_amount ? data.maintenance_amount : "none"}
              </td>
            </tr>
            <tr>
              <td>Water_supply</td>
              <td>{data?.water_supply ? data.water_supply : "none"}</td>
            </tr>
            <tr>
              <td>Apartment_type</td>
              <td>{data?.apartment_type ? data.apartment_type : "none"}</td>
            </tr>
          </table>
        </div>
      </div>
      <div className={` ${styles.fourthdiv}`}>
        <div className={` ${styles.about}`}>
          <div>
            <span className={styles.firstheading}>About</span>{" "}
            <span className={styles.secondheading}>Property</span>
          </div>
          <p>
            Between April and July 2014, FFB stadium received an upgrade to meet
            CONCACAF standards to hold international and club games. These
            upgrades which included installation of 1100 - 1600 lux stadium
            lights, a FIFA certified field with certified bleachers and sanitary
            facilities with team lockers, as well as a complete enhancement of
            existing buildings. These upgrades were possible thanks to two
            million dollar donation by FIFA. [1] However, in August 2014,
            CONCACAF ruled that the stadium did not meet standards to host
            matches in the 2014–15 CONCACAF Champions League.
          </p>
        </div>
        <div className={styles.advanced}>
          <span>
            Advanced <span className={styles.property}>Features</span>
          </span>

          <table>
            <tr>
              <td>
                {data?.ac ? <BsFillCheckSquareFill /> : <BsFillXSquareFill />}AC
              </td>
              <td>
                {data?.fridge ? (
                  <BsFillCheckSquareFill />
                ) : (
                  <BsFillXSquareFill />
                )}
                Fridge
              </td>
              <td>
                {data?.water_filter ? (
                  <BsFillCheckSquareFill />
                ) : (
                  <BsFillXSquareFill />
                )}
                water_filter
              </td>
              <td>
                {data?.washing_machine ? (
                  <BsFillCheckSquareFill />
                ) : (
                  <BsFillXSquareFill />
                )}{" "}
                Washing-machine
              </td>
              <td>
                {data?.swimming_pool ? (
                  <BsFillCheckSquareFill />
                ) : (
                  <BsFillXSquareFill />
                )}{" "}
                Swimming-Pool
              </td>
            </tr>
            <tr>
              <td>
                {data?.lift ? <BsFillCheckSquareFill /> : <BsFillXSquareFill />}{" "}
                Lift
              </td>
              <td>
                {data?.cctv ? <BsFillCheckSquareFill /> : <BsFillXSquareFill />}{" "}
                Cctv
              </td>
              <td>
                {data?.wifi ? <BsFillCheckSquareFill /> : <BsFillXSquareFill />}{" "}
                Wifi
              </td>
              <td>
                {data?.park ? <BsFillCheckSquareFill /> : <BsFillXSquareFill />}{" "}
                Park
              </td>
              <td>
                {data?.gym ? <BsFillCheckSquareFill /> : <BsFillXSquareFill />}{" "}
                Gym
              </td>
            </tr>
          </table>
        </div>
      </div>
      {/* <div className={` ${styles.fifthdiv}`}>
        <MyMapComponent latt={"17.9835"} langg={"79.5308"} />
      </div> */}
      {/* <div className={` ${styles.sixthdiv}`}>
        <ContactUs />
      </div> */}

      {/* <div className={` ${styles.seventhdiv}`}>
        <Footer></Footer>
      </div> */}
    </div>
  );
};

export default SingleProperty;
