import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useGlobalContext } from "../context";

const FeaturedPost = ({ data }) => {
  const navigate = useNavigate();

  const { fileEndpoint } = useGlobalContext();

  const { _id: id, title, thumb, desc, categories } = data;

  return (
    <div className="post">
      <div
        className="img"
        style={{ backgroundImage: `url(${fileEndpoint}/${thumb})` }}
      ></div>
      <div className="content">
        <h1 onClick={() => navigate(`/post/${id}`)}>{title}</h1>
        {data.categories &&
          categories.map((cat, i) => {
            return (
              <Link to={`/categories/${cat._id}`} key={i} className="link">
                <button className="tag">{cat.category}</button>
              </Link>
            );
          })}

        <p onClick={() => navigate(`/post/${id}`)}>
          {data.desc && desc.slice(0, 100)}
          {data.desc && desc.length > 100 && "..."}
        </p>
      </div>
    </div>
  );
};

export default FeaturedPost;