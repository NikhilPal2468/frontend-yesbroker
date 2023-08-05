import React from "react";
// import PropertyList from "./ManageProperties/PropertyList";
// import UserList from "./ManageUsers/UserList";
// import PropertySearch from "./ManageProperties/PropertySearch";
// import UserProfile from "./ManageUsers/UserProfile";
import { Link } from "react-router-dom";
import ManageProperties from "./ManageProperties";

const AdminPortal = () => {
  // const [properties, setProperties] = useState([]);
  // const [users, setUsers] = useState([]);
  // const [selectedUser, setSelectedUser] = useState(null);

  // useEffect(() => {
  //   fetchProperties();
  //   fetchUsers();
  // }, []);

  // const fetchProperties = () => {
  //   // Simulated data for example purposes
  //   const mockProperties = [
  //     { id: 1, name: "Property 1" },
  //     { id: 2, name: "Property 2" },
  //     { id: 3, name: "Property 3" },
  //   ];
  //   setProperties(mockProperties);
  // };

  // const fetchUsers = () => {
  //   // Simulated data for example purposes
  //   const mockUsers = [
  //     { id: 1, name: "User 1" },
  //     { id: 2, name: "User 2" },
  //     { id: 3, name: "User 3" },
  //   ];
  //   setUsers(mockUsers);
  // };

  // const filterPropertiesByOwner = (ownerName) => {
  //   // Code to filter properties based on the owner's name
  //   const filteredProperties = properties.filter(
  //     (property) => property.owner === ownerName
  //   );
  //   setProperties(filteredProperties);
  // };

  // const filterPropertiesByPlace = (placeName) => {
  //   // Code to filter properties based on the place name
  //   const filteredProperties = properties.filter(
  //     (property) => property.place === placeName
  //   );
  //   setProperties(filteredProperties);
  // };

  // const searchProperties = (searchQuery) => {
  //   // Code to search properties based on the search query
  //   const searchResults = properties.filter((property) =>
  //     property.name.includes(searchQuery)
  //   );
  //   setProperties(searchResults);
  // };

  // const handleUserSelect = (userId) => {
  //   // Code to fetch user profile based on the selected user id
  //   // For now, we will simply find the user from the existing user list
  //   const selectedUser = users.find((user) => user.id === userId);
  //   setSelectedUser(selectedUser);
  // };

  return (
    <div>
      <h1>Admin Portal</h1>
      <div>
        <Link to={`/admin/manageProperties`}>
          <button>Property Management</button>
        </Link>
        <Link to={`/admin/manageUsers`}>
          <button>User Management</button>
        </Link>
      </div>
      <h2>Property Management</h2>
      <ManageProperties />
      {/* <PropertySearch
        onFilterByOwner={filterPropertiesByOwner}
        onFilterByPlace={filterPropertiesByPlace}
        onSearch={searchProperties}
      />
      <PropertyList properties={properties} />

      <h2>User Management</h2>
      <UserList users={users} onSelectUser={handleUserSelect} />

      {selectedUser && (
        <div>
          <h2>User Profile</h2>
          <UserProfile user={selectedUser} />
        </div>
      )} */}
    </div>
  );
};

export default AdminPortal;
