import Image from "next/image";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="card mx-5 shadow-xl">
      <figure>
        <Image
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="shoes"
          width={500}
          height={500}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions justify-end right-3">
          <button className="btn btn-primary btn-sm">Check Product</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
