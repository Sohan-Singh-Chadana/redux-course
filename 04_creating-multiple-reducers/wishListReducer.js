export const WISHLIST_ADD_ITEM = "wishList/addItem";
export const WISHLIST_REMOVE_ITEM = "wishList/removeItem";

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
