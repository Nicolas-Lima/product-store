import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import RegisterSeller from '../pages/RegisterSeller'
import Product from '../pages/Product'
import Error from '../pages/Error'
import List from '../pages/List'
import Cart from '../pages/Cart'
import Orders from '../pages/Orders'
import BuyProduct from '../pages/BuyProduct'
import TrackOrder from '../pages/TrackOrder'
import Settings from '../pages/Settings'
import Sell from '../pages/Sell'
import SellerTermsAndConditions from '../pages/SellerTermsAndConditions'
import Private from './Private'

import FormProvider from '../contexts/form'

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <FormProvider>
            <Login />
          </FormProvider>
        }
      />
      <Route
        path="/register"
        element={
          <FormProvider>
            <Register />
          </FormProvider>
        }
      />
      <Route
        path="/registerSeller"
        element={
          <Private>
            <RegisterSeller />
          </Private>
        }
      />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/list" element={<List />} />
      <Route
        path="/cart"
        element={
          <Private>
            <Cart />
          </Private>
        }
      />
      <Route
        path="/buyProduct/:id/:productAmount?"
        element={
          <Private>
            <BuyProduct />
          </Private>
        }
      />
      <Route
        path="/orders"
        element={
          <Private>
            <Orders />
          </Private>
        }
      />
      <Route
        path="/trackOrder/:trackingId"
        element={
          <Private>
            <TrackOrder />
          </Private>
        }
      />
      <Route
        path="/settings"
        element={
          <Private>
            <Settings />
          </Private>
        }
      />
      <Route
        path="/sell"
        element={
          <Private>
            <Sell />
          </Private>
        }
      />
      <Route
        path="/sellerTermsAndConditions"
        element={<SellerTermsAndConditions />}
      />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default RoutesApp
