// Import necessary React hooks and React Router components
import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
// import { adminAppConfig } from "../util/firebase-config";


// Layout component that wraps around page content
const Layout = ({ children }) => {
    const [size, setSize] = useState(280)
    // State for controlling mobile sidebar width (0 = closed)
    const [mobSize, setMobSize] = useState(0)
    // State for controlling account dropdown menu visibility
    const [accMenu, setAccMenu] = useState(false)
    // Hook to get current route location
    const location = useLocation()
    const navigate = useNavigate()

    // Effect to close mobile menu when route changes
    useEffect(() => {
        setMobSize(0) // Close mobile sidebar when navigating
    }, [location.pathname]) // Trigger when pathname changes

    // Effect to handle clicking outside account dropdown
    useEffect(() => {
        // Function to close account menu when clicking anywhere
        const handleClickOutside = () => {
            setAccMenu(false)
        }

        // Add event listener only when account menu is open
        if (accMenu) {
            document.addEventListener('click', handleClickOutside)
        }

        // Cleanup function to remove event listener
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [accMenu]) // Re-run when accMenu state changes

    // Array of navigation menu items
    const menus = [
        {
            label: 'Dashboard', // Display text
            icon: <i className="ri-dashboard-horizontal-line"></i>, // Remix icon
            link: '/admin/dashboard' // Route path
        },
        {
            label: 'Customer',
            icon: <i className="ri-shield-user-fill"></i>,
            link: '/admin/customer'
        },
        {
            label: 'Products',
            icon: <i className="ri-shopping-cart-fill"></i>,
            link: '/admin/products'
        },
        {
            label: 'Order',
            icon: <i className="ri-list-ordered-2"></i>,
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

    // Function to handle logout action
    const handleLogout = () => {
        // Close all menus first
        setAccMenu(false)
        setMobSize(0)
        
        // Add actual logout logic here:
        
        // 1. Clear authentication tokens from storage
        localStorage.removeItem('authToken') // Remove token from localStorage
        sessionStorage.removeItem('authToken') // Remove token from sessionStorage
        
        // 2. Clear user data from storage
        localStorage.removeItem('userData')
        
        // 3. Clear any app-specific data if needed
        // localStorage.clear() // Be careful with this as it clears everything
        
        // 4. Call logout API if you have one (optional)
        // await fetch('/api/logout', { method: 'POST' })
        
        // 5. Redirect to login page
        navigate('/login') // Redirect to login page
        
        // 6. Optional: Show success message
        console.log("Logged out successfully")
        
        // 7. Optional: Reset any global state (if using context/Redux)
        // resetUserState()
    }

    // Function to handle account menu toggle with event propagation control
    const handleAccountMenu = (e) => {
        e.stopPropagation() // Prevent event from bubbling up to document
        setAccMenu(!accMenu) // Toggle account menu visibility
    }

    return (
        <>
            <div className="hidden md:block">
                {/* Sidebar for desktop */}

                <aside
                    className="bg-indigo-600 fixed top-0 left-0 h-full overflow-y-auto shadow-lg"
                    style={{ width: `${size}px`, transition: '0.3s ease' }} // Dynamic width with smooth transition
                >
                    {/* Navigation menu container */}
                    <div className="flex flex-col py-4">
                        {/* Map through menu items to create navigation links */}
                        {menus.map((item, index) => (
                            <Link
                                key={index} // Unique key for each list item
                                to={item.link} // Route to navigate to
                                className={`flex items-center px-6 py-3 text-white hover:bg-rose-600 transition-colors duration-200 ${
                                    // Highlight current active route
                                    location.pathname === item.link ? "bg-rose-700" : ""
                                }`}
                            >
                                <span className="mr-3 text-lg">{item.icon}</span> 
                                {item.label} 
                            </Link>
                        ))}
                        
                        {/* Logout button in sidebar */}
                        <button 
                            onClick={handleLogout} 
                            className="flex items-center px-6 py-3 text-white hover:bg-rose-600 transition-colors duration-200 text-left"
                        >
                            <i className="ri-logout-box-r-line mr-3 text-lg"></i> 
                            Logout 
                        </button>
                    </div>
                </aside>

                {/* Main content area that adjusts based on sidebar width */}
                <section 
                    className="min-h-screen bg-gray-50" 
                    style={{
                        marginLeft: size,
                        transition: '0.3s ease' // Smooth transition
                    }}
                >
                    {/* Top navigation bar */}
                    <nav className="bg-white p-1 shadow-md flex items-center justify-between sticky top-0 left-0 z-40">
                        {/* Left section with menu toggle and brand */}
                        <div className="flex gap-3 items-center">
                            <button 
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={() => setSize(size === 280 ? 0 : 280)} // Toggle sidebar width
                                aria-label="Toggle sidebar" // Accessibility label
                            >
                                <i className="ri-menu-line text-2xl text-gray-700"></i> {/* Menu icon */}
                            </button>
                            <h2 className="text-lg font-bold text-gray-800  ">ShopMart</h2> {/* Brand name */}
                        </div>

                        {/* Right section with user account dropdown */}
                        <div className="relative">
                            <button 
                                className="focus:outline-none" // Remove default focus outline
                                onClick={handleAccountMenu} // Attach account menu handler
                                aria-label="Account menu" // Accessibility label
                            >
                                <img 
                                    src="/img/avatar.png" 
                                    className="w-10 h-10 rounded-full border-2 border-gray-300"
                                    alt="User avatar" // Accessibility alt text
                                />
                            </button>
                            
                            {/* Account dropdown menu - conditionally rendered */}
                            {accMenu && (
                                <div className="absolute top-12 right-0 bg-white w-64 p-4 shadow-lg rounded-lg border border-gray-200 z-50">
                                    {/* User info section */}
                                    <div className="text-center mb-3">
                                        <h3 className="font-semibold text-gray-800">Zeeshan Elia</h3> {/* User name */}
                                        <p className="text-sm text-gray-600">example@yahoo.com</p> {/* User email */}
                                    </div>
                                    <hr className="my-2" /> {/* Separator line */}
                                    {/* Logout button in dropdown */}
                                    <button 
                                        onClick={handleLogout} // Attach logout handler
                                        className="flex items-center w-full text-left text-red-600 hover:text-red-800 transition-colors"
                                    >
                                        <i className="ri-logout-box-r-line mr-2"></i> {/* Logout icon */}
                                        Logout {/* Button text */}
                                    </button>
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Main content area for child components */}
                    <div className="p-6">{children}</div> 
                </section>
            </div>




            {/* Mobile Layout - visible on mobile, hidden on medium screens and up */}


            <div className="block md:hidden">
                {/* Overlay for mobile menu - appears when sidebar is open */}
                {mobSize > 0 && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40" // Full screen overlay
                        onClick={() => setMobSize(0)} // Close sidebar when overlay clicked
                    />
                )}
                
                {/* Mobile sidebar */}
                <aside
                    className={`bg-indigo-600 fixed top-0 left-0 h-full overflow-y-auto z-50 transition-all duration-300 ${
                        mobSize === 0 ? 'w-0' : 'w-64' // Conditional width classes
                    }`}
                >
                    <div className="flex flex-col py-4">
                        {/* Close button for mobile sidebar */}
                        <button 
                            onClick={() => setMobSize(0)} // Close sidebar
                            className="self-end mx-6 my-2 p-2 text-white hover:bg-rose-600 rounded-lg transition-colors"
                            aria-label="Close menu" // Accessibility label
                        >
                            <i className="ri-close-line text-xl"></i> {/* Close icon */}
                        </button>

                        {/* Mobile navigation menu items */}
                        {menus.map((item, index) => (
                            <Link
                                key={index} // Unique key for each list item
                                to={item.link} // Route to navigate to
                                className={`flex items-center px-6 py-3 text-white hover:bg-rose-600 transition-colors duration-200 ${
                                    // Highlight current active route
                                    location.pathname === item.link ? "bg-rose-700" : ""
                                }`}
                            >
                                <span className="mr-3 text-lg">{item.icon}</span> {/* Icon with right margin */}
                                {item.label} {/* Menu item label */}
                            </Link>
                        ))}
                        
                        {/* Logout button in mobile sidebar */}
                        <button 
                            onClick={handleLogout} // Attach logout handler
                            className="flex items-center px-6 py-3 text-white hover:bg-rose-600 transition-colors duration-200 text-left"
                        >
                            <i className="ri-logout-box-r-line mr-3 text-lg"></i> {/* Logout icon */}
                            Logout {/* Button text */}
                        </button>
                    </div>
                </aside>

                {/* Mobile main content area */}
                <section className="min-h-screen bg-gray-50">
                    {/* Mobile top navigation bar */}
                    <nav className="bg-white p-4 shadow-md flex items-center justify-between sticky top-0 left-0 z-30">
                        {/* Left section with menu toggle and brand */}
                        <div className="flex gap-3 items-center">
                            <button 
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={() => setMobSize(mobSize === 0 ? 280 : 0)} // Toggle mobile sidebar
                                aria-label="Toggle menu" // Accessibility label
                            >
                                <i className="ri-menu-line text-2xl text-gray-700"></i> {/* Menu icon */}
                            </button>
                            <h2 className="text-lg font-semibold text-gray-800">ShopMart</h2> {/* Brand name */}
                        </div>

                        {/* Right section with user account dropdown */}
                        <div className="relative">
                            <button 
                                className="focus:outline-none" // Remove default focus outline
                                onClick={handleAccountMenu} // Attach account menu handler
                                aria-label="Account menu" // Accessibility label
                            >
                                <img 
                                    src="/img/avatar.png" 
                                    className="w-10 h-10 rounded-full border-2 border-gray-300"
                                    alt="User avatar" // Accessibility alt text
                                />
                            </button>
                            
                            {/* Account dropdown menu - conditionally rendered */}
                            {accMenu && (
                                <div className="absolute top-12 right-0 bg-white w-64 p-4 shadow-lg rounded-lg border border-gray-200 z-50">
                                    {/* User info section */}
                                    <div className="text-center mb-3">
                                        <h3 className="font-semibold text-gray-800">Zeeshan Elia</h3> {/* User name */}
                                        <p className="text-sm text-gray-600">example@yahoo.com</p> {/* User email */}
                                    </div>
                                    <hr className="my-2" /> {/* Separator line */}
                                    {/* Logout button in dropdown */}
                                    <button 
                                        onClick={handleLogout} // Attach logout handler
                                        className="flex items-center w-full text-left text-red-600 hover:text-red-800 transition-colors"
                                    >
                                        <i className="ri-logout-box-r-line mr-2"></i> {/* Logout icon */}
                                        Logout {/* Button text */}
                                    </button>
                                </div>
                            )}
                        </div>
                    </nav>
                    {/* Mobile main content area for child components */}
                    <div className="p-4">{children}</div> {/* Render child components */}
                </section>
            </div>
        </>
    )
}

export default Layout