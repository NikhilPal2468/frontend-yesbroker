import React from "react";
import styles from "./styles.module.css";

function Footer() {
  return (
    <div className={`${styles.container}`}>
      <div className={`text-center text-white ${styles.content}`}>
        &copy; HomeWale 2023
      </div>
    </div>
  );
}

export default Footer;
