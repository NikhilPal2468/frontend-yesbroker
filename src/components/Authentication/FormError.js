import React from "react";

function FormError(props) {
  return (
    <div className="text-danger">
      <small>{props.children}</small>
    </div>
  );
}

export default FormError;
