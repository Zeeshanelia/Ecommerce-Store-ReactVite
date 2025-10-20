Ecommerce-Store-ReactVite:
is a modern and responsive e-commerce web application built using React and Vite, providing a smooth and fast user experience. The application allows users to browse products, add them to a shopping cart, and proceed through a simple checkout process. 


Stripe Payment Gateways:
   redirectToCheckout with a pre-created price ID to enhance user exprince 


SingUp LogIn and LogOut:
   This project implements user authentication using Firebase Authentication.
   Users can securely singup or login   and log-out with email and password.
   Firebase handles session management and security features.
   Ideal for apps needing simple and reliable user authentication.

Responsive Design:
   Fully responsive to ensure a seamless shopping experience on desktops, tablets, and mobiles.
   Product Listing: Displays a catalog of products with features like filtering and sorting.



Shopping Cart: 
    Allows users to add, remove, and update products in the cart with real-time updates.


    
Mock Data:
    Includes sample product data to showcase the functionality (can be replaced with real backend integration).


React-Apexcharts:
    Using ApexCharts to create charts interactive data visualization.
    Easily render responsive charts like line, bar, pie, and more.
    Charts are customizable with real-time data support.
    Ideal for dashboards and analytics in React applications.



Vite: 
 Provides lightning-fast hot-reloading and optimized production builds, making development smoother and faster.


1. User clicks "Logout" button
   ↓
2. handleLogout() function runs
   ↓
3. Closes all menus (setAccMenu(false), setMobSize(0))
   ↓
4. Removes auth data from browser storage
   ↓
5. navigate('/login') redirects to login page
   ↓
6. User sees login page instead of admin dashboard