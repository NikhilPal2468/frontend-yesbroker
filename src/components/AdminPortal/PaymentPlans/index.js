import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Card from "./PaymentCard";

function PaymentPlans() {
  const defaultPlans = [
    {
      plan_type: "Basic",
      price: 599,
      number_of_contacts: 25,
      plan_description: ["Access to basic features", "Limited support"],
    },
    {
      plan_type: "Standard",
      price: 999,
      number_of_contacts: 50,
      plan_description: ["Access to advanced features", "Priority support"],
    },
    {
      plan_type: "Premium",
      price: 1599,
      number_of_contacts: 100,
      plan_description: ["Access to all features", "24/7 premium support"],
    },
  ];

  const [plans, setPlans] = useState(defaultPlans);

  useEffect(() => {}, []);

  return (
    <div className={`${styles.container}`}>
      <h2 className="text-center mt-4">All Payment Plans</h2>

      <div className={`${styles.cardsContainer}`}>
        {plans.map((plan, index) => (
          <Card key={index} plan={plan} plans={plans} setPlans={setPlans} />
        ))}
      </div>
    </div>
  );
}

export default PaymentPlans;
