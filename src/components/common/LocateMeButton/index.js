import React, { useState } from "react";

const LocateMeButton = () => {
  const [address, setAddress] = useState(null);

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.status === "OK") {
                setAddress(data.results[0].formatted_address);
              } else {
                setAddress("Address not found");
              }
            })
            .catch((error) => {
              console.error("Error fetching address:", error);
              setAddress("Error fetching address");
            });
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
      <button onClick={handleLocateMe}>Locate Me</button>
      {address && <p>Address: {address}</p>}
    </div>
  );
};

export default LocateMeButton;
