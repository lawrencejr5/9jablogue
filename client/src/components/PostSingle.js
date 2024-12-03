import React from "react";
import { Link } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";
import { format } from "date-fns";

import { useGlobalContext } from "../context";

const PostSingle = ({ data }) => {
  const { fileEndpoint, viewPost } = useGlobalContext();
  const { title, desc, thumb, _id: id, categories, author, createdAt } = data;
  return (
    <div key={id} className="singlePost">
      <div
        className="img"
        style={{
          backgroundImage: `url(${thumb})`,
        }}
      ></div>
      <div className="content" onClick={() => viewPost(id)}>
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
          <small>
            <Link className="post_by" to={`/bloggers/${author._id}`}>
              <img
                src={`${author.profilePic}`}
                width="20px"
                height="20px"
                alt=""
              />
              &nbsp;
              {author.username}
            </Link>{" "}
            <span className="date">
              <FaCalendar />
              &nbsp;
              {format(createdAt, "PP")}
            </span>
          </small>
        </Link>
      </div>
    </div>
  );
};
export default PostSingle;
