import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from '../components/mainNav'
const layout = () => {
  return (
    <div>
      <MainNav/>
      <hr />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default layout;
