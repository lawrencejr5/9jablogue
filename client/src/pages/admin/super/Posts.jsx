import React, { useState } from "react";
import { FaEye, FaThumbsUp, FaEdit, FaTrash, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../../../context";

import DelPost from "../../../components/modals/DelPost";

const Posts = () => {
  const navigate = useNavigate();

  const { posts, btnLoad } = useGlobalContext();

  const [delPostClosed, setDelPostClosed] = useState(true);

  return (
    <div className="posts">
      <h1>All posts</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Post</th>
              <th>By</th>
              <th>Categories</th>
              <th>Last modified</th>
              <th>
                <FaEye className="icon" />
              </th>
              <th>
                <FaThumbsUp className="icon" />
              </th>
              <th>Actions</th>
              <th>Approve</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, i) => {
              return (
                <tr key={i}>
                  <td className="post">
                    <div
                      className="img"
                      style={{
                        backgroundImage: `url(http://localhost:5000/api/v1/uploads/${post.thumb})`,
                      }}
                    ></div>
                    <div className="content">
                      <strong>{post.title}</strong>
                      <br />
                      <small>{post.desc}</small>
                    </div>
                  </td>
                  <td>@{post.author.username}</td>
                  <td>
                    {post.categories.map((cat, i) => {
                      return (
                        <span key={i}>
                          {cat.category} <br />
                        </span>
                      );
                    })}
                  </td>
                  <td>{post.updatedAt.split("T")[0]}</td>
                  <td>
                    {post.views} <FaEye />
                  </td>
                  <td>
                    {post.likes} <FaThumbsUp />
                  </td>
                  <td>
                    <div className="actn-btns">
                      <button
                        id="edit"
                        style={{ color: "green" }}
                        onClick={() => navigate(`/admin/edit-post/${post.id}`)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        id="del"
                        style={{ color: "red" }}
                        onClick={() => setDelPostClosed(false)}
                      >
                        <FaTrash />
                      </button>
                      <button style={{ color: "black" }}>
                        <FaRegHeart />
                      </button>
                    </div>{" "}
                  </td>
                  <td>
                    <button id="approve-btn">Approve</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <DelPost closed={delPostClosed} setClosed={setDelPostClosed} />
    </div>
  );
};

export default Posts;
