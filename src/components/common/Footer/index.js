import React from "react";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.iconContainer}`}>
        <div>
          <a
            href="https://www.facebook.com/homewale23"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} size="xl" color="white" />
          </a>
        </div>
        <div>
          <a
            href="https://twitter.com/homewale23"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} size="xl" color="white" />
          </a>
        </div>
        <div>
          <a
            href="https://www.instagram.com/homewale23/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} size="xl" color="white" />
          </a>
        </div>
      </div>
      <div className={`${styles.footerOptions}`}>
        <div>About Us</div>
        <div>Terms & Conditions</div>
        <div>Privacy Policy</div>
        <div>FAQs</div>
      </div>

      <div className={`text-center ${styles.content}`}>
        &copy; HomeWale 2023
      </div>
    </div>
  );
}

export default Footer;
