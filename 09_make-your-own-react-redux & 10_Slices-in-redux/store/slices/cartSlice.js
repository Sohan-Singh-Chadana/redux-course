// ? Action Types
const CART_ADD_ITEM = "cart/addItem";
const CART_REMOVE_ITEM = "cart/removeItem";
const CART_ITEM_INCREASE_QUANTITY = "cart/increaseItemQuantity";
const CART_ITEM_DECREASE_QUANTITY = "cart/decreaseItemQuantity";

//? Action Creators
export const addCartItem = (productData) => ({
  type: CART_ADD_ITEM,
  payload: productData,
});

export const removeCartItem = (productId) => ({
  type: CART_REMOVE_ITEM,
  payload: { productId },
});

export function decreaseCartItemQuantity(productId) {
  return {
    type: CART_ITEM_DECREASE_QUANTITY,
    payload: { productId },
  };
}

export function increaseCartItemQuantity(productId) {
  return {
    type: CART_ITEM_INCREASE_QUANTITY,
    payload: { productId },
  };
}
const initialState = JSON.parse(localStorage.getItem("cartItem")) || [];

//? Reducer
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const existingItem = state.find(
        (cartItem) => cartItem.productId === action.payload.productId
      );
      if (existingItem) {
        return state.map((cartItem) => {
          return cartItem.productId === existingItem.productId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem;
        });
      }
      return [...state, { ...action.payload, quantity: 1 }];
    case CART_REMOVE_ITEM:
      return state.filter(
        (cartItem) => cartItem.productId !== action.payload.productId
      );
    case CART_ITEM_INCREASE_QUANTITY:
      return state.map((item) =>
        item.productId === action.payload.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case CART_ITEM_DECREASE_QUANTITY:
      return state
        .map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((cartItem) => cartItem.quantity > 0);
    default:
      return state;
  }
}
