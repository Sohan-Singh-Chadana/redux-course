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

export const getAllProducts = (state) => state.products.list;
export const getProductLoadingState = (state) => state.products.loading;
export const getProductError = (state) => state.products.error;

const { updateAllProducts, fetchProducts, errorHandler } = slice.actions;

export const fetchProductsData = () => (dispatch) => {
  dispatch(fetchProducts());
  fetch(`https://fakestoreapi.com/products`)
    .then((res) => res.json())
    .then((data) => {
      dispatch(updateAllProducts(data));
    })
    .catch((error) => {
      dispatch(errorHandler());
    });
};

export default slice.reducer;
