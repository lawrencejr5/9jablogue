import React from "react";
import { Link, useLocation } from "react-router-dom";

import { adminLinks } from "../data/links";

const AdminNav = () => {
  const { pathname } = useLocation();
  return (
    <nav className="admin-links">
      {adminLinks.map((link, i) => {
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
