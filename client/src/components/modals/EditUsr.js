import React from "react";
import { FaTimes } from "react-icons/fa";

const EditUsr = ({ closed, setClosed }) => {
  return (
    <div className={`modal-container ${closed ? "close" : ""}`}>
      <form className="modal">
        <div className="header">
          <h2>Update user</h2>
          <button type="button" onClick={() => setClosed(true)}>
            <FaTimes />
          </button>
        </div>

        <input type="file" />

        <input type="text" placeholder="fullname" />

        <input type="text" placeholder="username" />

        <input type="text" placeholder="email" />

        <input type="password" placeholder="password" />
        <div className="btn-holder">
          <button style={{ background: "#054e05" }}>update</button>
        </div>
      </form>
    </div>
  );
};

export default EditUsr;
