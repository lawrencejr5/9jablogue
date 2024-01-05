import React from "react";
import { FaBars, FaChevronLeft } from "react-icons/fa";
import { useGlobalContext } from "../context";
import { Link, useNavigate } from "react-router-dom";
const Navbaek = () => {
  const { openSideNav } = useGlobalContext();
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  return (
    <>
      <nav className="nav">
        <div className="nav-center">
          <FaChevronLeft className="baek_link" onClick={back} />
        </div>
      </nav>
    </>
  );
};

export default Navbaek;
