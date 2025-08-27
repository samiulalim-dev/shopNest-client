import Link from "next/link";
import BannerSlider from "./Components/Navbar/Banner/Banner";
import ProductHighlights from "./Components/ProductHighlights/ProductHighlights";

export default function HomePage() {
  return (
    <>
      {/* Navbar */}

      {/* Hero Section */}
      <BannerSlider></BannerSlider>
      {/* Product Highlights */}
      <ProductHighlights></ProductHighlights>
    </>
  );
}
