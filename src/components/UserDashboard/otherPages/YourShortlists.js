import React from "react";
import SideBar from "../SideBar";

function YourShortlists() {
  return (
    <div>
      <div className="row">
        <div className="col-12 col-lg-3">
          <SideBar />
        </div>
        <div className="col-12 col-lg-9">
          <div className="container">
            <p className="fw-bold border-bottom py-4">My Shortlists</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourShortlists;
