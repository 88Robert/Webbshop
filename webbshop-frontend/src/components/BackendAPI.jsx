import React, { createContext, useState, useContext, useEffect } from 'react';

const APIContext = createContext();

export const useUser = () => useContext(APIContext);

export const BackendAPI = ({ children }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        setUser({ email });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  const register = async (email, password, username) => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username }),
      });
      if (!response.ok) {
        throw new Error('User already exists');
      }
    } catch (error) {
      console.error('Error registering:', error.message);
    }
  };

  const logout = () => setUser(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  return (
    <APIContext.Provider value={{ user, login, register, logout, products }}>
      {children}
    </APIContext.Provider>
  );
};