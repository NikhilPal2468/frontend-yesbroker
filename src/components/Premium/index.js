import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const Premium = () => {
  return (
    <div className={styles.pricingPage}>
      <h1>Pricing</h1>
      <div className={styles.plansContainer}>
        <div className={styles.plan}>
          <h2>Basic</h2>
          <div className={styles.planDetails}>
            <p>Price: ₹599</p>
            <p>Number of Contacts upto 25</p>
            <p>Access to basic features</p>
            <p>Limited support</p>
          </div>
          <Link to="/payment?amount=599">
            <button className={styles.planButton}>Choose Plan</button>
          </Link>
        </div>
        <div className={styles.plan}>
          <h2>Standard</h2>
          <div className={styles.planDetails}>
            <p>Price: ₹999</p>
            <p>Number of Contacts upto 50</p>
            <p>Access to advanced features</p>
            <p>Priority support</p>
          </div>
          <Link to="/payment?amount=999">
            <button className={styles.planButton}>Choose Plan</button>
          </Link>
        </div>
        <div className={styles.plan}>
          <h2>Premium</h2>
          <div className={styles.planDetails}>
            <p>Price: ₹1599</p>
            <p>Number of Contacts upto 100</p>
            <p>Access to all features</p>
            <p>24/7 premium support</p>
          </div>
          <Link to="/payment?amount=1599">
            <button className={styles.planButton}>Choose Plan</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Premium;
