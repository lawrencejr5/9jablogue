import React, { useEffect, useState } from "react";
import {
  FaEye,
  FaThumbsUp,
  FaChartLine,
  FaEdit,
  FaTrash,
  FaBars,
  FaFileUpload,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import AdminNav from "../../components/AdminNav";
import Logo from "../../components/Logo";
import AdminDd from "../../components/AdminDd";
import DelPost from "../../components/modals/DelPost";

import { useGlobalContext } from "../../context";

const Dashboard = () => {
  const navigate = useNavigate();

  const {
    userPosts,
    getUserPosts,
    updatePost,
    signedInUser,
    getUser,
    getUserTotalViews,
    getUserTotalLikes,
    userTotalViews,
    userTotalLikes,
  } = useGlobalContext();

  useEffect(() => {
    getUserTotalViews();
    getUserTotalLikes();
    getUserPosts();
    getUser();
  }, []);

  const [delPostClosed, setDelPostClosed] = useState(true);
  const [currPost, setCurrPost] = useState([]);

  const delFunc = (post) => {
    setDelPostClosed(false);
    setCurrPost(post);
  };

  const uploadPost = async (id) => {
    const formdata = {
      status: 2,
    };
    await updatePost(id, formdata);
  };

  return (
    <main className="admin-main dashboard">
      <Logo />
      <AdminDd />
      <AdminNav />
      <div className="header">
        <h1>Dashboard</h1>
        <span>
          Welcome back👋 {signedInUser ? signedInUser.username : "..."}
        </span>
      </div>
      <h2 style={{ display: "flex", alignItems: "center" }}>
        Statistics &nbsp;
        <FaChartLine />
      </h2>
      <div className="layouts">
        <div className="layout">
          <FaBars className="icon" />
          <div className="content">
            <strong>Posts</strong>
            <span>{userPosts.length} post(s)</span>
          </div>
        </div>
        <div className="layout">
          <FaEye className="icon" />
          <div className="content">
            <strong>Views</strong>
            <span>{userTotalViews} view(s)</span>
          </div>
        </div>
        <div className="layout">
          <FaThumbsUp className="icon" />
          <div className="content">
            <strong>Likes</strong>
            <span>{userTotalLikes} like(s)</span>
          </div>
        </div>
      </div>
      <div className="posts">
        <h1>Your posts</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Post</th>
                <th>By</th>
                <th>Categories</th>
                <th>Date & time</th>
                <th>
                  <FaEye className="icon" />
                </th>
                <th>
                  <FaThumbsUp className="icon" />
                </th>
                <th>Upload</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userPosts.map((post, i) => {
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
                      {post.categories.map((cat) => {
                        return (
                          <span key={cat._id}>
                            {cat.category} <br />
                          </span>
                        );
                      })}
                    </td>
                    <td>{format(post.createdAt, "PPpp")}</td>
                    <td>
                      {post.views} <FaEye />
                    </td>
                    <td>
                      {post.likes} <FaThumbsUp />
                    </td>
                    <td>
                      {!post.status ? (
                        <button
                          className="upload-btn"
                          onClick={() => uploadPost(post._id)}
                        >
                          upload &nbsp;
                          <FaFileUpload />
                        </button>
                      ) : (
                        <button
                          className="upload-btn"
                          style={{ background: "#8383fe" }}
                          disabled
                        >
                          uploaded &nbsp;
                          <FaCheckCircle />
                        </button>
                      )}
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
                      <div className="actn-btns">
                        <button
                          id="edit"
                          style={{ color: "green" }}
                          onClick={() =>
                            navigate(`/admin/edit-post/${post._id}`)
                          }
                        >
                          <FaEdit />
                        </button>
                        <button
                          id="del"
                          style={{ color: "red" }}
                          onClick={() => delFunc(post)}
                        >
                          <FaTrash />
                        </button>
                      </div>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <DelPost
            closed={delPostClosed}
            setClosed={setDelPostClosed}
            currPost={currPost}
          />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
