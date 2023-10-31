import React, { useEffect } from "react";

function PaymentForm({ formHTML }) {
  console.log("formHTML:", formHTML);
  useEffect(() => {
    // This code will run when the component mounts
    const formSubmitScript = document.getElementById("formSubmitScript");
    if (formSubmitScript) {
      eval(formSubmitScript.innerText);
    }
  }, [formHTML]);
  useEffect(() => {
    if (formHTML) document.getElementById("nonseamless").submit();
  }, [formHTML]);

  return (
    <div>
      {/* Use dangerouslySetInnerHTML to insert the received form HTML */}
      <div dangerouslySetInnerHTML={{ __html: formHTML }} />

      {/* Optionally, you can add a button to manually trigger form submission */}
      {/* <button onClick={() => document.getElementById("nonseamless").submit()}>
        Submit Form
      </button> */}
    </div>
  );
}

export default PaymentForm;
