import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Category from './Category';



const LayoutAll = ({ children ,Category}) => {

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
            Link: '/admin/auth'
        },
        {
            label: 'Login',
            Link: '/admin/auth'
        },

    ]

   

    return (<>
        <nav className="bg-slate-400 p-2 shadow-lg sticky top-0 break-words" >

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

        


        <footer className="bg-orange-200 h-64">
            <div className="w-10/12 mx-auto px-5 grid grid-cols-4 gap-3 ">
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
    {/* rendring a stuff with prop category data */}
        <div className='md:p-16 p-8'>
                <div className='md:w-10/12 mx-auto grid md:grid-cols-3 lg:grid-cols-4 md:gap-16  gap-8'>
                    {Category.map((item, index) => (
                        <div key={index} className='hover:bg-orange-600 hover:text-white border rounded-lg bg-white shadow-lg flex flex-col p-8 justify-center items-center'>
                            <i className="ri-menu-search-line  text-2xl md:text-3xl lg:text-4xl"></i>
                            <h1>test</h1>
                            <h1 className='text-xl font-semibold'>{item.title}</h1>
                        </div>
                    ))}
                </div>
            </div>
    </>)
}

export default LayoutAll
