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
export default function wishListReducer(state = initialState, action) {
  switch (action.type) {
    case WISHLIST_ADD_ITEM:
      const existingItem = state.find(
        (wishItem) => wishItem.productId === action.payload.productId
      );
      // localStorage.setItem("wishlist", JSON.stringify(state));
      if (existingItem) {
        return state.map((wishItem) => {
          if (wishItem.productId === existingItem.productId) {
            return { ...wishItem };
          }
          return wishItem;
        });
      }
      return [...state, action.payload];
    case WISHLIST_REMOVE_ITEM:
      const productIndex = state.findIndex(
        (wishItem) => wishItem.productId === action.payload.productId
      );
      // localStorage.setItem("wishlist", JSON.stringify(state));
      return state.filter((_, index) => index !== productIndex);
    default:
      return state;
  }
}
