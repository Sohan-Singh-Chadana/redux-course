import React from "react";
import RemoveIcon from "../assets/trash-icon.svg";
import AddCartIcon from "../assets/cart-plus-solid.svg";
import { useDispatch } from "react-redux";
import { removeWishListItem } from "../store/slices/wishListSlice";
import { addCartItem } from "../store/slices/cartSlice";

export default function WishlistItem({
  productId,
  title,
  rating,
  imageUrl,
  price,
}) {
  const dispatch = useDispatch();
  return (
    <div className="wishlist-item-container">
      <div className="wishList-item">
        <img src={imageUrl} alt={title} className="product_img" />
        <div>
          <h3>{title}</h3>
          <p>{rating} ★ ★ ★ ★</p>
        </div>
      </div>
      <div className="wishlist-price">${price}</div>
      <div className="wishlist-remove">
        <img
          src={RemoveIcon}
          alt="remove-icon"
          onClick={() => dispatch(removeWishListItem({ productId }))}
        />
      </div>
      <div className="wishlist-remove">
        <img
          src={AddCartIcon}
          alt="addtocart-icon"
          onClick={() =>
            dispatch(
              addCartItem({
                productId,
                title,
                rating,
                imageUrl,
                price,
              })
            )
          }
        />
      </div>
    </div>
  );
}
