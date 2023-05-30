import React, { useState } from "react";
import styles from "./styles.module.css";
import { Link, useLocation } from "react-router-dom";

function SideBar() {
  const [showProperties, setShowProperties] = useState(false);

  let location = useLocation();

  const linkClasses = (type = null) => {
    let classes = `${styles.linkStyle} mb-2 mx-2`;

    if (type === location.pathname) {
      classes += ` ${styles.active}`;
    }

    return classes;
  };

  const urls = {
    profile: "/user/myprofile",
    mylistings: "/user/mylistings",
    listedflats: "/user/mylistings/flats",
    listedpgs: "/user/mylistings/pgs",
    ownerscontacted: "/user/ownerscontacted",
    myshortlists: "/user/myshortlists",
  };

  return (
    <div className={`${styles.primary} d-flex flex-column text-start gap-2`}>
      <p className={`fw-bold w-100 border-bottom py-4 px-2`}>
        <small>Manage Your Account</small>
      </p>
      <Link to={urls.profile} className={linkClasses(urls.profile)}>
        My Profile
      </Link>
      <Link
        className={`${showProperties ? `${styles.active}` : ""} ${linkClasses(
          urls.mylistings
        )}`}
        onClick={() => {
          setShowProperties((prev) => !prev);
        }}
      >
        My Properties
      </Link>
      {showProperties && (
        <div className="d-flex flex-column">
          <Link to={urls.listedflats} className={linkClasses(urls.listedflats)}>
            Flats
          </Link>
          <Link to={urls.listedpgs} className={linkClasses(urls.listedpgs)}>
            PG
          </Link>
        </div>
      )}
      <Link
        to={urls.ownerscontacted}
        className={linkClasses(urls.ownerscontacted)}
      >
        Owners Contacted
      </Link>
      <Link to={urls.myshortlists} className={linkClasses(urls.myshortlists)}>
        My Shortlists
      </Link>
    </div>
  );
}

export default SideBar;
