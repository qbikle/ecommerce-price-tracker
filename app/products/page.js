import ProductCard from "@/components/ProductCard";

const products = [
  { id: 1, name: "Product 1", description: "Description 1" },
  { id: 2, name: "Product 2", description: "Description 2" },
  { id: 3, name: "Product 3", description: "Description 3" },
  { id: 4, name: "Product 3", description: "Description 3" },
  { id: 5, name: "Product 3", description: "Description 3" },
  { id: 6, name: "Product 3", description: "Description 3" },
];

const ProductsPage = () => {
  return (
    <div className="container mx-auto my-8">
      <div className="flex flex-wrap justify-center -mx-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-8"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
