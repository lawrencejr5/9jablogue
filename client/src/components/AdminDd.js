import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaPowerOff } from "react-icons/fa";

import { useGlobalContext } from "../context";

const AdminDd = () => {
  const [dd, setDd] = useState(false);

  const { signedInUser, getUser } = useGlobalContext();

  return (
    <>
      <div className="admin-dd">
        <div className="click" onClick={() => setDd((prev) => !prev)}>
          Admin, {signedInUser && signedInUser.username} &nbsp;
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
