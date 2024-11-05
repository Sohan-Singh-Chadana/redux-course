import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const findItemIndex = (state, action) =>
  state.findIndex(
    (cartItem) => cartItem.productId === action.payload?.productId
  );

export const fetchCartItemsData = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/carts/5`);
      return response.json();
    } catch (err) {
      throw err;
    }
  }
);

const slice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    list: JSON.parse(localStorage.getItem("cartItem")) || [],
    error: "",
  },
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItemsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartItemsData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.products;
      })
      .addCase(fetchCartItemsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wronge!";
      });
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
  addCartItem,
  removeCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} = slice.actions;

export default slice.reducer;
