import React, { useState, useContext } from "react";
import { APIContext } from "./BackendAPI"; // Replace 'YourContextProviderFile' with the actual file name

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { products } = useContext(APIContext); // Accessing the search function from the context provider

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const results = products.filter((pr) => pr.title.includes(searchTerm));
    setSearchResults(results);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      {searchResults.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                <strong>{result.title}</strong> - Price: {result.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
