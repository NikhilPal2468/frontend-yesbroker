import React from "react";

const UserProfile = ({ user }) => {
  return (
    <div>
      <h3>User Profile</h3>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Additional user profile details */}
    </div>
  );
};

export default UserProfile;
