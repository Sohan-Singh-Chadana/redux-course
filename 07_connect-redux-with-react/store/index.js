import { combineReducers, createStore } from "redux";
import productsReducer from "./productsReducer";
import cartReducer, {
  addCartItem,
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  removeCartItem,
} from "./cartReducer";
import wishListReducer, {
  addWishListItem,
  remoevWishListItem,
} from "./wishListReducer";

const reducer = combineReducers({
  products: productsReducer,
  cartItem: cartReducer,
  wishList: wishListReducer,
});

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// store.dispatch(addCartItem(1, 1));
// store.dispatch(addCartItem(8, 1));
// store.dispatch(removeCartItem(8));

// store.dispatch(addWishListItem(7));
// store.dispatch(addWishListItem(17));
// store.dispatch(remoevWishListItem(17));

// store.dispatch(increaseCartItemQuantity(1));
// store.dispatch(decreaseCartItemQuantity(1));

// console.log(store.getState());
