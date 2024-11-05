import React from "react";
import { Link } from "react-router-dom";
import CartIcon from "../assets/cart-icon.svg";
import HeartIcon from "../assets/heart-solid.svg";
import HeartFillIcon from "../assets/heart-regular.svg";
import { useSelector } from "../react-redux";

export default function Header() {
  const cartItems = useSelector((state) => state.cartItem);
  const wishList = useSelector((state) => state.wishList);
  return (
    <header>
      <div className="header-contents">
        <h1>
          <Link to="/">Shopee</Link>
        </h1>
        <div className="right_content">
          <Link to="/wishlist" className="heart-icon">
            {wishList.length > 0 ? (
              <img src={HeartIcon} alt="wishlist-icon" />
            ) : (
              <img src={HeartFillIcon} alt="wishlist-icon" />
            )}
          </Link>
          <Link className="cart-icon" to="/cart">
            <img src={CartIcon} alt="cart-icon" />
            <div className="cart-items-count">
              {cartItems.reduce(
                (accu, currenItem) => currenItem.quantity + accu,
                0
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
