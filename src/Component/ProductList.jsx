import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// import Swiper core and required modules
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import LayoutAll from "./LayoutAll";

const ProductList = ({ children }) => {
    

    const Location = useLocation()

    const Menus = [
        {
            label: 'Home',
            Link: '/'
        },

        {
            label: 'Products',
            Link: '/products'
        },


        {
            label: 'Category',
            Link: '/category'
        },
        {
            label: 'Contact Us',
            Link: '/'
        },
        {
            label: 'Login',
            Link: '/admin/auth'
        },

    ]

    const [Products, setProducts] = useState([
        {
            title: 'Arrival new article ',
            price: '5000',
            discount: '15',
            Thumbnail: '/img/trouser1.jpeg',
        },
        {
            title: 'Arrival new article ',
            price: '5000',
            discount: '15',
            Thumbnail: '/img/trouser2.jpeg',
        },
        {
            title: 'Arrival new article ',
            price: '5000',
            discount: '15',
            Thumbnail: '/img/trouser3.jpeg',
        },
        {
            title: 'Arrival new article ',
            price: '5000',
            discount: '15',
            Thumbnail: '/img/trouser4.jpeg',
        },
        {
            title: 'Arrival new article ',
            price: '5000',
            discount: '15',
            Thumbnail: '/img/trouser5.jpeg',
        },
        {
            title: 'Arrival new article ',
            price: '5000',
            discount: '15',
            Thumbnail: '/img/trouser6.jpeg',
        },
    ])

    
    return (<>
       <LayoutAll> 


        <div className="md:p-10  p-5">
            <h1
                className="text-center text-3xl font-semibold"> All Items</h1>
            <p className="md:w-7/12 mx-auto  text-center  mt-2 mb-8"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus vero beatae explicabo? Maiores minima id eum, ut possimus consequatur laudantium explicabo quae! Omnis soluta iure aut facilis! minima id eum, ut possimus consequatur Excepturi, quam sunt?
            </p>
            <div className="md:w-10/12   mx-auto  text-center grid md:grid-cols-5  gap-6 ">
                {Products.map((items, index) => (
                    <div key={index} className="rounded  shadow-lg "> <img className="rounded md:w-full   shadow-lg md:h-64 mx-auto  w-56 h-60" src={items.Thumbnail} />
                        <span className="text-xl text-center"> {items.title} </span>
                        <div className="space-x-2">
                            <label className="font-bold text-bold"> Rs.{items.price - (items.price * items.discount) / 100} </label>
                            <del className="  text-red-400"> Rs.{items.price} </del>
                            <label className="text-gray-500"> {items.discount}% off </label>
                        </div>
                        <button className="bg-green-400 rounded md:w-full  w-60 font-semibold"> Buy it</button>
                        <button className="bg-pink-400 rounded md:w-full  w-60 font-semibold mt-1"> <i className="ri-shopping-cart-fill"></i> Add to Cart</button>
                    </div>

))}
            </div>

        </div>


       

</LayoutAll>

    </>)
}

export default ProductList
