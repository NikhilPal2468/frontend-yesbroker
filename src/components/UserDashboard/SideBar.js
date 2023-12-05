import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function SideBar() {
  let location = useLocation();
  const linkClasses = (type = null) => {
    let classes = `${styles.linkStyle} mb-1 w-100 px-5 py-2`;

    if (type === location.pathname) {
      classes += ` ${styles.active}`;
    }

    return classes;
  };
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: transactions } = await axios.get(
          `/secure/api/getAllTransactionByUser`
        );
        setAllTransactions(transactions);
      } catch (e) {
        console.log(e?.response?.data?.message);
        // setErrMsg(e?.response?.data?.message);
      }
    };

    fetchData();
  }, []);

  const urls = {
    profile: "/user/myprofile",
    listedHouses: "/user/mylistings/house",
    listedPgs: "/user/mylistings/pg",
    ownersContacted: "/user/ownerscontacted",
    shortlistHouses: "/user/myshortlists/house",
    transactions: "/user/transactions",
    shortlistPgs: "/user/myshortlists/pg",
  };

  return (
    <div
      className={`d-flex flex-column text-start gap-2 rounded px-2 ${styles.sidebar}`}
    >
      <p className={`fw-bold w-100 border-bottom py-4 px-2`}>
        Manage Your Account
      </p>
      <div className="d-flex flex-column">
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
        {allTransactions && (
          <Link
            to={urls.transactions}
            className={`${linkClasses(urls.transactions)}`}
          >
            My Transactions
          </Link>
        )}
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
