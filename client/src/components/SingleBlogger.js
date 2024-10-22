import React from "react";
import { useNavigate } from "react-router-dom";

const SingleBlogger = ({ data }) => {
  const { username, fullname, img, bio } = data;

  const navigate = useNavigate();

  return (
    <div className="layout" onClick={() => navigate(`/bloggers/${username}`)}>
      <div className="img" style={{ backgroundImage: `url(${img})` }}></div>
      <div className="content">
        <strong>{fullname}</strong>
        <br />
        <span style={{ color: "green" }}>@{username}</span>
        <br />
        <span>{bio}</span>
        <br />
      </div>
    </div>
  );
};

export default SingleBlogger;
