import React, { useState } from "react";
import {
  FaEye,
  FaThumbsUp,
  FaEdit,
  FaTrash,
  FaRegHeart,
  FaHeart,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../../../context";

import DelPost from "../../../components/modals/DelPost";

const Posts = () => {
  const navigate = useNavigate();

  const {
    allPosts: posts,
    updatePost,
    featurePost,
    btnLoad,
  } = useGlobalContext();

  const [currPost, setCurrPost] = useState([]);
  const [delPostClosed, setDelPostClosed] = useState(true);

  const featurePostFunc = async (id) => {
    await featurePost(id);
  };

  const approvePost = async (id) => {
    const formdata = {
      status: 1,
    };
    await updatePost(id, formdata);
  };
  const disApprovePost = async (id) => {
    const formdata = {
      status: 2,
    };
    await updatePost(id, formdata);
  };

  const deletePostFunc = (curr) => {
    setCurrPost(curr);
    setDelPostClosed(false);
  };

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
              <th>Status</th>
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
                        onClick={() => navigate(`/admin/edit-post/${post._id}`)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        id="del"
                        style={{ color: "red" }}
                        onClick={() => deletePostFunc(post)}
                      >
                        <FaTrash />
                      </button>
                      <button
                        style={{ color: "black" }}
                        onClick={() => featurePostFunc(post._id)}
                      >
                        {post.featured ? <FaHeart /> : <FaRegHeart />}
                      </button>
                    </div>{" "}
                  </td>
                  <td>
                    {!post.status ? (
                      <span className="status-danger">not uploaded</span>
                    ) : post.status === 1 ? (
                      <span className="status-success">published</span>
                    ) : (
                      <span className="status-warning">pending...</span>
                    )}
                  </td>
                  <td>
                    {!post.status || post.status === 2 ? (
                      <button
                        id="approve-btn"
                        onClick={() => {
                          approvePost(post._id);
                        }}
                      >
                        {btnLoad ? "Approving..." : "Approve"}
                      </button>
                    ) : (
                      <button
                        id="approve-btn"
                        onClick={() => {
                          disApprovePost(post._id);
                        }}
                      >
                        {btnLoad ? "disapproving..." : "Approved"}{" "}
                        <FaCheckCircle />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <DelPost
        closed={delPostClosed}
        setClosed={setDelPostClosed}
        currPost={currPost}
      />
    </div>
  );
};

export default Posts;
