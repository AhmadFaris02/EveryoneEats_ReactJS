import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import AddDonation from "./AddDonation";
import HomeDonor from "./HomeDonor";

function MainContentDonor() {
  const location = useLocation();
  return (
    <div
      className="flex-grow-1 d-flex"
      style={{ height: "100%", overflowY: "auto" }}
    >
      {location == "/HomeDonor"}
      <Routes>
        <Route path="/HomeDonor" element={<HomeDonor />} index />
        <Route path="/AddDonation" element={<AddDonation />} />
      </Routes>
    </div>
  );
}

export default MainContentDonor;
