import React from "react";
import { Link, useLocation } from "react-router-dom";

import { adminLinks } from "../data/links";

import { useGlobalContext } from "../context";

const AdminNav = () => {
  const { pathname } = useLocation();

  const { isAdmin } = useGlobalContext();

  return (
    <nav className="admin-links">
      {isAdmin
        ? adminLinks.map((link, i) => {
            return (
              <Link
                key={i}
                className={`link ${pathname === link.link ? "active" : ""}`}
                to={link.link}
              >
                {link.name}
              </Link>
            );
          })
        : adminLinks.slice(0, 4).map((link, i) => {
            return (
              <Link
                key={i}
                className={`link ${pathname === link.link ? "active" : ""}`}
                to={link.link}
              >
                {link.name}
              </Link>
            );
          })}
    </nav>
  );
};

export default AdminNav;
