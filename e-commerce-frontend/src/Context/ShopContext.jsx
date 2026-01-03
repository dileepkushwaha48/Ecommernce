import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

// Backend base URL from .env
const API_URL = process.env.REACT_APP_API_URL;

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);

  const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    return cart;
  };

  const [cartItems, setCartItems] = useState(getDefaultCart());

  // ================= FETCH PRODUCTS & CART =================
  useEffect(() => {
    // Get all products
    fetch(`${API_URL}/allproducts`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Product fetch error:", err));

    // Get cart if user is logged in
    if (localStorage.getItem("auth-token")) {
      fetch(`${API_URL}/getcart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setCartItems(data))
        .catch((err) => console.error("Cart fetch error:", err));
    }
  }, []);

  // ================= TOTAL AMOUNT =================
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    if (products.length > 0) {
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          const product = products.find(
            (p) => p.id === Number(item)
          );
          if (product) {
            totalAmount += cartItems[item] * product.new_price;
          }
        }
      }
    }
    return totalAmount;
  };

  // ================= TOTAL ITEMS =================
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  // ================= ADD TO CART =================
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));

    if (localStorage.getItem("auth-token")) {
      fetch(`${API_URL}/addtocart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((res) => res.json())
        .catch((err) => console.error("Add to cart error:", err));
    }
  };

  // ================= REMOVE FROM CART =================
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));

    if (localStorage.getItem("auth-token")) {
      fetch(`${API_URL}/removefromcart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((res) => res.json())
        .catch((err) => console.error("Remove from cart error:", err));
    }
  };

  // ================= CONTEXT VALUE =================
  const contextValue = {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
