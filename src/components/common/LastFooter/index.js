import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import styles from "./styles.module.css";

const Footer = () => {
  return (
    <div className={styles.main}>
      <div>
        <FacebookIcon fontSize="large" color="primary" />
        <YouTubeIcon fontSize="large" color="primary" />
        <TwitterIcon fontSize="large" color="primary" />
        <GoogleIcon fontSize="large" color="primary" />
      </div>

      <div> All Rights Reserved ©2023</div>
    </div>
  );
};
export default Footer;
