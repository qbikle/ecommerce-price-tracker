"use client";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/logout");
      const data = await res.data;
      if (data.success) {
        router.push("/");
      }
    } catch (error) {
      console.log("Error in Logout:", error);
    }
  };
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href={"/"}>
            <div className="text-white font-bold text-3xl ml-5">PriceTrack</div>
          </Link>
          <div className="space-x-4">
            <Link href={"/profile"} className="text-white">
              Profile
            </Link>
            <button className="text-white ml-4 focus:outline-none">
              Theme
            </button>
            <button onClick={handleLogout} className="btn">
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
