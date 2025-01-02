import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const Layout = ({ children }) => {
    const [Size, setSize] = useState(280)
    const [mobSize, setMobSize] = useState(0)
    const [AccMenu, setAccMenu] = useState(true)
    const Location = useLocation()

    const Menus = [
        {
            label: 'Dashboard',
            icon: <i className="ri-dashboard-horizontal-line"></i>,
            link: '/admin/dashboard'
        },
        {
            label: 'Customer',
            icon: <i className="ri-shield-user-fill"></i>,
            link: '/admin/customer'
        },
        {
            label: 'Products',
            icon: <i className="ri-shopping-cart-fill"> </i>,
            link: '/admin/products'
        },
        {
            label: 'Order',
            icon: <i className="ri-list-ordered-2 mr-1">  </i>,
            link: '/admin/order'
        },
        {
            label: 'Payment',
            icon: <i className="ri-money-dollar-box-line"></i>,
            link: '/admin/payment'
        },
        {
            label: 'Settings',
            icon: <i className="ri-settings-3-fill"></i>,
            link: '/admin/settings'
        }

    ]

    return (<>   {/* {Destop} */}
        <div className="md:block hidden" >
            <aside
                className="bg-indigo-400 fixed top-0 left-0 h-full overflow-hidden"
                style={{ width: `${Size}px`, transition: '.3s' }} >
                <div className=" flex flex-col">
                    {
                        Menus.map((item, index) => (
                            <Link key={index} to={item.link} className="px-7 py-2 text-white p-4 hover:bg-rose-800 hover:text-white" style={{
                                background: (Location.pathname === item.link) ? "red" : 'transparent'
                            }}> {item.icon} {item.label} </Link>
                        ))}



                    <button className="px-7 text-left py-2 text-white p-4 hover:bg-rose-800 hover:text-white" > <i className="ri-shield-user-fill"></i> Logout</button>
                </div>
            </aside>

            <section className="bg-pink-200 h-screen"
                style={{
                    marginLeft: Size,
                    transition: '0.3s'
                }}>

                <nav className="bg-slate-400 p-3 shadow flex  items-center justify-between sticky top-0 left-0" >
                    <div className=" flex gap-2  ">
                        <button className=" hover:bg-sky-100 hover:text-white"
                            onClick={() => setSize(Size === 280 ? 0 : 280)}>
                            <i className="ri-menu-search-line  text-2xl" >  </i>
                        </button>
                        <h2 className="text-md font-semibold items-center"> ShopMart </h2>
                    </div>

                    <div>
                        <button className="relative">
                            <img src="/img/avatar.png" className="w-9 h-9 rounded-full"
                                onClick={() => setAccMenu(AccMenu === true ? false : true)} />
                            {AccMenu &&
                                <div className="absolute top-14 right-0 bg-white w-[200px] p-5 shadow-lg">
                                    <div>
                                        <h3> Zeeshan Elia </h3>
                                        <p> Example@yahoo.com</p>
                                        <hr />
                                        <i className="ri-logout-box-r-line"> Logout </i>
                                    </div>
                                </div>
                            }
                        </button>
                    </div>
                </nav>
                <div className='p-1 m-2'>  {children} </div>
            </section>
        </div>

     {/* {Responsive} */}
<div className="block sm:hidden" >
    <aside
        className={`bg-indigo-400 z-50 fixed top-0 left-0 overflow-hidden transition-all duration-300 ${mobSize === 0 ? 'w-0' : 'w-64'}`}>
        <div className="flex flex-col">
            <button onClick={() => setMobSize(mobSize === 0 ? 280 : 0)}
                className="text-left mx-7 mt-6">
                <i className="ri-menu-search-line text-xl text-white"></i>
            </button>

            {Menus.map((item, index) => (
                <Link key={index} to={item.link} className="px-7 py-2 text-white p-4 hover:bg-rose-800 hover:text-white" style={{
                    background: (Location.pathname === item.link) ? "red" : 'transparent'
                }}> {item.icon} {item.label} </Link>
            ))}

            <button className="px-7 text-left py-2 text-white p-4 hover:bg-rose-800 hover:text-white">
                <i className="ri-shield-user-fill"></i> Logout
            </button>
        </div>
    </aside>

    <section className="bg-pink-200 h-screen flex-1 ml-0 sm:ml-64 transition-all duration-300">
        <nav className="bg-slate-400 p-5 shadow flex items-center justify-between sticky top-0 left-0">
            <div className="flex gap-2">
                <button className="hover:bg-sky-100 hover:text-white"
                    onClick={() => setMobSize(mobSize === 0 ? 280 : 0)}>
                    <i className="ri-menu-search-line text-2xl"></i>
                </button>
                <h2 className="text-md font-semibold items-center"> ShopMart </h2>
            </div>

            <div>
                <button className="relative">
                    <img src="/img/avatar.png" className="w-8 h-8 rounded-full"
                        onClick={() => setAccMenu(AccMenu === true ? false : true)} />
                    {AccMenu &&
                        <div className="absolute top-14 right-0 bg-white w-[200px] p-5 shadow-lg">
                            <div>
                                <h3> Zeeshan Elia </h3>
                                <p> Example@yahoo.com</p>
                                <hr />
                                <i className="ri-logout-box-r-line"> Logout </i>
                            </div>
                        </div>
                    }
                </button>
            </div>
        </nav>
        <div className='p-1 m-2'> {children} </div>
    </section>
</div>

</>)}

export default Layout
