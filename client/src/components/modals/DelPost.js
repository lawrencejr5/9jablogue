import React from "react";
import { FaTimes, FaTrash } from "react-icons/fa";

import { useGlobalContext } from "../../context";

const DelPost = ({ closed, setClosed, currPost }) => {
  const { deletePost, getUserPosts } = useGlobalContext();
  const delPost = async () => {
    await deletePost(currPost._id);
    await getUserPosts();
    setClosed(true);
  };
  return (
    <div className={`modal-container ${closed ? "close" : ""}`}>
      <div className={`modal`}>
        <h2>You sure say u wan delete this post??</h2>
        <div className="btn-holder">
          <button id="del" onClick={delPost}>
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

export default DelPost;
