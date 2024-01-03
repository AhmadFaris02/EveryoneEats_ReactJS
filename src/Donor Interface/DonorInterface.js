import React from "react";
import DonorNavbar from "./Donor Navbar/DonorNavbar";
import { Outlet } from "react-router-dom";

function DonorInterface() {
  return (
    <div>
      <DonorNavbar />
      <Outlet />
    </div>
  );
}

export default DonorInterface;
