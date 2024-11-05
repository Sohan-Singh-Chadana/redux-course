import React from "react";
import { useSelector } from "../react-redux";
import Product from "../components/Product";
import CodeSnippet from "../components/CodeSnippet";

export default function Home() {
  const productsList = useSelector((state) => state.products);
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
  return (
    <>
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
      <div style={codebox}>
        <h1>Code Example</h1>
        <CodeSnippet language="javascript" code={code} />
      </div>
    </>
  );
}
