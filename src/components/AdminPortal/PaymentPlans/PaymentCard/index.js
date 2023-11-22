import React from "react";
import styles from "./styles.module.css"; // Import your CSS file for styling
import { Link } from "react-router-dom";
import axios from "axios";

const Card = ({ plan, plans, setPlans }) => {
  const { id, plan_type, price, no_of_contacts, plan_description, status } =
    plan;

  const handleStatusChange = async (id) => {
    try {
      await axios.get(`/private/api/togglePlans?id=${id}`);
      const { data } = await axios.get("/secure/api/payment-plans");
      data.sort(function (a, b) {
        return parseFloat(a.price) - parseFloat(b.price);
      });
      setPlans(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`${styles.card}`}>
      <div>
        <strong>Plan Type:</strong> {plan_type}
      </div>
      <div>
        <strong>Price:</strong> ₹{price}
      </div>
      <div>
        <strong>Number of Contacts:</strong> {no_of_contacts}
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
        <Link to={`/admin/edit-plan/${id}`}>
          <button className={`${styles.edit}`}>Edit</button>
        </Link>
        <button className={`${styles.delete}`}>Delete</button>
      </div>
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="button"
          id="flexSwitchCheckDefault"
          checked={status}
          onChange={(e) => {
            handleStatusChange(id);
          }}
        />
        <label class="form-check-label" for="flexSwitchCheckDefault">
          Active
        </label>
      </div>
    </div>
  );
};

export default Card;
