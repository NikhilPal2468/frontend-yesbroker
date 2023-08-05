import React, { useState } from "react";

const PropertySearch = ({ onFilterByOwner, onFilterByPlace, onSearch }) => {
  const [ownerName, setOwnerName] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleOwnerFilter = () => {
    onFilterByOwner(ownerName);
  };

  const handlePlaceFilter = () => {
    onFilterByPlace(placeName);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div>
      <h3>Property Search</h3>
      <input
        type="text"
        placeholder="Filter by Owner"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
      />
      <button onClick={handleOwnerFilter}>Filter by Owner</button>

      <input
        type="text"
        placeholder="Filter by Place"
        value={placeName}
        onChange={(e) => setPlaceName(e.target.value)}
      />
      <button onClick={handlePlaceFilter}>Filter by Place</button>

      <input
        type="text"
        placeholder="Search Property"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default PropertySearch;
