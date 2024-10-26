import React from "react";
import { FaTimes } from "react-icons/fa";

const Application = ({ closed, setClosed }) => {
  return (
    <div className={`modal-container ${closed ? "close" : ""}`}>
      <div className="modal">
        <div className="header">
          <h2>Application</h2>
          <button type="button" onClick={() => setClosed(true)}>
            <FaTimes />
          </button>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim ipsum
          autem aut facere nesciunt qui ullam placeat suscipit consequatur quo
          ratione, id aspernatur dolores molestias expedita numquam.
          Praesentium, necessitatibus voluptatem. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Et assumenda perferendis nesciunt
          tempore cumque totam ex placeat quas fugiat fugit magnam maxime sint
          rem, deleniti repudiandae earum atque quos. Numquam!
        </p>
      </div>
    </div>
  );
};

export default Application;
