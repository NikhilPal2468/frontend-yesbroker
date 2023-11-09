import axios from "axios";
import React from "react";
import { BiCurrentLocation } from "react-icons/bi";
import styles from "./styles.module.css";

const LocateMeButton = ({ setLocality }) => {
  // const [address, setAddress] = useState(null);

  const handleLocateMe = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const { data } = await axios.get(
              `/public/api/getLocationByCoordinates?latitude=${latitude}&longitude=${longitude}`
            );
            console.log("data:", data);
            // setAddress(data.address[0]);
            setLocality(data.address[0]);
          } catch (e) {
            console.log(e);
          }
        },
        (error) => {
          alert("Error getting your location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div>
      <button className={styles.locateMeButton} onClick={handleLocateMe}>
        <BiCurrentLocation />{" "}
      </button>
      {/* {address && <p>Address: {address}</p>} */}
    </div>
  );
};

export default LocateMeButton;
