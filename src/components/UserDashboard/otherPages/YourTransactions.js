import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import styles from "../styles.module.css";
import axios from "axios";
// import TransactionModal from "./TransactionModal";
import TransactionReciept from "./TransactionReciept";

const YourTransactions = ({ userDetails }) => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [showTransaction, setShowTransaction] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: transactions } = await axios.get(
          `/secure/api/getAllTransactionByUser`
        );
        setAllTransactions(transactions);
        console.log("data:", transactions);
      } catch (e) {
        console.log(e?.response?.data?.message);
        // setErrMsg(e?.response?.data?.message);
      }
    };

    fetchData();
  }, []);
  const showTransactionDetails = (order_id) => {
    setShowTransaction(true);
    setOrderId(order_id);
  };
  return (
    <div className={`${styles.container}`}>
      <SideBar />
      <div className={`${styles.sidebar_right}`}>
        <div className="container">
          <p className="fw-bold border-bottom py-4">My Shortlists</p>
        </div>

        <div className="row gap-4 py-2 my-2"></div>
        <div className={`container flex-column flex-md-row ${styles.cards}`}>
          <table border="1">
            <thead>
              <tr>
                <th className={styles.table_header}>Order Id</th>
                <th className={styles.table_header}>Date</th>
                <th className={styles.table_header}>Tracking ID</th>
                <th className={styles.table_header}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {allTransactions.map((transactions) => (
                <tr key={transactions.id}>
                  <td
                    className={`${styles.table_cell} ${styles.transaction}`}
                    onClick={() =>
                      showTransactionDetails(transactions?.order_id)
                    }
                  >
                    {transactions?.order_id}
                  </td>
                  <td className={styles.table_cell}>
                    {new Date(transactions?.payment_date).toLocaleString(
                      "en-US"
                    )}
                  </td>
                  <td className={styles.table_cell}>
                    {transactions?.tracking_id}
                  </td>
                  <td className={styles.table_cell}>{transactions?.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showTransaction && (
        <TransactionReciept
          showModal={showTransaction}
          setShowModal={setShowTransaction}
          orderId={orderId}
          userDetails={userDetails}
        />
      )}
    </div>
  );
};

export default YourTransactions;
