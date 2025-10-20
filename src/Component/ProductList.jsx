import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LayoutAll from "./LayoutAll";

// Import Swiper components and styles (optional for future use)
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductList = ({ children }) => {
  const location = useLocation();

  const Menus = [
    { label: "Home", Link: "/" },
    { label: "Products", Link: "/products" },
    { label: "Category", Link: "/category" },
    { label: "Contact Us", Link: "/" },
    { label: "Login", Link: "/admin/auth" },
  ];

  const [Products, setProducts] = useState([
    { title: "Arrival new article", price: 5000, discount: 15, Thumbnail: "/img/trouser1.jpeg" },
    { title: "Arrival new article", price: 5000, discount: 15, Thumbnail: "/img/trouser2.jpeg" },
    { title: "Arrival new article", price: 5000, discount: 15, Thumbnail: "/img/trouser3.jpeg" },
    { title: "Arrival new article", price: 5000, discount: 15, Thumbnail: "/img/trouser4.jpeg" },
    { title: "Arrival new article", price: 5000, discount: 15, Thumbnail: "/img/trouser5.jpeg" },
    { title: "Arrival new article", price: 5000, discount: 15, Thumbnail: "/img/trouser6.jpeg" },
  ]);

  return (
    <LayoutAll>
      <div className="md:p-10 p-5">
        <h1 className="text-center text-3xl font-semibold">All Items</h1>
        <p className="md:w-7/12 mx-auto text-center mt-2 mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus vero beatae explicabo?
          Maiores minima id eum, ut possimus consequatur laudantium explicabo quae! Omnis soluta iure aut facilis!
        </p>

        <div className="md:w-10/12 mx-auto text-center grid md:grid-cols-5 gap-6">
          {Products.map((item, index) => {
            const discountedPrice = item.price - (item.price * item.discount) / 100;
            return (
              <div key={index} className="rounded shadow-lg p-2 bg-white">
                <img
                  className="rounded md:w-full shadow-lg md:h-64 mx-auto w-56 h-60 object-cover"
                  src={item.Thumbnail}
                  alt={item.title}
                />
                <span className="block text-xl mt-2 font-semibold">{item.title}</span>
                <div className="space-x-2 mt-1">
                  <label className="font-bold text-bold">Rs.{discountedPrice}</label>
                  <del className="text-red-400">Rs.{item.price}</del>
                  <label className="text-gray-500">{item.discount}% off</label>
                </div>
                <button className="bg-green-400 rounded md:w-full w-60 font-semibold mt-2 p-2">
                  Buy it
                </button>
                <button className="bg-pink-400 rounded md:w-full w-60 font-semibold mt-1 p-2">
                  <i className="ri-shopping-cart-fill"></i> Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </LayoutAll>
  );
};

export default ProductList;
