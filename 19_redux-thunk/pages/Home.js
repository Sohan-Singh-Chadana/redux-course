import React from "react";
import { useSelector } from "react-redux";
import Product from "../components/Product";
import CodeSnippet from "../components/CodeSnippet";
import {
  getAllProducts,
  getProductError,
  getProductLoadingState,
} from "../store/slices/productsSlice";

export default function Home() {
  const productsList = useSelector(getAllProducts);
  const isLoading = useSelector(getProductLoadingState);
  const errorMessage = useSelector(getProductError);

  const codebox = { maxWidth: "1200px", margin: "0 auto", padding: "0 20px" };
  const code = `
import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: 0 }

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action) {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer
  `;
  return isLoading ? (
    <h1 style={{ textAlign: "center" }}>Loading...</h1>
  ) : (
    <>
      {productsList.length > 0 ? (
        <div className="products-container">
          {productsList.map(({ id, title, rating, price, image }) => (
            <Product
              key={id}
              productId={id}
              title={title}
              rating={rating.rate}
              price={price}
              imageUrl={image}
            />
          ))}
        </div>
      ) : (
        <h1 style={{ textAlign: "center" }}>{errorMessage}</h1>
      )}

      {/* <div style={codebox}>
        <h1>Code Example</h1>
        <CodeSnippet language="javascript" code={code} />
      </div> */}
    </>
  );
}
