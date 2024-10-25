import React from "react";
import { FaTimes, FaTrash } from "react-icons/fa";

const DelCat = ({ closed, setClosed }) => {
  return (
    <div className={`modal-container ${closed ? "close" : ""}`}>
      <div className={`modal`}>
        <h2>You sure say u wan delete this category??</h2>
        <div className="btn-holder">
          <button id="del">
            Yes &nbsp;
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

export default DelCat;
