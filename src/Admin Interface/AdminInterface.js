import React from "react";
import AdminNavbar from "./Admin Navbar/AdminNavbar";
import { Outlet } from "react-router-dom";

function AdminInterface() {
  return (
    <div>
      <AdminNavbar />
      <Outlet />
    </div>
  );
}

export default AdminInterface;
