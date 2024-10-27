import React, { useState } from "react";
import {
  FaEye,
  FaThumbsUp,
  FaShare,
  FaChartLine,
  FaEdit,
  FaTrash,
  FaRegHeart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import AdminNav from "../../components/AdminNav";
import Logo from "../../components/Logo";
import AdminDd from "../../components/AdminDd";
import DelPost from "../../components/modals/DelPost";

import { posts } from "../../data/posts";

const Dashboard = () => {
  const navigate = useNavigate();

  const [delPostClosed, setDelPostClosed] = useState(true);

  return (
    <main className="admin-main dashboard">
      <Logo />
      <AdminDd />
      <AdminNav />
      <div className="header">
        <h1>Dashboard</h1>
        <span>Welcome back👋 Lawrencejr</span>
      </div>
      <h2 style={{ display: "flex", alignItems: "center" }}>
        Statistics &nbsp;
        <FaChartLine />
      </h2>
      <div className="layouts">
        <div className="layout">
          <FaEye className="icon" />
          <div className="content">
            <strong>Views</strong>
            <span>756 views</span>
          </div>
        </div>
        <div className="layout">
          <FaThumbsUp className="icon" />
          <div className="content">
            <strong>Likes</strong>
            <span>400 likes</span>
          </div>
        </div>
        <div className="layout">
          <FaShare className="icon" />
          <div className="content">
            <strong>Shares</strong>
            <span>922 shares</span>
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
                <th>
                  <FaShare className="icon" />
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
                          backgroundImage: `url(${post.thumb})`,
                        }}
                      ></div>
                      <div className="content">
                        <strong>{post.title}</strong>
                        <br />
                        <small>{post.description}</small>
                      </div>
                    </td>
                    <td>@lawrencejr</td>
                    <td>
                      {post.tags.map((cat) => {
                        return (
                          <>
                            {cat} <br />
                          </>
                        );
                      })}
                    </td>
                    <td>23rd Nov, 2024</td>
                    <td>
                      365 <FaEye />
                    </td>
                    <td>
                      222 <FaThumbsUp />
                    </td>
                    <td>
                      281 <FaShare />
                    </td>
                    <td>
                      <div className="actn-btns">
                        <button
                          id="edit"
                          style={{ color: "green" }}
                          onClick={() =>
                            navigate(`/admin/edit-post/${post.id}`)
                          }
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
    </main>
  );
};

export default Dashboard;
