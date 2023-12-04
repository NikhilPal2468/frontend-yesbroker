import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { LoadContext } from "../../context/load-context";

// const paymentPlans = [
//   {
//     plan_type: "Basic",
//     price: 599,
//     number_of_contacts: 25,
//     plan_description: ["Access to basic features", "Limited support"],
//   },
//   {
//     plan_type: "Standard",
//     price: 999,
//     number_of_contacts: 50,
//     plan_description: ["Access to advanced features", "Priority support"],
//   },
//   {
//     plan_type: "Premium",
//     price: 1599,
//     number_of_contacts: 100,
//     plan_description: ["Access to all features", "24/7 premium support"],
//   },
// ];

const Premium = () => {
  const [paymentPlans, setPaymentPlans] = useState([]);
  const { setLoading } = useContext(LoadContext);

  useEffect(() => {
    try {
      setLoading(true);
      const fetchPlans = async () => {
        const { data } = await axios.get("/secure/api/payment-plans");
        data.sort(function (a, b) {
          return parseFloat(a.price) - parseFloat(b.price);
        });
        setPaymentPlans(data);
      };

      fetchPlans();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className={styles.pricingPage}>
      <h1>Pricing</h1>
      <div className={styles.plansContainer}>
        {paymentPlans.length > 0 &&
          paymentPlans.map((currentPlan) => {
            return (
              <div className={`${styles.plan}`} key={currentPlan?.id}>
                <h2>{currentPlan?.plan_type}</h2>
                <div className={styles.planDetails}>
                  <p>Price: ₹{currentPlan?.price}</p>
                  <p>
                    Number of Contacts upto {currentPlan?.number_of_contacts}
                  </p>
                  {currentPlan?.plan_description &&
                    currentPlan.plan_description.map((description) => {
                      return <p key={description}>{description}</p>;
                    })}
                </div>
                <Link to={`/payment?planId=${currentPlan?.id}`}>
                  <button className={styles.planButton}>Choose Plan</button>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Premium;
