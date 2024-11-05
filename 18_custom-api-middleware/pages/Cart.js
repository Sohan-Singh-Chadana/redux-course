import React, { useEffect } from "react";
import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";
import {
  getAllCartItems,
  getCartError,
  getCartLoadingState,
} from "../store/slices/cartSlice";

export default function Cart() {
  const cartItems = useSelector(getAllCartItems);
  const isloading = useSelector(getCartLoadingState);
  const errorMessage = useSelector(getCartError);

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="cart-container">
      <h2>Items in Your Cart</h2>
      <div className="cart-items-container">
        <div className="cart-header cart-item-container">
          <div className="cart-item">Item</div>
          <div className="item-price">Price</div>
          <div className="quantity">Quantity</div>
          <div className="total">Total</div>
        </div>
        {isloading ? (
          <h1 style={{ textAlign: "center" }}>Loading...</h1>
        ) : errorMessage ? (
          <h1 style={{ textAlign: "center" }}>{errorMessage}</h1>
        ) : (
          cartItems.map(({ id, title, rating, price, image, quantity }) => (
            <CartItem
              key={id}
              productId={id}
              title={title}
              price={price}
              quantity={quantity}
              imageUrl={image}
              rating={rating?.rate}
            />
          ))
        )}
        <div className="cart-header cart-item-container">
          <div></div>
          <div></div>
          <div></div>
          {!isloading && !errorMessage && (
            <div className="total">
              $
              {cartItems
                .map((cartItem) => cartItem.price * cartItem.quantity)
                .reduce((acc, curVal) => acc + curVal, 0)
                .toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
