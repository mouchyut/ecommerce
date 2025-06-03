// rafce = react arrow function component export
import React from 'react'
import AppRoute from './routes/AppRoute'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  // javascript

  return (
    <>
      <ToastContainer/>
      <AppRoute />
    </>
  )
}

export default App
