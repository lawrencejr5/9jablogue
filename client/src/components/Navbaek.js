import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";
const Navbaek = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="user-nav">
        <div className="nav-center">
          <FaChevronLeft className="baek_link" onClick={() => navigate(-1)} />
        </div>
      </nav>
    </>
  );
};

export default Navbaek;
