import React from "react";
import styles from "./styles.module.css"; // Import your CSS file for styling

const Card = ({ plan, plans, setPlans }) => {
  const { plan_type, price, number_of_contacts, plan_description } = plan;

  const handlePlanEdit = (e, id) => {
    try {
    } catch (err) {}
  };

  const handlePlanDelete = (e, id) => {
    try {
    } catch (err) {}
  };

  return (
    <div className={`${styles.card}`}>
      <div>
        <strong>Plan Type:</strong> {plan_type}
      </div>
      <div>
        <strong>Price:</strong> ${price}
      </div>
      <div>
        <strong>Number of Contacts:</strong> {number_of_contacts}
      </div>
      <div>
        <strong>Plan Description:</strong>
        <ul>
          {plan_description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className={`${styles.actions}`}>
        <button
          className={`${styles.edit}`}
          onClick={(e, id) => {
            handlePlanEdit(e, id);
          }}
        >
          Edit
        </button>
        <button
          className={`${styles.delete}`}
          onClick={(e, id) => {
            handlePlanDelete(e, id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
