import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaPowerOff } from "react-icons/fa";

const AdminDd = () => {
  const [dd, setDd] = useState(false);

  return (
    <>
      <div className="admin-dd">
        <div className="click" onClick={() => setDd((prev) => !prev)}>
          Admin, Lawrencejr &nbsp;
          {dd ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        <div className={`dd-list ${dd ? "" : "hide"}`}>
          Logout&nbsp;
          <FaPowerOff size={"12px"} />
        </div>
      </div>
    </>
  );
};

export default AdminDd;
