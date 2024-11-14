import React from "react";
import { Link } from "react-router-dom";

const PostSingle = ({ data }) => {
  const { title, description, thumb, id, tags } = data;
  return (
    <div key={id} className="singlePost">
      <div
        className="img"
        style={{
          backgroundImage: `url(${thumb})`,
        }}
      ></div>
      <div className="content">
        <Link className="link" to={`/post/${id}`}>
          {tags.map((tag, index) => {
            return (
              tag && (
                <Link key={index} to={`/categories/${tag}`}>
                  <button className="tag">{tag}</button>
                </Link>
              )
            );
          })}
          <h1 className="title">{title}</h1>
          <p>
            {description.slice(0, 100)}
            {description.length > 100 && "..."}
          </p>
        </Link>
      </div>
    </div>
  );
};
export default PostSingle;
