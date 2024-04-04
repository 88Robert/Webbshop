import React, { useState, useContext } from "react";
import { APIContext } from "./BackendAPI";

const ProductDetails = ({ product, onClose }) => {
  const { addToCart, setProducts } = useContext(APIContext);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  
  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

 const addToCartHandler = () => {
  addToCart(product, selectedColor, selectedSize)
  onClose()
 }
      

  return (
    <div>
      <h2>{product.title}</h2>
      <p>Price: {product.price}</p>
      <select value={selectedColor} onChange={handleColorChange}>
        <option value="">Select Color</option>
        {product.color.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
      <br />
      <br />
      <select value={selectedSize} onChange={handleSizeChange}>
        <option value="">Select Size</option>
        {product.size.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <p>Stock: {product.stock}</p>
      <button onClick={addToCartHandler}>Add to Cart</button>
      <br />
      <br />
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ProductDetails;
