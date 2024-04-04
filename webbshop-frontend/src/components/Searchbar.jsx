import React, { useState, useContext } from "react";
import { APIContext } from "./BackendAPI";
import { Container, Button } from "react-bootstrap";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { products } = useContext(APIContext);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const results = products.filter((pr) => pr.title.includes(searchTerm));
    setSearchResults(results);
  };

  const handleClose = () => {
    setSearchResults([]);
  };

  return (
    <Container>
      <div className="Searchbar">
        <form className="Search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
          />
          <Button variant="secondary" type="submit">
            Search
          </Button>
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
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default SearchBar;
