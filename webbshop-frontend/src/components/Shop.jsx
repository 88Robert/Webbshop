import React, { useContext } from "react";
import { APIContext } from "./BackendAPI";

const Shop = () => {
  const { cart, setCart, products, setProducts, addOrder } =
    useContext(APIContext);
  console.log("Context value", { cart, products });

  const removeFromCart = (productId) => {
    const removedItem = cart.find((item) => item.id === productId);
    if (!removedItem) return;

    const removedQuantity = cart.filter((item) => item.id === productId).length;

    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);

    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          stock: product.stock + removedQuantity,
        };
      }
      return product;
    });
    console.log("Updated products:", updatedProducts);

    // Update the products state with updated stock
    setProducts(updatedProducts);

    // Update the products in localStorage with updated stock
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    console.log("localStorage:", localStorage.getItem("products"));
  };

  const handlePurchase = () => {
    addOrder();
  };

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <span>{item.title}</span>
              <p>Price: {item.price}</p>
              <p>Color: {item.selectedColor}</p>
              <p>Size: {item.selectedSize}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
              <br />
              <br />
              <button onClick={handlePurchase}>Purchase</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Shop;
