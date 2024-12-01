import React from "react";
import { links } from "../data/links";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
const Sidenav = () => {
  const { sideNavOpen, closeSideNav } = useGlobalContext();
  return (
    <aside
      className={sideNavOpen ? "sidenav-container" : "sidenav-container-close"}
    >
      <div className="sidenav">
        <div className="header">
          <Logo />
          <button className="close-sidenav" onClick={closeSideNav}>
            <FaTimes />
          </button>
        </div>
        {links.slice(0, 6).map((link, index) => {
          const { name, linkto, icon } = link;
          return (
            <Link
              to={linkto}
              key={index}
              onClick={closeSideNav}
              className="sidenav-link"
            >
              <span>
                <i>{icon}</i> {name}
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidenav;
