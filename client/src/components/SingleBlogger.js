import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../context";

const SingleBlogger = ({ data }) => {
  const { fileEndpoint } = useGlobalContext();
  const {
    _id: id,
    username,
    fullname,
    profilePic,
    socials: { facebook, twitter, instagram, linkedin },
  } = data;

  return (
    <Link className="layout" to={`/bloggers/${id}`}>
      <div
        className="img"
        style={{ backgroundImage: `url(${fileEndpoint}/${profilePic})` }}
      ></div>
      <div className="content">
        <strong>{fullname}</strong>
        <br />
        <span style={{ color: "green" }}>@{username}</span>
        <br />
        <span className="socials">
          {facebook && (
            <a href={facebook} className="social">
              <FaFacebook className="icon" />
            </a>
          )}
          {instagram && (
            <a href={instagram} className="social">
              <FaInstagram className="icon" />
            </a>
          )}
          {twitter && (
            <a href={twitter} className="social">
              <FaTwitter className="icon" />
            </a>
          )}
          {linkedin && (
            <a href={linkedin} className="social">
              <FaLinkedin className="icon" />
            </a>
          )}
        </span>
      </div>
    </Link>
  );
};

export default SingleBlogger;
