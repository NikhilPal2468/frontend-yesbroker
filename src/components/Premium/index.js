import React from "react";
import styles from "./styles.module.css";

const Premium = () => {
  return (
    <div className={styles.pricingPage}>
      <h1>Pricing</h1>
      <div className={styles.plansContainer}>
        <div className={styles.plan}>
          <h2>Basic</h2>
          <div className={styles.planDetails}>
            <p>Price: $9.99/month</p>
            <p>Access to basic features</p>
            <p>Limited support</p>
          </div>
          <button className={styles.planButton}>Choose Plan</button>
        </div>
        <div className={styles.plan}>
          <h2>Standard</h2>
          <div className={styles.planDetails}>
            <p>Price: $19.99/month</p>
            <p>Access to advanced features</p>
            <p>Priority support</p>
          </div>
          <button className={styles.planButton}>Choose Plan</button>
        </div>
        <div className={styles.plan}>
          <h2>Premium</h2>
          <div className={styles.planDetails}>
            <p>Price: $29.99/month</p>
            <p>Access to all features</p>
            <p>24/7 premium support</p>
          </div>
          <button className={styles.planButton}>Choose Plan</button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
