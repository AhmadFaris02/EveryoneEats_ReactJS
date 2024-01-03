import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import DonorNavbar from "./Donor Navbar/DonorNavbar";
import HomeDonor from "./HomeDonor";
import AddDonation from "./AddDonation";
import "./DonorInterface.css";

function DonorMainContent() {
  const location = useLocation();
  return (
    <div>
      {location.pathname === "/DonorInterface" && <DonorNavbar />}
      <Routes>
        <Route path="/HomeDonor" element={<HomeDonor />} index />
        <Route path="/AddDonation" element={<AddDonation />} />
      </Routes>
    </div>
  );
}

export default DonorMainContent;
