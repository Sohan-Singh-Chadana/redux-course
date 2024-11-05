import { createSelector, createSlice } from "@reduxjs/toolkit";

const findItemIndex = (state, action) =>
  state.findIndex(
    (cartItem) => cartItem.productId === action.payload?.productId
  );

const slice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    list: JSON.parse(localStorage.getItem("cartItem")) || [],
    error: "",
  },
  reducers: {
    fetchCartItems(state) {
      state.loading = true;
    },
    cartErrorHandler(state, action) {
      state.loading = false;
      state.error = action.payload || "Something went wronge!";
    },
    loadCartItems(state, action) {
      state.loading = false;
      state.list = action.payload.products;
    },
    addCartItem(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      if (existingItemIndex !== -1) state.list[existingItemIndex].quantity += 1;
      else state.list.push({ ...action.payload, quantity: 1 });
    },
    removeCartItem(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      state.list.splice(existingItemIndex, 1);
    },
    increaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      state.list[existingItemIndex].quantity += 1;
    },
    decreaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      state.list[existingItemIndex].quantity -= 1;
      state.list[existingItemIndex].quantity > 0
        ? null
        : state.list.splice(existingItemIndex, 1);
    },
  },
});

const getCartItems = ({ products, cartItem }) => {
  return cartItem.list
    .map(({ productId, quantity }) => {
      if (products) {
        const cartProduct = products.list.find(
          (product) => product.id === productId
        );
        return { ...cartProduct, quantity };
      }
    })
    .filter(({ title }) => title);
};
export const getAllCartItems = createSelector(
  getCartItems,
  (cartItem) => cartItem
);
export const getCartLoadingState = (state) => state.cartItem.loading;
export const getCartError = (state) => state.cartItem.error;

export const {
  fetchCartItems,
  cartErrorHandler,
  loadCartItems,
  addCartItem,
  removeCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} = slice.actions;

export default slice.reducer;
