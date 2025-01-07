import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import appConfig from "../util/firebase-config";


const LayoutAll = ({ children }) => {
    const auth = getAuth(appConfig);
    const [open, setOpen] = useState(false)
    const navigat = useNavigate()
    const [session, setSession] = useState(null)

useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setSession(user)
        } else {
            setSession(null)
        }
    });
      // Cleanup subscription on unmount
      
}, [])

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

    const moblieLink = (href) => {
        setOpen(false)
        navigat(href)
    }
    return (<>
        <nav className="bg-slate-400 p-2 shadow-lg sticky top-0 break-words" >

            <div className=" flex justify-between gap-1 mr-10 items-center">
                <button className=" flex items-center gap-2  ml-9 ">
                    <img src="/img/shopping.png" className=" w-14 items-center" />
                    <h2 className="text-md "> Shoping Club </h2>
                </button>

                {/* For Mobile Nav Button */}
                <button className="md:hidden"
                    onClick={() => setOpen(!open)} >
                    <i className="ri-menu-search-line text-3xl"></i>
                </button>



                <div className=" md:flex hidden gap-5   ">
                    {
                        Menus.map((item, index) => (
                            <Link key={index} to={item.Link} className=" px-2 py-2 text-white p-4 hover:bg-rose-800 hover:text-white justify-end " >  {item.label}
                            </Link>
                        ))}


                    {

                        !session &&
                        <>
                            <Link to={"/login"} className="bg-pink-500 hover:bg-rose-800 px-6 py-2  items-center font-semibold rounded ">
                                Login </Link>
                            
                            <Link to={"/signup"} className="bg-blue-500 px-6 py-2 hover:bg-rose-800 hover:text-white  items-center font-semibold rounded ">
                                Sign Up </Link>
                    </>}
                </div>
            </div>
        </nav>

        <div> {children}</div>

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

        }
    </>)
}

export default LayoutAll
