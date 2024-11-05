import { createStore } from "redux";
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

function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);

  return function (state = {}, action) {
    const nextState = {};

    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i]; // key name get example => key = 'products'
      const reducer = reducers[key]; // reducer function get => reducer = f productsReducer(state = intialState)
      const previousStateForKey = state[key]; // previousState = undefined, state = {}
      const nextStateForKey = reducer(previousStateForKey, action); //  nextStateForKey = Array(20) , reducer =  function productsReducer(state = intialState, action : {type: @@INIT})
      nextState[key] = nextStateForKey; // {products:Array(20) }
    }

    return nextState;
  };
}

const reducer = combineReducers({
  products: productsReducer,
  cartItem: cartReducer,
  wishList: wishListReducer,
});

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
