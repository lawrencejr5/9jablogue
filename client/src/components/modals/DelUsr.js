import React from "react";
import { FaTimes, FaTrash } from "react-icons/fa";

import { useGlobalContext } from "../../context";

const DelUsr = ({ closed, setClosed, currUser }) => {
  const { btnLoad, deleteUser } = useGlobalContext();
  const deleteFunc = () => {
    deleteUser(currUser._id);
    setClosed(true);
  };
  return (
    <div className={`modal-container ${closed ? "close" : ""}`}>
      <div className={`modal`}>
        <h2>You sure say u wan delete {currUser.username} account??</h2>
        <div className="btn-holder">
          <button id="del" onClick={deleteFunc}>
            {btnLoad ? "Deleting..." : "Yes"} &nbsp;
            <FaTrash />
          </button>
          <button id="cancel" onClick={() => setClosed(true)}>
            Cancel &nbsp;
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DelUsr;
