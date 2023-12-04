import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";

function CreatePlan() {
  const navigate = useNavigate();

  const [plan_type, setPlanType] = useState("");
  const [price, setPrice] = useState("");
  const [no_of_contacts, setNumberOfContacts] = useState("");
  const [discount, setDiscount] = useState(0);
  const [plan_description, setPlanDescription] = useState([""]);
  const [gst_percentage, setGstPercentage] = useState(18);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      typeof plan_type !== "string" ||
      isNaN(Number(price)) ||
      isNaN(Number(no_of_contacts)) ||
      isNaN(Number(discount)) ||
      isNaN(Number(gst_percentage)) ||
      discount < 0 ||
      discount > 100 ||
      gst_percentage < 0 ||
      no_of_contacts <= 0
    ) {
      alert("Please enter valid values.");
      return;
    } else {
      try {
        const response = await axios.post("/private/api/plans", {
          plan_type,
          price,
          no_of_contacts,
          discount,
          plan_description,
          gst_percentage,
        });

        console.log(response);

        if (response.status === 200) {
          // Redirect to the desired page using history.push
          navigate("/admin/payment-plans");
        } else {
          throw new Error("Failed to redirect");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <h2 className="text-center mt-4 mb-4">Create New Payment Plan</h2>
      <form onSubmit={handleSubmit} className={`${styles.planForm}`}>
        <label>
          Plan Type:
          <input
            type="text"
            value={plan_type}
            onChange={(e) => setPlanType(e.target.value)}
          />
        </label>
        <br />

        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <br />

        <label>
          Number of Contacts:
          <input
            type="number"
            value={no_of_contacts}
            onChange={(e) => setNumberOfContacts(e.target.value)}
          />
        </label>
        <br />

        <label>
          Discount (% Percentage):
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </label>
        <br />

        <label>
          Plan Description:
          <textarea
            value={plan_description.join("\n")}
            onChange={(e) => setPlanDescription(e.target.value.split("\n"))}
          />
        </label>
        <br />

        <label>
          GST(% Percentage):
          <input
            type="number"
            value={gst_percentage}
            onChange={(e) => setGstPercentage(e.target.value)}
          />
        </label>
        <label>
          Total Price:
          <input
            type="number"
            value={price * (1 + gst_percentage / 100.0 - discount / 100.0)}
          />
        </label>
        <br />

        <div className="flex flex-row">
          <Link to={"/admin/payment-plans"}>
            <button
              type="submit"
              className={`${styles.cancel} ${styles.edit_buttons}`}
            >
              Cancel
            </button>
          </Link>
          <button type="submit" className={`${styles.edit_buttons}`}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePlan;
