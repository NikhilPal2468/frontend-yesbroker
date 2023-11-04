import React from "react";
import { Link } from "react-router-dom";

const Heading = () => {
  return (
    <>
      <h1>Admin Portal</h1>
      <div>
        <Link to={`/admin`}>
          <button>Property Management</button>
        </Link>
        <Link to={`/admin/manageUsers`}>
          <button>User Management</button>
        </Link>
      </div>
    </>
  );
};

export default Heading;
