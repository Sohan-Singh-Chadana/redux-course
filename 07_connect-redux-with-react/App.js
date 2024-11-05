import React from "react";
import Product from "./components/Product";
import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const productList = useSelector((state) => state.products);
  return (
    <div className="products-container">
      {productList.map(({ id, title, rating, price, image }) => (
        <Product
          key={id}
          title={title}
          rating={rating.rate}
          price={price}
          imageUrl={image}
        />
      ))}
    </div>
  );
}

export default App;
