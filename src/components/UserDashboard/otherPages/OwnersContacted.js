import React from "react";
import SideBar from "../SideBar";
import styles from "../styles.module.css";
function OwnersContacted() {
  return (
    <div className={styles.container}>
      <SideBar />
      <div className={`${styles.sidebar_right}`}>
        <div className="container">
          <p className="fw-bold border-bottom py-4">Owners Contacted</p>
        </div>
      </div>
    </div>
  );
}

export default OwnersContacted;
