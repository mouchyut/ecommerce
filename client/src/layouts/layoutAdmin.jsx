import React from 'react'
import { Outlet } from 'react-router-dom'

const layoutAdmin = () => {
  return (
    <div>
      <h1>Sidebar</h1>
      <h1>Header</h1>
      <hr/>
      <Outlet/>
    </div>
  )
}

export default layoutAdmin
