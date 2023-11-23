import React, { useEffect, useState } from "react";
import styles from "../styles.module.css";
import { Container, Modal } from "react-bootstrap";
import axios from "axios";

const TransactionModal = ({ showModal, setShowModal, orderId }) => {
  const handleModalClose = () => {
    setShowModal(false);
  };
  const [transactionStatus, setTransactionStatus] = useState(null);
  console.log("transactionStatus:", transactionStatus);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/secure/api/paymentTransactionStatus?order_no=${orderId}`
        );
        setTransactionStatus(JSON.parse(data));
      } catch (e) {
        console.log(e?.response?.data?.message);
        // setErrMsg(e?.response?.data?.message);
      }
    };

    fetchData();
  }, []);
  return (
    <Modal
      show={showModal}
      onHide={handleModalClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className={`${styles.modal}`}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Payment Details</Modal.Title>
      </Modal.Header>

      <Modal.Body className="show-grid">
        <Container className="text-center d-flex justify-content-center flex-column">
          <div className={`${styles.details_header}`}>
            <div>
              <img src="../images/logo1.svg" width={80} alt="" />
            </div>
            <h3>{transactionStatus?.order_status}</h3>
          </div>
          <div className={styles.details_container}>
            <div className={styles.details_div}>
              <div>Payent Details</div>
              <div>Tracking Id : {transactionStatus?.order_no}</div>
              <div>Amount: {transactionStatus?.order_amt}</div>
              <div>Payment Status: {transactionStatus?.order_status}</div>
              {/* <div>Payent Details</div> */}
            </div>
            <div className={styles.details_div}>
              <div>Transaction Details</div>
              <div>Tracking Id : {transactionStatus?.order_no}</div>
              <div>Amount: {transactionStatus?.order_amt}</div>
              <div>Payment Status: {transactionStatus?.order_status}</div>
            </div>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default TransactionModal;
