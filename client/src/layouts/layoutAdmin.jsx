import React from "react";
import { Outlet } from "react-router-dom";
import SideBarAdmin from "../components/admin/sideBarAdmin";
import HeaderAdmin from "../components/admin/headerAdmin";
const layoutAdmin = () => {
  return (
    <div className="flex h-screen">
      <SideBarAdmin />
      <div className="flex-1 flex flex-col">
        <HeaderAdmin />
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default layoutAdmin;
