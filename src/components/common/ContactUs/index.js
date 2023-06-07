import React from "react";
import styles from "./styles.module.css";
import { BsArrowUpRight } from "react-icons/bs";

const ContactUs = () => {
  return (
    <div className={styles.maindiv}>
      <div>
        <div className={styles.heading}>Contact Us</div>
        <table>
          <tr>
            <td>admin address</td>
          </tr>
          <tr>
            <td>tollfree number</td>
          </tr>
          email
        </table>
      </div>

      <div>
        <div className={styles.heading}>About Us</div>
        <table>
          <tr>
            <td>
              bhut bdhiya website hain bhut bdhiya website hain bhut bdhiya
              website hain bhut bdhiya website hain bhut bdhiya website hain
            </td>
          </tr>
          <tr>
            <td>
              <a href="#">
                Read More <BsArrowUpRight />
              </a>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default ContactUs;
