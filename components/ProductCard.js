import Image from "next/image";
import React from "react";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="card mx-5 shadow-xl bg-slate-800 p-2 m-3">
      <figure>
        <Image src={product.imageUrl} alt="Item" width={200} height={200} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <div className="flex justify-start mx-1 ml-1">
          <p>{product.title}</p>
        </div>
        <div className="flex justify-start mx-1 ml-1">
          <p className="text-lg">Price:</p>
          <p>{product.price}</p>
        </div>
        <div className="card-actions justify-end right-3">
          <Link href={product.url}>
            <button className="btn btn-primary btn-sm">Check Product</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
