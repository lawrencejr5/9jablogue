import React, { useState } from "react";
import {
  FaEye,
  FaThumbsUp,
  FaShare,
  FaChartLine,
  FaEdit,
  FaTrash,
  FaStar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import AdminNav from "../../components/AdminNav";
import Logo from "../../components/Logo";
import AdminDd from "../../components/AdminDd";
import DelPost from "../../components/modals/DelPost";

import { posts } from "../../data/posts";

const Super = () => {
  const navigate = useNavigate();

  const [delClosed, setDelClosed] = useState(true);
  return (
    <main className="admin-main dashboard">
      <Logo />
      <AdminDd />
      <AdminNav />
      <div className="header">
        <h1>Super admin</h1>
        <h3>You're welcome to the super dongeon</h3>
      </div>
      <div className="posts">
        <h1>All posts</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Post</th>
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
                        <small>23rd Nov, 2023</small>
                      </div>
                    </td>
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
                          onClick={() => setDelClosed(false)}
                        >
                          <FaTrash />
                        </button>
                        <button style={{ color: "black" }}>
                          <FaStar />
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
        <DelPost closed={delClosed} setClosed={setDelClosed} />
      </div>

      <div className="categories">
        <h1>Categories</h1>
      </div>

      <div className="duks">
        <h1>Did you know?</h1>
      </div>
    </main>
  );
};

export default Super;
