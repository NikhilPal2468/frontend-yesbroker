import React from "react";
import SideBar from "../SideBar";
import styles from "../styles.module.css";

function ProfilePage() {
  const user = {
    name: "Aryan",
    email: "aryan@gmail.com",
    mobile: "35584654566",
    isVerified: false,
  };

  return (
    <div>
      <div className="row">
        <div className="col-12 col-lg-3">
          <SideBar />
        </div>
        <div className="col-12 col-lg-9">
          <div className="container">
            <p className="fw-bold border-bottom py-4">Edit Your Profile</p>
            <form>
              <div className="row gap-4 p-2 m-2">
                <p className="col">Name</p>
                <input type="text" value={user.name} className="col" />
              </div>
              <div className="row gap-4 p-2 m-2">
                <p className="col">Email Address</p>
                <input
                  type="email"
                  value={user.email}
                  className="col"
                  disabled
                />
              </div>
              <div className="row gap-4 p-2 m-2">
                <p className="col">Phone No.</p>
                <input
                  type="tel"
                  value={user.mobile}
                  className="col"
                  disabled
                />
              </div>
              <button className={`rounded mt-4`}>Save Profile</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
