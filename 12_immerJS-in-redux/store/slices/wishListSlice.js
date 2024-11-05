import { produce } from "immer";

// ? Action Types
const WISHLIST_ADD_ITEM = "wishList/addItem";
const WISHLIST_REMOVE_ITEM = "wishList/removeItem";

//? Action Creators
export function addWishListItem(productData) {
  return { type: WISHLIST_ADD_ITEM, payload: productData };
}

export function removeWishListItem(productId) {
  return { type: WISHLIST_REMOVE_ITEM, payload: { productId } };
}

const initialState = JSON.parse(localStorage.getItem("wishlist")) || [];

//? Reducer
export default function wishListReducer(originalState = initialState, action) {
  return produce(originalState, (state) => {
    const existingItemIndex = state.findIndex(
      (wishItem) => wishItem.productId === action.payload?.productId
    );
    switch (action.type) {
      case WISHLIST_ADD_ITEM:
        if (existingItemIndex !== -1) {
          // state[existingItemIndex];
          break;
        }
        state.push(action.payload);
        break;
      case WISHLIST_REMOVE_ITEM:
        state.splice(existingItemIndex, 1);
    }
    return state;
  });
}
