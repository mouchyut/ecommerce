import React from 'react'
import { Outlet } from 'react-router-dom'

const layoutUser = () => {
  return (
    <div>
      <h1>Layout User</h1>
      <hr/>
      <Outlet/>
    </div>
  )
}

export default layoutUser
