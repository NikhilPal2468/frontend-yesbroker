import React, { useEffect, useState } from "react";
import styles from "../styles.module.css";
import { Container, Modal, Button } from "react-bootstrap";
import axios from "axios";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles1 = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  total: {
    marginTop: 10,
    fontSize: 16,
  },
  logo: {
    marginBottom: 10,
  },
  invoiceHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 50,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 50,
  },
  transactionId: {
    fontSize: 14,
    marginBottom: 10,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

const downloadLinkStyle = {
  textDecoration: "none",
  padding: "10px",
  backgroundColor: "#007BFF",
  color: "#fff",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "text-decoration 0.3s", // Add a smooth transition for better user experience
  ":hover": {
    textDecoration: "none", // Change the text decoration on hover
  },
};

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles1.page}>
      {/* Left Section (Billing Information) */}
      <View>
        <Text style={styles.companyName}>HOMEWALE</Text>
        <Text style={styles1.invoiceHeading}>Invoice</Text>
      </View>

      <View style={styles1.section}>
        <Text style={styles1.transactionId}>Transaction ID: 123456</Text>
      </View>

      {/* Right Section (Invoice Details) */}
      <View style={styles1.section}>
        <View style={styles1.item}>
          <Text>Item 1</Text>
          <Text>$50.00</Text>
        </View>
        <View style={styles1.item}>
          <Text>Item 2</Text>
          <Text>$30.00</Text>
        </View>
        <View style={styles1.total}>
          <Text style={styles1.amount}>Total: $80.00</Text>
        </View>
      </View>
    </Page>
  </Document>
);

function Download() {
  <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
    {({ blob, url, loading, error }) =>
      loading ? "Loading document..." : "Download Invoice"
    }
  </PDFDownloadLink>;
}

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
              {/* Use PDFDownloadLink to create a download link with custom styling */}
              <PDFDownloadLink document={<MyDocument />} fileName="invoice.pdf">
                {({ blob, url, loading, error }) =>
                  loading ? (
                    "Loading document..."
                  ) : (
                    <div style={downloadLinkStyle}>Download now!</div>
                  )
                }
              </PDFDownloadLink>
            </div>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default TransactionModal;
