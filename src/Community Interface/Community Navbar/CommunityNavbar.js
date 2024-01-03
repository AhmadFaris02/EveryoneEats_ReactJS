import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAuthContext from "../../Login Page/UserAuthContext";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { CommunitySidebarData } from "./CommunitySidebarData";
import "../../Navbar.css";
import { IconContext } from "react-icons";

function CommunityNavbar() {
  const [sidebar, setSidebar] = useState(false);
  const { logout } = UserAuthContext();
  const Navigate = useNavigate();

  const userLogout = async () => {
    try {
      await logout();
      Navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{ color: "fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <li>
              {CommunitySidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </li>
            <li className="logout-button" onClick={userLogout}>
              <CiLogout />
              <span>Logout</span>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default CommunityNavbar;
