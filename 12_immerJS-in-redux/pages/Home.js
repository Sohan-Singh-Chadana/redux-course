import React from "react";
import { useSelector } from "../react-redux";
import Product from "../components/Product";
import CodeSnippet from "../components/CodeSnippet";

export default function Home() {
  const productsList = useSelector((state) => state.products);
  const codebox = { maxWidth: "1200px", margin: "0 auto", padding: "0 20px" };
  const code = `
    import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
    import type { Pokemon } from './types';

    export const pokemonApi = createApi({
      reducerPath: 'pokemonApi',
      baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
      endpoints: (builder) => ({
        getPokemonByName: builder.query<Pokemon, string>({
          query: (name) => \`pokemon/\${name}\`,
        }),
      }),
    });

    export const { useGetPokemonByNameQuery } = pokemonApi;
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
        <CodeSnippet language="typescript" code={code} />
      </div>
    </>
  );
}
