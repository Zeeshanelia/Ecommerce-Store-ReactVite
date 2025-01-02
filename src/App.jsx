import 'remixicon/fonts/remixicon.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Order from "./Component/Admin/Order"
import NotFound from './Component/Notfound'
import Products from './Component/Admin/Products'
import Category from './Component/Category'
import ProductList from './Component/ProductList'
import Dashboard from './Component/Admin/Dashboard'
import Settings from './Component/Admin/Settings'
import Payment from './Component/Admin/Payment'
import Customer from './Component/Admin/Customer'
import Admin from './Component/Admin'
import Home from './Component/Home'
import LayoutAll from './Component/LayoutAll'
function App() {

  return (<>
    <BrowserRouter>
      <Routes>
        <Route path='/LayoutAll' element={ <LayoutAll/>} />.
        <Route path='/category' element={<Category />} />
      <Route path='/products' element={<ProductList />} />
        <Route path='/' element={<Home />} />
        <Route path='/admin' >
          <Route path='customer' element={<Customer />} />
          <Route path='products' element={<Products />} />
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
