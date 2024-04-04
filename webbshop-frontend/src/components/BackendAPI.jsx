import React, { createContext, useState, useEffect } from "react";

export const APIContext = createContext();

export const BackendAPI = ({ children }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
const loggedInUser = localStorage.getItem("");
if (loggedInUser) {
  setUser(JSON.parse(loggedInUser));
}
    fetchProducts();
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const fetchProducts = async () => {
    try {
      const savedProducts = localStorage.getItem("products");
      if (savedProducts) {
        console.log(
          "Products retrieved from localStorage",
          JSON.parse(savedProducts)
        );
        setProducts(JSON.parse(savedProducts));
      } else {
        const response = await fetch("http://localhost:3000/");
        if (response.ok) {
          const data = await response.json();
          console.log("products fetched from server", data);
          setProducts(data);
          localStorage.setItem("products", JSON.stringify(data));
        } else {
          throw new Error("Failed to fetch products");
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  const addToCart = (product, selectedColor, selectedSize) => {
    if (selectedColor && selectedSize) {
      const newItem = { ...product, selectedColor, selectedSize };
      setCart((prevCart) => [...prevCart, newItem]);
    } else {
      alert("Please select color and size");
    }
  };

  const addOrder = async () => {
    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      });
      if (response.ok) {
        alert("Order added successfully");
        setCart([]);
        const updatedProducts = products.map((product) => {
          const cartItem = cart.find((item) => item.id === product.id);
          if (cartItem) {
            return {
              ...product,
              stock: product.stock - 1,
            };
          }
          return product;
        });
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
      } else {
        throw new Error("Failed to add order");
      }
    } catch (error) {
      console.error("Error adding order:", error.message);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        setUser({ email });
        localStorage.setItem("user", JSON.stringify({ email }));
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  const register = async (email, password, username) => {
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });
      if (!response.ok) {
        throw new Error("User already exists");
      }
    } catch (error) {
      console.error("Error registering:", error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <APIContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        products,
        setProducts,
        cart,
        setCart,
        addToCart,
        addOrder,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
