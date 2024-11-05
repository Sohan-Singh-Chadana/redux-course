import { createSlice } from "@reduxjs/toolkit";
import { myCreateSlice } from "../../redux-toolkit";

const initialState = JSON.parse(localStorage.getItem("wishlist")) || [];

const findItemIndex = (state, action) =>
  state.findIndex(
    (wishItem) => wishItem.productId === action.payload?.productId
  );

const slice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addWishListItem(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex !== -1) return;
      state.push(action.payload);
    },
    removeWishListItem(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      state.splice(existingItemIndex, 1);
    },
  },
});
//? Action Creators
export const { addWishListItem, removeWishListItem } = slice.actions;

//? Reducer
export default slice.reducer;
