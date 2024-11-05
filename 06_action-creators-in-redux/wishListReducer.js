// ? Action Types
const WISHLIST_ADD_ITEM = "wishList/addItem";
const WISHLIST_REMOVE_ITEM = "wishList/removeItem";

//? Action Creators
export function addWishListItem(productId) {
  return { type: WISHLIST_ADD_ITEM, payload: { productId } };
}

export function remoevWishListItem(productId) {
  return { type: WISHLIST_REMOVE_ITEM, payload: { productId } };
}

//? Reducer
export default function wishListReducer(state = [], action) {
  switch (action.type) {
    case WISHLIST_ADD_ITEM:
      return [...state, action.payload];
    case WISHLIST_REMOVE_ITEM:
      const productIndex = state.findIndex(
        (wishItem) => wishItem.productId === action.payload.productId
      );
      return state.filter((_, index) => index !== productIndex);
    default:
      return state;
  }
}
