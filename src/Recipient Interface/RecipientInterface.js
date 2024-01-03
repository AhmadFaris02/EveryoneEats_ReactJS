import React from "react";
import RecipientNavbar from "./Recipient Navbar/RecipientNavbar";
import { Outlet } from "react-router-dom";

function RecipientInterface() {
  return (
    <div>
      <RecipientNavbar />
      <Outlet />
    </div>
  );
}

export default RecipientInterface;
