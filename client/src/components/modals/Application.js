import React from "react";
import { FaTimes } from "react-icons/fa";

const Application = ({ closed, setClosed, currUser }) => {
  return (
    <div className={`modal-container ${closed ? "close" : ""}`}>
      <div className="modal">
        <div className="header">
          <h2>Application</h2>
          <button type="button" onClick={() => setClosed(true)}>
            <FaTimes />
          </button>
        </div>
        <p>{currUser.application}</p>
      </div>
    </div>
  );
};

export default Application;
