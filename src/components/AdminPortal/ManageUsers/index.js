import React, { useEffect } from "react";

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
  return <div>ManageUsers</div>;
};

export default ManageUsers;
