import React from "react";
import { FaBars } from "react-icons/fa";
import Logo from "./Logo";
import Logo2 from "./Logo2";

import { useGlobalContext } from "../context";

const Navbar = ({ color }) => {
  const { openSideNav } = useGlobalContext();
  return (
    <>
      <nav className="nav">
        <div className="nav-center">
          {color == "black" ? <Logo2 /> : <Logo />}
          <div className="menu" onClick={openSideNav}>
            <span>Menu</span>
            <FaBars />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
