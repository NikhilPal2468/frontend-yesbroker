import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.css";

import success from "../../assets/success.png";
import failure from "../../assets/failure.png";

import axios from "axios";

function PaymentStatus() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedJsonData = queryParams.get("jsonData");

  const [decodedData, setDecodedData] = useState({});

  useEffect(() => {
    if (encodedJsonData) {
      try {
        // Decode the URL-encoded string
        const decodedString = decodeURIComponent(encodedJsonData);

        // Parse the JSON from the decoded string
        const jsonData = JSON.parse(decodedString);

        if (jsonData?.order_status === "Success") {
          const increaseContacts = async () => {
            await axios.patch("/secure/api/increase-contacts", {
              order_id: jsonData.order_id,
            });
          };

          increaseContacts();
        }
        // Set the parsed JSON data in the state
        setDecodedData(jsonData);
      } catch (error) {
        console.error("Error decoding or parsing JSON:", error);
      }
    }
  }, [encodedJsonData]);

  return (
    <div>
      <div className={`${styles.container}`}>
        <div>
          {decodedData?.order_status === "Success" ? (
            <div className={`${styles.status_container}`}>
              <img
                src={success}
                alt="payment success"
                className={`${styles.status_img}`}
              />
              <div>Payment Success</div>
            </div>
          ) : (
            <div className={`${styles.status_container}`}>
              <img
                src={failure}
                alt="payment failure"
                className={`${styles.status_img}`}
              />
              <div>Payment Failed</div>
            </div>
          )}
        </div>
        <div className={`${styles.status_content}`}>
          <div className={`${styles.status_data}`}>
            <p>Transaction Status</p>
            <p>{decodedData?.order_status}</p>
          </div>
          <div className={`${styles.status_data}`}>
            <p>Order Id</p>
            <p>{decodedData?.order_id}</p>
          </div>
          <div className={`${styles.status_data}`}>
            <p>Bank Reference No</p>
            <p>{decodedData?.bank_ref_no}</p>
          </div>
          <div className={`${styles.status_data}`}>
            <p>Transaction Date and Time</p>
            <p>{decodedData?.trans_date}</p>
          </div>
          <div className={`${styles.status_data}`}>
            <p>Card Name</p>
            <p>{decodedData.card_name}</p>
          </div>
          <div className={`${styles.status_data}`}>
            <p>Payment Mode</p>
            <p>{decodedData.payment_mode}</p>
          </div>
          <div className={`${styles.status_data}`}>
            <p>Payment Amount(Rs.)</p>
            <p>{decodedData.amount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentStatus;
