import React, { useContext } from "react";
import SearchBar from "./Searchbar";
import { APIContext } from "./BackendAPI"; // Replace 'YourContextProviderFile' with the actual file name

const Firstpage = () => {
  const { products } = useContext(APIContext); // Accessing products from the context provider

  return (
    <div>
      <div>
        <SearchBar />
      </div>
      <h2>Products</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h2>
              <strong>{product.title}</strong>
            </h2>
            <h3>BILD</h3>
            <p>Price: {product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Firstpage;
