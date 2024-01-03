import React from "react";
import CommunityNavbar from "./Community Navbar/CommunityNavbar";
import { Outlet } from "react-router-dom";

function CommunityInterface() {
  return (
    <div>
      <CommunityNavbar />
      <Outlet />
    </div>
  );
}

export default CommunityInterface;
