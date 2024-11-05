import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },
  reducers: {
    fetchProducts: (state) => {
      state.loading = true;
    },
    errorHandler(state, action) {
      state.loading = false;
      state.error = action.payload || "Something went wronge!";
    },
    updateAllProducts(state, action) {
      state.loading = false;
      state.list = action.payload;
      state.error = "";
    },
  },
});

export const { updateAllProducts, fetchProducts, errorHandler } = slice.actions;
export default slice.reducer;
