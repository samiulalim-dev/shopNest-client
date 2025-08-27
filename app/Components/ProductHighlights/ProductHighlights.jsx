import dbConnect, { collectionNames } from "@/Lib/dbConnec";

export default async function ProductHighlights() {
  // Connect to MongoDB
  const productCollection = await dbConnect(collectionNames.productCollection);

  // Fetch max 6 products in descending order of name
  const products = await productCollection
    .find({})
    .sort({ name: -1 })
    .limit(6)
    .toArray();

  if (!products.length) {
    return <p className="text-center mt-10">No products available</p>;
  }

  return (
    <section className="w-11/12 mx-auto mt-16 px-4">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl ">
          <span className=" text-[#FF324D]  font-bold">Product Highlights</span>
        </h1>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="relative overflow-hidden rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-transform transform hover:-translate-y-1"
          >
            <div className="overflow-hidden rounded-t-2xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-5 flex flex-col space-y-2 ">
              <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-3">
                {product.description}
              </p>
              <p className="font-bold text-[#FF324D] text-lg mt-auto">
                ${product.price}
              </p>
              <span className="px-2 py-1 w-28 bg-green-100 text-green-800 text-sm rounded-full">
                In Stock: {product.stock}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
