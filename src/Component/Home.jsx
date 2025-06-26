import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { getFirestore, addDoc, collection } from "firebase/firestore";
import firebaseAppConfig from "../util/firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Swal from 'sweetalert2';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// import Swiper core and required modules
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import LayoutAll from "./LayoutAll";


const Home = ({ children }) => {
    const [open, setOpen] = useState(false)
    const navigat = useNavigate()
    const Location = useLocation()
    const db = getFirestore(firebaseAppConfig)
    const auth = getAuth(firebaseAppConfig)
    const [session, setSession] = useState(null)
    const [updateLayoutAllUi, setUpdateLayoutAllUi] = useState(false)
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSession(user)
            }
            else {
                setSession(null)
            }
        })
    }, [])


    const addToCart = async (product) => {
        try {
            setLoading(true);
            if (!session) {
                throw new Error("You must be logged in to add items to the cart.");
            }
            product.userId = session.uid; // Add userId to the product
            product.id = Date.now().toString(); // Generate a unique ID for the product 
            await addDoc(collection(db, "cart"), product);
            setUpdateLayoutAllUi(!updateLayoutAllUi);
            // Check if the product already exists in the cart
            // const cartQuery = collection(db, "cart");
            // const existingCartItems = await cartQuery.get();
            // const existingProduct = existingCartItems.docs.find(doc => doc.data().title === product.title && doc.data().userId === session.uid);
            // if (existingProduct) {
            //     throw new Error("This product is already in your cart.");
            // }   
            // // Add the product to the cart
            // product.id = Date.now().toString(); // Generate a unique ID for the product


            // Update the cart count
            // Assuming you have a way to get the current cart count, you can update it here
            // setCartCount(cartCount + 1); // Update cart count
            // setLoading(false);
            // Use Swal.fire() for the success message
            // Use Swal constructor for the success message

            new Swal({
                title: "Product Added",
                text: "Product added to cart successfully",
                icon: "success",
                confirmButtonText: "OK"
            });

        } catch (error) {
            console.error("Error adding product to cart: ", error);
            // Use Swal.fire() for the error message
            new Swal({
                title: "Error",
                text: error.message,
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    }




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
            Link: '/contact-us'
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
        {
            title: 'Arrival new article ',
            price: '5000',
            discount: '15',
            Thumbnail: '/img/trouser7.jpeg',
        },
        {
            title: 'Arrival new article ',
            price: '5000',
            discount: '15',
            Thumbnail: '/img/trouser8.jpeg',
        },
        {
            title: 'Arrival new article ',
            price: '5000',
            discount: '15',
            Thumbnail: '/img/trouser9.jpeg',
        },
        {
            title: 'Arrival new article ',
            price: '5000',
            discount: '15',
            Thumbnail: '/img/trouser10.jpeg',
        },
        {
            title: 'Arrival new article ',
            price: '5000',
            discount: '15',
            Thumbnail: '/img/trouser11.jpeg',
        },
        {
            title: 'Arrival new article ',
            price: '5000',
            discount: '15',
            Thumbnail: '/img/trouser18.jpeg',
        },
        {
            title: 'Arrival new article ',
            price: '5000',
            discount: '15',
            Thumbnail: '/img/trouser19.jpeg',
        },
        {
            title: 'Arrival new article ',
            price: '5000',
            discount: '15',
            Thumbnail: '/img/trouser20.jpeg',
        },
        {
            title: 'Arrival new article ',
            price: '5000',
            discount: '15',
            Thumbnail: '/img/trouser21.jpeg',
        },
        {
            title: 'Arrival new article ',
            price: '5000',
            discount: '15',
            Thumbnail: '/img/trouser24.jpeg',
        },
        {
            title: 'Arrival new article ',
            price: '5000',
            discount: '15',
            Thumbnail: '/img/trouser15.jpeg',
        },
        {
            title: 'Arrival new article ',
            price: '5000',
            discount: '15',
            Thumbnail: '/img/trouser16.jpeg',
        },
        {
            title: 'Arrival new article ',
            price: '5000',
            discount: '15',
            Thumbnail: '/img/trouser17.jpeg',
        },
    ])

    const moblieLink = (href) => {
        setOpen(false)
        navigat(href)
    }

    return (<>

        <LayoutAll updateLayoutAllUi={updateLayoutAllUi}>






            <Swiper
                modules={[Navigation, Pagination]}
                className=" md:w-full"
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
            >
                <SwiperSlide><img className="md:h-[14.5rem] h-32"
                    src="/img/swiper3.webp" /></SwiperSlide>
                <SwiperSlide><img className="md:h-[14.5rem] h-32"
                    src="/img/swiper5.webp" /></SwiperSlide>
                <SwiperSlide><img className="md:h-[14.5rem] h-32"
                    src="/img/swiper1.webp" /></SwiperSlide>
                <SwiperSlide><img className="md:h-[14.5rem] h-32"
                    src="/img/swiper2.webp" /></SwiperSlide>

            </Swiper>


            <div className="p-10">
                <h1
                    className="text-center text-3xl font-semibold"> Latest Items</h1>
                <p className="w-7/12 mx-auto  text-center  mt-2 mb-8"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus vero beatae explicabo? Maiores minima id eum, ut possimus consequatur laudantium explicabo quae! Omnis soluta iure aut facilis! minima id eum, ut possimus consequatur Excepturi, quam sunt?
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

                            <button onClick={() => addToCart(items)} className="bg-pink-400 rounded md:w-full  w-60 font-semibold mt-1"> <i className="ri-shopping-cart-fill"></i> Add to Cart</button>
                        </div>

                    ))}
                </div>

            </div>

        </LayoutAll>

        <footer className="bg-orange-200  md:h-64">
            <div className="md:w-10/12 mx-auto px-5 grid md:grid-cols-4 md:gap-3 ">
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

        {
            // open &&
            <aside className="overflow-hidden bg-slate-700 md:hidden h-96 z-50 fixed top-0 left-0 w-[110px]" style={{
                width: (open ? 110 : 0), transition: "0.4s"
            }}> <div className="flex flex-col gap-1 py-24 gap-3  text-white"> {
                Menus.map((item, index) => (
                    <button onClick={() => moblieLink(item.Link)} className="text-white" key={index}>
                        {item.label}
                    </button>
                ))
            }
                </div>
            </aside>
        }  </>)
}
export default Home
