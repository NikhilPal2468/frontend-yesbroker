import axios from "axios";
import React, { useEffect, useState } from "react";

const ManageProperties = () => {
  const [houses, setHouses] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/private/api/property`);
        console.log("data:", data);
        setHouses(data?.houses);
      } catch (e) {
        console.log(e?.response?.data?.message);
        // setErrMsg(e?.response?.data?.message);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container">
      {houses.map((house) => (
        <div key={house.id}>{house.id}</div>
      ))}
    </div>
  );
};

export default ManageProperties;
