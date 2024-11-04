import React, { useEffect } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";

import { useGlobalContext } from "../../context";

const DelDuk = ({ closed, setClosed, currDuk }) => {
  const { deleteDuk } = useGlobalContext();
  const handleDelete = () => {
    deleteDuk(currDuk._id);
    setClosed(true);
  };
  return (
    <div className={`modal-container ${closed ? "close" : ""}`}>
      <div className={`modal`}>
        <h2>You sure say u wan delete this "did you know"??</h2>
        <div className="btn-holder">
          <button id="del" onClick={handleDelete}>
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

export default DelDuk;
