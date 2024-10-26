import React from "react";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

import Logo from "./Logo";
import Logo2 from "./Logo2";

import { links } from "../data/links";

import { useGlobalContext } from "../context";
import Sidenav from "./Sidenav";

const Navbar = ({ color }) => {
  const { openSideNav, closeSideNav } = useGlobalContext();
  const { pathname } = useLocation();

  return (
    <nav className="user-nav">
      <div className="nav-center">
        {color == "black" ? <Logo2 /> : <Logo />}
        <div className="menu-wide">
          {links.slice(0, 4).map((link, index) => {
            const { name, linkto, icon } = link;
            return (
              <Link
                to={linkto}
                key={index}
                onClick={closeSideNav}
                className={`link ${pathname === linkto ? "active" : ""}`}
              >
                <span style={{ display: "flex", alignItems: "center" }}>
                  {icon}&nbsp;
                  {name}
                </span>
              </Link>
            );
          })}
        </div>
        <div className="menu" onClick={openSideNav}>
          <span>Menu</span>
          <FaBars size={16} />
        </div>
      </div>
      {/* Sidenav for sm screens */}
      <Sidenav />
    </nav>
  );
};

export default Navbar;
