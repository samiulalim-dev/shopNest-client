import dbConnect, { collectionNames } from "@/Lib/dbConnec";
import Link from "next/link";

export default async function ProductsPage() {
  const productCollection = await dbConnect(collectionNames.productCollection);
  const products = await productCollection.find({}).toArray();
  // console.log(products);
  if (!products.length) {
    return (
      <p className="text-center mt-10 text-gray-500">No products available</p>
    );
  }
  return (
    <div className="w-11/12 mx-auto mt-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          <span className="bg-gradient-to-r from-[#FF324D] to-orange-400 bg-clip-text text-transparent">
            Our Products
          </span>
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Explore our carefully curated collection of top-quality products. Find
          the perfect items at unbeatable prices and elevate your shopping
          experience.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="relative bg-slate-100 rounded-3xl shadow-lg overflow-hidden border-2 border-transparent hover:border-[#FF324D] transition-all duration-300"
          >
            {/* Image */}
            <div className="overflow-hidden rounded-t-3xl h-64">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 hover:-translate-y-2"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col space-y-3">
              <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
                {product.name}
              </h2>

              <p className="text-gray-600 text-sm line-clamp-3">
                {product.description}
              </p>

              <p className="font-bold text-[#FF324D] text-lg">
                ${product.price}
              </p>

              <Link
                href={`/products/${product._id}`}
                className="mt-auto inline-block text-center py-2 px-4 rounded-full bg-[#FF324D] text-white font-semibold shadow hover:shadow-lg hover:-translate-y-1 transition-transform duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
