import React, { useContext, useState } from "react";
import "./CartItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const CartItems = () => {
  const { products, cartItems, removeFromCart, getTotalCartAmount } = useContext(
    ShopContext
  );

  // State for promo code input and error message
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Function to handle promo code submission
  const applyPromoCode = () => {
    // Reset promo error message
    setPromoError("");

    // Example: Check if promo code is valid (you can replace this with your logic)
    if (promoCode === "SUMMER50") {
      // Apply 50% discount (example)
      setPromoApplied(true);
    } else {
      setPromoError("Invalid promo code");
    }
  };

  const confirmRemove = (productId, productName) => {
    const confirmDelete = window.confirm(`Are you sure you want to remove "${productName}" from cart?`);
    if (confirmDelete) {
      removeFromCart(productId);
    }
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {products.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format-main cartitems-format">
                <img
                  className="cartitems-product-icon"
                  src={e.image}
                  alt={e.name}
                />
                <p className="cartitems-product-title">{e.name}</p>
                <p>Rs{e.new_price}</p>
                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                <p>Rs{e.new_price * cartItems[e.id]}</p>
                <img
                  onClick={() => confirmRemove(e.id, e.name)}
                  className="cartitems-remove-icon"
                  src={cross_icon}
                  alt="Remove"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>Rs{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>Rs{getTotalCartAmount()}</h3>
            </div>
          </div>

          {/* Display promo code input and apply button */}
          <div className="cartitems-promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="cartitems-promobox">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={applyPromoCode}>Submit</button>
            </div>
            {promoError && <p className="error">{promoError}</p>}
            {promoApplied && <p className="success">Promo code applied successfully!</p>}
          </div>

          <Link to="/checkout">
            <button>PROCEED TO CHECKOUT</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
