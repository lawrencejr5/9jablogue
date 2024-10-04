import React from "react";
import { Link } from "react-router-dom";
import { adminLinks } from "../data/links";

const AdminNav = () => {
  return (
    <nav>
      {adminLinks.map((link) => {
        return <Link to={link.link}>{link.name}</Link>;
      })}
    </nav>
  );
};

export default AdminNav;
