import axios from "axios";
import React, { useContext, useState } from "react";
import PaymentForm from "../PaymentForm";
import styles from "./styles.module.css";
import { RiSecurePaymentLine } from "react-icons/ri";

import { AuthContext } from "../../context/AuthContext";

const PaymentPage = ({ userDetails = {} }) => {
  const { setShowLogin } = useContext(AuthContext);
  const [formHtml, setFormHtml] = useState("");

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  // Extract the 'amount' parameter
  const amount = params.amount || 599;
  const onPayment = async (e) => {
    e.preventDefault();
    const id = userDetails?.id;
    if (id) {
      const timestamp = Date.now();
      const orderId = `${id.slice(0, 5)}-${timestamp}`;
      try {
        const { data } = await axios.post("/secure/api/payment", {
          data: {
            merchant_id: 2902324,
            order_id: orderId,
            amount: amount * 1.18,
            currency: `INR`,
            redirect_url: `https://homewale.com/api`,
            cancel_url: `https://homewale.com/api`,
            language: `EN`,
          },
        });
        // const { success = false } = data || {};
        console.log("data:", data);
        setFormHtml(data);
        // console.log("url:", url);
        // window.location.replace(url);
        // if (success === true) {
        //   console.log("success");
        // }
      } catch (e) {
        console.log(e);
      }
    } else {
      setShowLogin(true);
    }
  };
  return (
    <div>
      <div className="d-flex">
        <div className={styles.checkoutHeader}>
          <img src="/images/logo1.svg" alt="" />
          <div>
            <b>Secure Checkout</b>
          </div>
        </div>
        <div className={styles.checkoutHeaderRight}>
          <div>
            <b>100% Safe & Secure Payments</b>
            <RiSecurePaymentLine />
          </div>
        </div>
      </div>
      <div className={styles.checkoutContainer}>
        {/* <div className="d-flex">
          <div className={styles.checkoutHeader}>
            <img src="/images/logo1.svg" alt="" />
            <div>
              <b>Secure Checkout</b>
            </div>
          </div>
          <div className={styles.checkoutHeaderRight}>
            <div>
              <b>100% Safe & Secure Payments</b>
              <RiSecurePaymentLine />
            </div>
          </div>
        </div> */}
        <div className={styles.checkoutSection}>
          <h2>Plan Details</h2>
          <div className="d-flex justify-content-between w-50">
            <div>Total Amount:</div>
            <div>{amount}</div>
          </div>
          <div className="d-flex justify-content-between w-50">
            <div>GST:</div>
            <div>{(amount * 0.18).toFixed(2)}</div>
          </div>
          <div className="d-flex justify-content-between w-50">
            <div>Total Amount:</div>
            <div>{(amount * 1.18).toFixed(2)}</div>
          </div>
          {/* Order summary details */}
        </div>
        <div className={styles.checkoutFooter}>
          <button onClick={onPayment} className={styles.placeOrderButton}>
            Checkout
          </button>
        </div>
      </div>
      {/* <form method="POST" name="customerData" onSubmit={onPayment}>
        <table width="80%" height="100" border="1" align="center">
          <caption>
            <font size="4" color="blue">
              <b>Checkout</b>
            </font>
          </caption>
        </table>
      </form> */}
      <PaymentForm formHTML={formHtml} />
    </div>
  );
};

export default PaymentPage;
