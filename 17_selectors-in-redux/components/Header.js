import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CartIcon from "../assets/cart-icon.svg";
import HeartIcon from "../assets/heart-solid.svg";
import HeartFillIcon from "../assets/heart-regular.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  errorHandler,
  fetchProducts,
  updateAllProducts,
} from "../store/slices/productsSlice";
import {
  cartErrorHandler,
  fetchCartItems,
  loadCartItems,
} from "../store/slices/cartSlice";

export default function Header() {
  const dispatch = useDispatch();

  const wishList = useSelector((state) => state.wishList);
  const cartItems = useSelector((state) => state.cartItem.list);

  useEffect(() => {
    dispatch(fetchProducts());
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        dispatch(updateAllProducts(data));
      })
      .catch((error) => {
        dispatch(errorHandler());
      });

    dispatch(fetchCartItems());
    fetch(`https://fakestoreapi.com/carts/5`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(loadCartItems(data));
      })
      .catch((error) => {
        dispatch(cartErrorHandler());
      });
  }, []);

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
