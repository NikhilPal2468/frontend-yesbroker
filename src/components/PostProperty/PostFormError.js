import React from "react";

function PostFormError(props) {
  return (
    <div className="text-danger">
      <small>{props.children}</small>
    </div>
  );
}

export default PostFormError;
