import dbConnect, { collectionNames } from "@/Lib/dbConnec";
import { ObjectId } from "mongodb";

export default async function ProductDetailsPage({ params }) {
  const { id } = params;

  // Connect to MongoDB
  const productCollection = dbConnect(collectionNames.productCollection);

  // Fetch single product by _id
  const product = await productCollection.findOne({ _id: new ObjectId(id) });

  if (!product) {
    return (
      <p className="text-center mt-20 text-red-500 text-xl font-semibold">
        Product not found
      </p>
    );
  }

  return (
    <div className="px-4 md:px-8 lg:px-20 py-12">
      {/* Section Title & Description */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#FF324D] mb-3">
          Product Details
        </h2>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
          Explore detailed information about this product, including features,
          pricing, and full description.
        </p>
      </div>

      {/* Product Card */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden md:flex">
        {/* Product Image */}
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 md:h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Product Info */}
        <div className="p-6 md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-gray-700 text-base md:text-lg mb-6">
              {product.description}
            </p>
          </div>

          <div className="mt-4">
            <p className="text-2xl md:text-3xl font-semibold text-[#FF324D] mb-2">
              ${product.price}
            </p>
            <p className="tex-sm md:text-lg font-semibold text-green-600 mb-6">
              In Stock: {product.stock}
            </p>
            <a
              href="/products"
              className="inline-block w-full text-center bg-[#FF324D] text-white py-3 rounded-full text-lg font-medium transition-all hover:bg-[#FF324D] shadow-md hover:shadow-lg"
            >
              Back to Products
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
