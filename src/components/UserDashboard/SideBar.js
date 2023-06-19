import React from "react";
import styles from "./styles.module.css";
import { Link, useLocation } from "react-router-dom";

function SideBar() {
  let location = useLocation();
  const linkClasses = (type = null) => {
    let classes = `${styles.linkStyle} mb-1 w-100 px-5 py-2`;

    if (type === location.pathname) {
      classes += ` ${styles.active}`;
    }

    return classes;
  };

  const urls = {
    profile: "/user/myprofile",
    listedHouses: "/user/mylistings/houses",
    listedPgs: "/user/mylistings/pgs",
    ownersContacted: "/user/ownerscontacted",
    shortlistHouses: "/user/myshortlists/houses",
    shortlistPgs: "/user/myshortlists/pgs",
  };

  return (
    <div className={`d-flex flex-column text-start gap-2 rounded px-4`}>
      <p className={`fw-bold w-100 border-bottom py-4 px-2`}>
        Manage Your Account
      </p>
      <div className="d-flex flex-column py-2">
        <Link to={urls.profile} className={linkClasses(urls.profile)}>
          My Profile
        </Link>
        <Link
          to={urls.listedHouses}
          className={`${linkClasses(urls.listedHouses)} ${linkClasses(
            urls.listedPgs
          )}`}
        >
          My Properties
        </Link>

        <Link
          to={urls.shortlistHouses}
          className={`${linkClasses(urls.shortlistHouses)} ${linkClasses(
            urls.shortlistPgs
          )}`}
        >
          My Shortlists
        </Link>
        <Link
          to={urls.ownersContacted}
          className={linkClasses(urls.ownersContacted)}
        >
          Owners Contacted
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
