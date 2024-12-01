import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp, FaPowerOff } from "react-icons/fa";

import { useGlobalContext } from "../context";

const AdminDd = () => {
  const navigate = useNavigate();
  const [dd, setDd] = useState(false);

  const { signedInUser } = useGlobalContext();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="admin-dd">
        <div className="click" onClick={() => setDd((prev) => !prev)}>
          Admin, {signedInUser && signedInUser.username} &nbsp;
          {dd ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        <div className={`dd-list ${dd ? "" : "hide"}`} onClick={logout}>
          Logout&nbsp;
          <FaPowerOff size={"12px"} />
        </div>
      </div>
    </>
  );
};

export default AdminDd;
