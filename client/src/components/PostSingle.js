import React from "react";
import { Link } from "react-router-dom";

const PostSingle = ({ data }) => {
  const { title, desc, thumb, _id: id, categories } = data;
  return (
    <div key={id} className="singlePost">
      <div
        className="img"
        style={{
          backgroundImage: `url(http://localhost:5000/api/v1/uploads/${thumb})`,
        }}
      ></div>
      <div className="content">
        <Link className="link" to={`/post/${id}`}>
          {categories.map((tag, index) => {
            return (
              tag && (
                <Link key={index} to={`/categories/${tag._id}`}>
                  <button className="tag">{tag.category}</button>
                </Link>
              )
            );
          })}
          <h1 className="title">{title}</h1>
          <p>
            {desc.slice(0, 100)}
            {desc.length > 100 && "..."}
          </p>
        </Link>
      </div>
    </div>
  );
};
export default PostSingle;
