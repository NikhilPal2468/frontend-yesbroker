import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const MapContainer = (props) => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  console.log(props);

  const center = {
    lat: parseFloat(props.latt) || 37.7749,
    lng: parseFloat(props.langg) || -122.4194,
  };
  console.log(center);
  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={16} center={center}>
      <Marker position={center}></Marker>
    </GoogleMap>
  );
};

export default MapContainer;
