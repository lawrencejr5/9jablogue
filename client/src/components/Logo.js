import React from "react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      className="logo"
      onClick={() => navigate("/")}
      style={{ cursor: "pointer" }}
    >
      <span className="rlo">9ja</span>
      blogue
    </div>
  );
};

export default Logo;
