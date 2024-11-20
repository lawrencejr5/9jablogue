import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useGlobalContext } from "../context";

const FeaturedPost = ({ data }) => {
  const navigate = useNavigate();

  const { fileEndpoint } = useGlobalContext();

  const { _id: id, title, thumb, desc, categories } = data[0];

  return (
    <div className="post">
      <div
        className="img"
        style={{ backgroundImage: `url(${fileEndpoint}/${thumb})` }}
      ></div>
      <div className="content">
        <h1 onClick={() => navigate(`/post/${id}`)}>{title}</h1>
        {categories.map((cat, i) => {
          return (
            <Link to={`/categories/${cat._id}`} key={i} className="link">
              <button className="tag">{cat.category}</button>
            </Link>
          );
        })}

        <p onClick={() => navigate(`/post/${id}`)}>
          {desc.slice(0, 100)}
          {desc.length > 100 && "..."}
        </p>
      </div>
    </div>
  );
};

export default FeaturedPost;
