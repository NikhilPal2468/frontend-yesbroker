import React, { useState } from "react";
import styles from "./styles.module.css";
import { Link, useLocation } from "react-router-dom";

function SideBar() {
  let location = useLocation();

  const [showProperties, setShowProperties] = useState(false);
  const [showShortlists, setShowShortlists] = useState(false);

  const linkClasses = (type = null) => {
    let classes = `${styles.linkStyle} mb-2 mx-2`;

    if (type === location.pathname) {
      classes += ` ${styles.active}`;
    }

    return classes;
  };

  const urls = {
    profile: "/user/myprofile",
    myListings: "/user/mylistings",
    listedHouses: "/user/mylistings/houses",
    listedPgs: "/user/mylistings/pgs",
    ownersContacted: "/user/ownerscontacted",
    myShortlists: "/user/myshortlists",
    shortlistHouses: "/user/myshortlists/houses",
    shortlistPgs: "/user/myshortlists/pgs",
  };

  return (
    <div
      className={`${styles.primary} d-flex flex-column text-start gap-2 rounded m-4 h-100`}
    >
      <p className={`fw-bold w-100 border-bottom py-4 px-2`}>
        <small>Manage Your Account</small>
      </p>
      <Link to={urls.profile} className={linkClasses(urls.profile)}>
        My Profile
      </Link>
      <Link
        className={`${showProperties ? `${styles.active}` : ""} ${linkClasses(
          urls.myListings
        )}`}
        onClick={() => {
          setShowProperties((prev) => !prev);
        }}
      >
        My Properties
      </Link>
      {showProperties && (
        <div className="d-flex flex-column">
          <Link
            to={urls.listedHouses}
            className={linkClasses(urls.listedHouses)}
          >
            Flats
          </Link>
          <Link to={urls.listedPgs} className={linkClasses(urls.listedPgs)}>
            PG
          </Link>
        </div>
      )}
      <Link
        to={urls.ownersContacted}
        className={linkClasses(urls.ownersContacted)}
      >
        Owners Contacted
      </Link>
      <Link
        className={linkClasses(urls.myShortlists)}
        onClick={() => {
          setShowShortlists((prev) => !prev);
        }}
      >
        My Shortlists
      </Link>
      {showShortlists && (
        <div className="d-flex flex-column">
          <Link
            to={urls.shortlistHouses}
            className={linkClasses(urls.shortlistHouses)}
          >
            House/Flat
          </Link>
          <Link
            to={urls.shortlistPgs}
            className={linkClasses(urls.shortlistPgs)}
          >
            PG/Hostel
          </Link>
        </div>
      )}
    </div>
  );
}

export default SideBar;
