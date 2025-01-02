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
        <nav className="bg-slate-400 p-2 shadow-lg sticky top-0" >

            <div className=" flex justify-between gap-1 mr-10 items-center">
                <button className=" flex items-center gap-2  ml-9 ">
                    <img src="/img/shopping.png" className=" w-14 items-center" />
                    <h2 className="text-md "> Shoping Club </h2>
                </button>





                <div className=" flex  gap-5   ">
                    {
                        Menus.map((item, index) => (
                            <Link key={index} to={item.Link} className=" px-2 py-2 text-white p-4 hover:bg-rose-800 hover:text-white justify-end " >  {item.label}
                            </Link>
                        ))}
                    <Link className="bg-blue-500 px-6 py-2 hover:bg-rose-800 hover:text-white  items-center font-semibold rounded ">
                        Sign Up </Link>
                </div>
            </div>
        </nav>


        <div className="md:p-10  p-5">
            <h1
                className="text-center text-3xl font-semibold"> All Items</h1>
            <p className="md:w-7/12 mx-auto  text-center  mt-2 mb-8"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus vero beatae explicabo? Maiores minima id eum, ut possimus consequatur laudantium explicabo quae! Omnis soluta iure aut facilis! minima id eum, ut possimus consequatur Excepturi, quam sunt?
            </p>
            <div className="w-10/12 mx-auto   text-center md:grid grid-cols-5 md:gap-4 space-y-7">
                {Products.map((items, index) => (
                    <div key={index} className="rounded  shadow-lg "> <img className="rounded w-full shadow-lg h-64" src={items.Thumbnail} />
                        <span className="text-xl text-center"> {items.title} </span>
                        <div className="space-x-2">
                            <label className="font-bold text-bold"> Rs.{items.price - (items.price * items.discount) / 100} </label>
                            <del className="  text-red-400"> Rs.{items.price} </del>
                            <label className="text-gray-500"> {items.discount}% off </label>
                        </div>
                        <button className="bg-green-400 rounded w-full font-semibold"> Buy it</button>
                    </div>

                ))}
            </div>

        </div>


        <footer className="bg-orange-200 md:h-64">
            <div className="md:w-10/12 mx-auto px-5 md:grid grid-cols-4 gap-3 ">
                <div>
                    <h1 className="text-2xl m-3 mt-4"> Product Detail </h1>
                    <p className="text-md mb-3"> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, cumque aliquam, possimus non ut s! </p>
                    <img src="/img/shopping.png" className=" w-20 items-center" />
                </div>

                <div className="list-none ">
                    <h1 className="text-2xl mt-4"> Product Detail </h1>
                    {
                        Menus.map((item, index) => (
                            <li key={index} > <Link to={item.Link} className=" px-1 hover:bg-rose-800 hover:text-white list-none " >  {item.label}
                            </Link>
                            </li>
                        ))
                    }
                </div>

                <div className="list-none">
                    <h1 className="text-2xl mt-4"> Follow Us </h1>
                    <ul  >
                        <li className=" flex flex-col px-1 w-24 ">
                            <Link className="hover:bg-rose-800 hover:text-white " to='/'> Facebook </Link>
                            <Link className="hover:bg-rose-800 hover:text-white" to='/'> Instagram </Link>
                            <Link className="hover:bg-rose-800 hover:text-white" to='/'> Twiter </Link>
                            <Link className="hover:bg-rose-800 hover:text-white" to='/'> Linkd In </Link>
                            <Link className="hover:bg-rose-800 hover:text-white" to='/'> Dailymotion </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h1 className="text-2xl mt-4"> Contact Us</h1>
                    <form className="space-y-2">
                        <input required type="text" name="fullname" placeholder="Enter Your Name" className="bg-white w-full rounded p-1" />
                        <input required type="text" name="email" placeholder="Enter Email Here" className="bg-white w-full rounded p-1" />

                        <textarea name="message" placeholder="Type Message Here" className="bg-white w-full rounded" rows={3}></textarea>
                        <button className="p-2 bg-slate-400 rounded justify-center   items-center font-semibold ">Submit</button>
                    </form>

                </div>
            </div>
        </footer>



    </>)
}

export default ProductList
