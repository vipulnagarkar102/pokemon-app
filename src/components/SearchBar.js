// src/SearchBar.js
import React from 'react';

const SearchBar = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search for a Pokemon"
    />
  );
};

export default SearchBar;
