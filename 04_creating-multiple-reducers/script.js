import { combineReducers, createStore } from "redux";
import productsReducer from "./productsReducer";
import cartReducer, {
  CART_ADD_ITEM,
  CART_ITEM_DECREASE_QUANTITY,
  CART_ITEM_INCREASE_QUANTITY,
  CART_REMOVE_ITEM,
} from "./cartReducer";
import wishListReducer, {
  WISHLIST_ADD_ITEM,
  WISHLIST_REMOVE_ITEM,
} from "./wishListReducer";

// const intialState = {
//   products: productList,
//   cartItem: [],
//   wishList: [],
// };

const reducer = combineReducers({
  products: productsReducer,
  cartItem: cartReducer,
  wishList: wishListReducer,
});

console.log(reducer);

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
console.log(store.getState());
