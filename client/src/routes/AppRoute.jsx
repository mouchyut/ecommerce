// rafce
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/home";
import Shop from "../pages/shop";
import Cart from "../pages/cart";
import History from "../pages/history";
import Checkout from "../pages/checkout";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Layout from "../layouts/layout";
import LayoutAdmin from "../layouts/layoutAdmin";
import Dasboard from "../pages/admin/dasboard";
import Product from "../pages/admin/product";
import Category from "../pages/admin/category";
import Manage from "../pages/admin/manage";
import LayoutUser from "../layouts/layoutUser";
import HomeUser from "../pages/user/homeUser"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
      { path: "history", element: <History /> },
      { path: "checkout", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <Dasboard /> },
      { path: "category", element: <Category /> },
      { path: "product", element: <Product /> },
      { path: "manage", element: <Manage /> },
    ],
  },
  {
    path: "/user",
    element:<LayoutUser/>,
    children:[
      {index:true, element:<HomeUser/>},
   
    ]
  }
]);


const AppRoute = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRoute;
