import React, { useEffect } from "react";

import Heading from "../common/Heading";

const ManageUsers = () => {
  useEffect(() => {
    const fetchData = async () => {
      // try {
      //   const { data } = await axios.post(`/private/api/users`, { id });
      //   console.log("data:", data);
      //   // setHouses(data?.houses);
      // } catch (e) {
      //   console.log(e?.response?.data?.message);
      //   // setErrMsg(e?.response?.data?.message);
      // }
    };

    fetchData();
  }, []);
  return (
    <div className="container">
      <Heading />
      <h3>User Management</h3>
      <input
        className="form-control me-2 w-25"
        type="search"
        placeholder="Search users by email"
        aria-label="Search"
      />
    </div>
  );
};

export default ManageUsers;
