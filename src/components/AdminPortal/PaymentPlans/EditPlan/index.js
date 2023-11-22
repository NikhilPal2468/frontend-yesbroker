import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

function EditPlan() {
  const navigate = useNavigate();
  const { id: planId } = useParams();
  const paymentPlan = {
    id: planId,
    plan_type: "",
    price: "",
    no_of_contacts: "",
    discount: 0,
    gst_percentage: 18,
    plan_description: [""],
  };
  //   const [plan_type, setPlanType] = useState("");
  //   const [price, setPrice] = useState("");
  //   const [no_of_contacts, setNumberOfContacts] = useState("");
  //   const [discount, setDiscount] = useState(0);
  //   const [plan_description, setPlanDescription] = useState([""]);
  //   const [gst_percentage, setGstPercentage] = useState(18);

  const [plan, setPlan] = useState(paymentPlan);

  const handleSave = async (e) => {
    e.preventDefault();

    if (
      typeof plan.plan_type !== "string" ||
      isNaN(Number(plan.price)) ||
      isNaN(Number(plan.no_of_contacts)) ||
      isNaN(Number(plan.discount)) ||
      isNaN(Number(plan.gst_percentage)) ||
      plan.discount < 0 ||
      plan.discount > 100 ||
      plan.gst_percentage < 0 ||
      plan.no_of_contacts <= 0
    ) {
      alert("Please enter valid values.");
      return;
    } else {
      try {
        const response = await axios.patch("/private/api/plans", plan);

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

  useEffect(() => {
    try {
      const fetchData = async () => {
        const { data } = await axios.get(`/private/api/plans?id=${planId}`);
        setPlan(data.plan);
      };

      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, [planId]);

  return (
    <div>
      <h2 className="text-center mt-4 mb-4">Create New Payment Plan</h2>
      <form onSubmit={handleSave} className={`${styles.planForm}`}>
        <label>
          Plan Type:
          <input
            type="text"
            value={plan.plan_type}
            onChange={(e) => {
              setPlan({
                ...plan,
                plan_type: e.target.value,
              });
            }}
          />
        </label>
        <br />

        <label>
          Price:
          <input
            type="number"
            value={plan.price}
            onChange={(e) => {
              setPlan({
                ...plan,
                price: e.target.value,
              });
            }}
          />
        </label>
        <br />

        <label>
          Number of Contacts:
          <input
            type="number"
            value={plan.no_of_contacts}
            onChange={(e) => {
              setPlan({
                ...plan,
                no_of_contacts: e.target.value,
              });
            }}
          />
        </label>
        <br />

        <label>
          Discount (% Percentage):
          <input
            type="number"
            value={plan.discount}
            onChange={(e) => {
              setPlan({
                ...plan,
                discount: e.target.value,
              });
            }}
          />
        </label>
        <br />

        <label>
          Plan Description:
          <textarea
            value={plan.plan_description.join("\n")}
            onChange={(e) => {
              setPlan({
                ...plan,
                plan_description: e.target.value.split("\n"),
              });
            }}
          />
        </label>
        <br />

        <label>
          GST(% Percentage):
          <input
            type="number"
            value={plan.gst_percentage}
            onChange={(e) => {
              setPlan({
                ...plan,
                gst_percentage: e.target.value,
              });
            }}
          />
        </label>
        <label>
          Total Price:
          <input
            type="number"
            value={
              plan.price *
              (1 + plan.gst_percentage / 100.0 - plan.discount / 100.0)
            }
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPlan;
