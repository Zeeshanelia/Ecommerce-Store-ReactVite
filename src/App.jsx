import 'remixicon/fonts/remixicon.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import 'animate.css';
import ProductList from './Component/ProductList'
import Home from './Component/Home'
import NotFound from './Component/Notfound'
import Category from './Component/Category'
import LayoutAll from './Component/LayoutAll'
import SignUp from './Component/SingUp'
import Login from './Component/Login'
import ContactUs from './Component/ContactUs';
import Admin from './Component/Admin'
import Order from "./Component/Admin/Order"
import AdminProducts from './Component/Admin/AdminProducts'
import Dashboard from './Component/Admin/Dashboard'
import Settings from './Component/Admin/Settings'
import Payment from './Component/Admin/Payment'
import Customer from './Component/Admin/Customer'
import PreSignLog from './Component/SignLog/PreSignLog';
import Profile from './Component/Profile';
import Cart from './Component/Cart';
function App() {

  return (<>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/layoutall' element={<LayoutAll/>}/>
        <Route path='/contact-us' element={< ContactUs/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path='/products' element={<ProductList/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/profile' element={<Profile/>}/>

        <Route element={<PreSignLog />} >
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        </Route>

        <Route path='/admin' >
          <Route path='customer' element={<Customer />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='order' element={<Order />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='payment' element={<Payment />} />
          <Route path='settings' element={<Settings />} />
          <Route path='auth' element={<Admin />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
