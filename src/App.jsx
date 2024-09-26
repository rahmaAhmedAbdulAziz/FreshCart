import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Products from './Components/Products/Product'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import NotFound from './Components/NotFound/NotFound'
import CounterContextProvider from './Components/Context/CounterContextProvider'
import AuthContextProvider from './Components/Context/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProtectAuthRoutes from './Components/ProtectAuthRoutes/ProtectAuthRoutes'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify'
import ShippingAddress from './Components/ShippingAddress/ShippingAddress'
import Orders from './Components/Orders/Orders'
import WhishList from './Components/WishList/WhishList'

function App() {

  const route = createBrowserRouter([
    {
      path:'' , element:<Layout/>, children:[
      {index: true , element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'register', element:<ProtectAuthRoutes><Register/></ProtectAuthRoutes>},
      {path:'login', element:<ProtectAuthRoutes><Login/></ProtectAuthRoutes> },
      {path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'WishList', element:<ProtectedRoute><WhishList/></ProtectedRoute>},

      {path:'products', element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'categories', element:<ProtectedRoute><Categories/></ProtectedRoute> },
      {path:'brands', element: <ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'shippingAddress/:cartId', element: <ProtectedRoute><ShippingAddress/></ProtectedRoute>},
      {path:'allorders', element: <ProtectedRoute><Orders/></ProtectedRoute>},

      {path:'productDetails/:id', element: <ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'*', element:<NotFound/>},
    ] }
  ])

  return (
    <>
    <AuthContextProvider>
    <CounterContextProvider>
    <RouterProvider router={route}></RouterProvider>
    <ToastContainer />
    </CounterContextProvider>
    </AuthContextProvider>
    </>
  )
}

export default App
