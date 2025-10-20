import 'remixicon/fonts/remixicon.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import 'animate.css';

// User components
import ProductList from './Component/ProductList';
import Home from './Component/Home';
import NotFound from './Component/Notfound';
import Category from './Component/Category';
import LayoutAll from './Component/LayoutAll';
import SignUp from './Component/SingUp';
import Login from './Component/Login';
import ContactUs from './Component/ContactUs';
import Profile from './Component/Profile';
import Cart from './Component/Cart';
import Cancel from './Component/Page/Cancel';
import Success from './Component/Page/Success';


// Admin components
import Admin from './Component/Admin';
import Order from "./Component/Admin/Order";
import AdminProducts from './Component/Admin/AdminProducts';
import Dashboard from './Component/Admin/Dashboard';
import Settings from './Component/Admin/Settings';
import Payment from './Component/Admin/Payment';
import Customer from './Component/Admin/Customer';

// Auth wrapper
import PreSignLog from './Component/SignLog/PreSignLog';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* Public routes */}
          <Route path='/' element={<Home />} />
          <Route path='/layoutall' element={<LayoutAll />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/category' element={<Category />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />

          {/* Auth routes */}

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />


          {/* Protected Admin routes */}
          <Route path='/admin' element={<PreSignLog />}>

            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path='dashboard' element={<Dashboard />} />
            <Route path='customer' element={<Customer />} />
            <Route path='products' element={<AdminProducts />} />
            <Route path='order' element={<Order />} />
            <Route path='payment' element={<Payment />} />
            <Route path='settings' element={<Settings />} />
            <Route path='auth' element={<Admin />} />
          </Route>

          {/* 404 fallback */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
