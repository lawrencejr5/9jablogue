import React from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

import Logo from "./Logo";
import Logo2 from "./Logo2";

import { links } from "../data/links";

import { useGlobalContext } from "../context";
import Sidenav from "./Sidenav";

const Navbar = ({ color }) => {
  const { openSideNav, closeSideNav, sideNavOpen } = useGlobalContext();
  return (
    <nav className="nav">
      <div className="nav-center">
        {color == "black" ? <Logo2 /> : <Logo />}
        <div className="menu-wide">
          {links.map((link, index) => {
            const { name, linkto, icon } = link;
            return (
              <Link
                to={linkto}
                key={index}
                onClick={closeSideNav}
                className="link"
              >
                <span>{name}</span>
              </Link>
            );
          })}
        </div>
        <div className="menu" onClick={openSideNav}>
          <span>Menu</span>
          <FaBars />
        </div>
      </div>
      {/* Sidenav for sm screens */}
      <Sidenav />
    </nav>
  );
};

export default Navbar;
