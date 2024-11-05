import { createStore } from "redux";
import { productList } from "./productList";

const intialState = {
  products: productList,
  cartItem: [],
  wishList: [],
};

const CART_ADD_ITEM = "cart/addItem";
const CART_REMOVE_ITEM = "cart/removeItem";
const CART_ITEM_INCREASE_QUANTITY = "cart/increaseItemQuantity";
const CART_ITEM_DECREASE_QUANTITY = "cart/decreaseItemQuantity";

const WISHLIST_ADD_ITEM = "wishList/addItem";
const WISHLIST_REMOVE_ITEM = "wishList/removeItem";

function reducer(state = intialState, action) {
  console.log(state);
  switch (action.type) {
    case CART_ADD_ITEM:
      return { ...state, cartItem: [...state.cartItem, action.payload] };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItem: state.cartItem.filter(
          (cartItem) => cartItem.productId !== action.payload.productId
        ),
      };
    case CART_ITEM_INCREASE_QUANTITY:
      return {
        ...state,
        cartItem: state.cartItem.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case CART_ITEM_DECREASE_QUANTITY:
      return {
        ...state,
        cartItem: state.cartItem
          .map((item) =>
            item.productId === action.payload.productId
              ? // ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((cartItem) => cartItem.quantity > 0),
      };
    case WISHLIST_ADD_ITEM:
      return {
        ...state,
        wishList: [...state.wishList, action.payload],
      };
    case WISHLIST_REMOVE_ITEM:
      const productIndex = state.wishList.findIndex(
        (wishItem) => wishItem.productId === action.payload.productId
      );
      return {
        ...state,
        wishList: state.wishList.filter((_, index) => index !== productIndex),
      };
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
console.log(store);

store.dispatch({ type: CART_ADD_ITEM, payload: { productId: 1, quantity: 1 } });
store.dispatch({ type: CART_ADD_ITEM, payload: { productId: 8, quantity: 1 } });
store.dispatch({ type: CART_REMOVE_ITEM, payload: { productId: 8 } });

store.dispatch({ type: WISHLIST_ADD_ITEM, payload: { productId: 7 } });
store.dispatch({ type: WISHLIST_ADD_ITEM, payload: { productId: 17 } });
store.dispatch({ type: WISHLIST_REMOVE_ITEM, payload: { productId: 17 } });

store.dispatch({
  type: CART_ITEM_INCREASE_QUANTITY,
  payload: { productId: 1 },
});
store.dispatch({
  type: CART_ITEM_DECREASE_QUANTITY,
  payload: { productId: 1 },
});
