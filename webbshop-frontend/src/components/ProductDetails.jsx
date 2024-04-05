import React, { useState, useContext } from "react";
import { APIContext } from "./BackendAPI";
import { Container, Button } from "react-bootstrap";

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
    addToCart(product, selectedColor, selectedSize);
    onClose();
  };

  return (
    <Container>
      <div>
        <h2>{product.title}</h2>
        <h4>Price: {product.price}</h4>
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
        <br />
        <br />
        <p>Stock: {product.stock}</p>
        <Button variant="secondary" onClick={addToCartHandler}>
          Add to Cart
        </Button>
        <br />
        <br />
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>
    </Container>
  );
};

export default ProductDetails;
