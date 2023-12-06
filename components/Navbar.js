import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href={"/"}>
            <div className="text-white font-bold text-xl">PriceTrack</div>
          </Link>
          <div className="space-x-4">
            <Link href={"/products"} className="text-white">
              Products
            </Link>
            <Link href={"/profile"} className="text-white">
              Profile
            </Link>
            <Link href={"/login"}>
              <button className="btn">Sign In</button>
            </Link>
            <button className="text-white ml-4 focus:outline-none">
              Theme
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
