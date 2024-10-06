import React from "react";

const EditPost = ({ closed, setClosed }) => {
  return (
    <div className={`modal-container ${closed ? "close" : ""}`}>
      <div className={`modal`}>
        <h2>Edit post</h2>
        <form action=""></form>
      </div>
    </div>
  );
};

export default EditPost;
