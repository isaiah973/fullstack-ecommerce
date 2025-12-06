import React from "react";
import Navbar from "../Components/Navbar";
import HeroSlider from "../Components/HeroSlider";
import ProductCard from "../Components/ProductCard";
import Footer from "../Components/Footer";
// import ProductDetail from "./ProductDetail";

const Home = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <ProductCard />
      <Footer />

      {/* <ProductDetail /> */}
    </div>
  );
};

export default Home;
