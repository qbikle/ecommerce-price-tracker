import ProductCard from "@/components/ProductCard";
import StaggeredText from "@/components/StaggeredText";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="flex justify-end"></div>
      <div className="mt-40 text-5xl font-extrabold flex justify-center">
        <h1 className="text-blue-700 mr-3">PriceTrack : </h1>
        <StaggeredText text={"Track Your Prices With Ease"} />
      </div>
      <div className="flex justify-center mt-20">
        <p>
          PriceTrack is a web application that helps you track the prices of
          your favourite products and notifies you when the price drops.
        </p>
      </div>
      <div className="mt-20 bg-black bg-opacity-10 p-20">
        <div className="flex w-full py-20 my-5 text-5xl text-white text-opacity-60 justify-between">
          <StaggeredText
            text={"Login now to get Products at best Prices! -->"}
          />{" "}
          <a href="/products">
            <button className="btn bg-blue-800 bg-opacity-10 btn-lg">
              Start Browsing
            </button>
          </a>
        </div>
        <div className="flex w-full"></div>
      </div>
    </main>
  );
}
