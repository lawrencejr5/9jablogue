import React, { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";

import { useGlobalContext } from "../../context";

const EditUsr = ({ closed, setClosed, currUser }) => {
  const { updateUser, btnLoad } = useGlobalContext();

  const fileRef = useRef(null);

  const { fullname, username, email, profilePic } = currUser;
  const [input, setInput] = useState({
    userId: currUser._id,
    fullname,
    username,
    email,
    profilePic,
  });

  useEffect(() => {
    setInput({ userId: currUser._id, fullname, username, email, profilePic });
  }, [closed]);

  const handleChange = (e) => {
    const name = e.target.id;
    const value = name === "profilePic" ? e.target.files[0] : e.target.value;
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userId } = input;
    const formdata = new FormData();
    for (const key in input) {
      formdata.append(key, input[key]);
    }
    await updateUser(userId, formdata);
    setInput({ username: "", fullname: "", email: "", profilePic: "" });
    fileRef.current.value = "";
    setClosed(true);
  };
  return (
    <div className={`modal-container ${closed ? "close" : ""}`}>
      <form className="modal" onSubmit={handleSubmit}>
        <div className="header">
          <h2>Update user</h2>
          <button type="button" onClick={() => setClosed(true)}>
            <FaTimes />
          </button>
        </div>

        <input
          type="hidden"
          id="userId"
          value={input.userId}
          onChange={handleChange}
        />

        <input
          type="file"
          id="profilePic"
          onChange={handleChange}
          ref={fileRef}
        />

        <input
          type="text"
          id="fullname"
          value={input.fullname}
          onChange={handleChange}
          placeholder="fullname"
        />

        <input
          type="text"
          id="username"
          value={input.username}
          onChange={handleChange}
          placeholder="username"
        />

        <input
          type="text"
          id="email"
          value={input.email}
          onChange={handleChange}
          placeholder="email"
        />

        <div className="btn-holder">
          <button style={{ background: "#054e05" }}>
            {btnLoad ? "updating..." : "update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUsr;
