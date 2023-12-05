import React, { useEffect, useState, useRef } from "react";
import styles from "../styles.module.css";
import { Container, Modal, Button } from "react-bootstrap";
import axios from "axios";
import Invoice from "./Invoice";
import { useReactToPrint } from "react-to-print";

const TransactionReciept = ({
  showModal,
  setShowModal,
  orderId,
  userDetails,
}) => {
  const componentRef = useRef();
  const [printInvoice, setPrint] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleModalClose = () => {
    setShowModal(false);
  };
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [planDetails, setPlanDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/secure/api/paymentTransactionStatus?order_no=${orderId}`
        );
        const { status, planDetails } = data;
        console.log("data:", data);
        setPlanDetails(planDetails);
        setTransactionStatus(JSON.parse(status));
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
              <div>Payment Details</div>
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

            <div>
              <Button
                className="btn btn-primary"
                onClick={() => {
                  setPrint(true);
                  setTimeout(() => {
                    handlePrint();
                  }, 100);
                  setTimeout(() => {
                    setPrint(false);
                  }, 200);
                }}
              >
                Download Invoice
              </Button>
            </div>
          </div>
          <div
            ref={componentRef}
            className={styles.invoiceParentContainer}
            style={{ display: printInvoice === true ? "block" : "none" }}
          >
            <Invoice
              transactionData={transactionStatus}
              userDetails={userDetails}
              planDetails={planDetails}
            />
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default TransactionReciept;
