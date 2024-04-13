"use client";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import axios from "axios";
import React from "react";

const ProductsPage = () => {
  const [prod, setProd] = React.useState({
    query: "",
  });
  const [products, setProducts] = useState([]);
  const [amazonProducts, setAmazonProducts] = useState([]);
  const [flipkartProducts, setFlipkartProducts] = useState([]);
  const fetchProducts = async () => {
    if (!prod.query) return;
    const res = await axios.post("/api/products/querysearch", prod);
    setProducts(res.data);
    setAmazonProducts(res.data.amazonProducts);
    setFlipkartProducts(res.data.flipkartProducts);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8">
        <div className="flex justify-center">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              onChange={(e) => setProd({ ...prod, query: e.target.value })}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <button className="btn mx-4" onClick={fetchProducts}>
            Search
          </button>
        </div>
        <div className="bg-slate-900 rounded-lg px-10 my-10">
          <h2>Amazon Products</h2>
          <div
            id="amazonProducts"
            className="flex flex-wrap justify-center -mx-4"
          >
            {amazonProducts
              .slice(0, 9)
              .map(
                (product, index) => (
                  console.log(product),
                  (<ProductCard key={index} product={product} />)
                )
              )}
          </div>
        </div>
        <div className="bg-slate-900 rounded-lg px-10 my-10">
          <h2>Flipkart Products</h2>
          <div
            id="flipkartProducts"
            className="flex flex-wrap justify-center -mx-4"
          >
            {flipkartProducts
              .slice(0, 9)
              .map(
                (product, index) => (
                  console.log(product),
                  (<ProductCard key={index} product={product} />)
                )
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
