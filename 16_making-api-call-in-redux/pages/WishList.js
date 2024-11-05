import React, { useEffect } from "react";
import HeartFillIcon from "../assets/heart-regular.svg";
import WishlistItem from "../components/WishlistItem";
import { useSelector } from "react-redux";

export default function WishList() {
  const wishList = useSelector((state) => state.wishList);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  return (
    <div className="wishList-container">
      <div className="wishlist_main_head">
        <img src={HeartFillIcon} alt="heart-icon" className="heart_icon" />
        <h1>Your Wishlist</h1>
      </div>
      <div className="wishlist-items-container">
        <div className="wishlist-header ">
          <h2>Product Name</h2>
          <h2 className="remove-padding">Unit Price</h2>
        </div>
        {wishList.map(({ productId, title, rating, imageUrl, price }) => (
          <WishlistItem
            key={productId}
            productId={productId}
            title={title}
            rating={rating}
            imageUrl={imageUrl}
            price={price}
          />
        ))}
      </div>
    </div>
  );
}
