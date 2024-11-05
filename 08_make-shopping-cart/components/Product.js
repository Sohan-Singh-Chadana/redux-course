import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../store/cartReducer";
import { addWishListItem } from "../store/wishListReducer";
import HeartFillIcon from "../assets/heart-regular.svg";
import HeartIcon from "../assets/heart-solid.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Product({ productId, title, rating, price, imageUrl }) {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishList);
  const cartItems = useSelector((state) => state.cartItem);
  const isInWishlist = wishList.some((item) => item.productId === productId);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="product">
      <div className="product-image">
        <img src={imageUrl} alt={title} draggable={false} />
      </div>
      <div className="title-container">
        <h3>
          <Link to="/wishlist">{title}</Link>
        </h3>
      </div>
      <div className="price-rating-container">
        <p className="rating">{+rating} ★ ★ ★ ★</p>
        <p className="price">${price}</p>
      </div>
      <div className="cta-container">
        <button
          onClick={() =>
            dispatch(addCartItem({ productId, title, rating, price, imageUrl }))
          }
        >
          Add to Cart
        </button>
        <button
          onClick={() => {
            dispatch(
              addWishListItem({ productId, title, rating, price, imageUrl })
            );
          }}
        >
          Add to Wishlist
        </button>
      </div>
      <div className="product_heart_icon">
        <img
          src={isInWishlist ? HeartIcon : HeartFillIcon}
          alt="wishlist-icon"
        />
      </div>
    </div>
  );
}
