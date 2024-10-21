import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaArrowUp } from "react-icons/fa";

import AdminNav from "../../components/AdminNav";
import Logo from "../../components/Logo";
import AdminDd from "../../components/AdminDd";
import DelPost from "../../components/modals/DelPost";

import { posts } from "../../data/posts";

const MyPosts = () => {
  const navigate = useNavigate();

  const [delClosed, setDelClosed] = useState(true);

  return (
    <main className="admin-main my-posts">
      <Logo />
      <AdminDd />
      <AdminNav />
      <div className="header">
        <h1>Your Posts({posts.length})</h1>
      </div>
      <div className="posts-container">
        {posts.map((post, i) => {
          return (
            <div className="post" key={i}>
              <div
                className="thumb"
                onClick={() => navigate(`/post/${post.id}`)}
                style={{ backgroundImage: `url(${post.thumb})` }}
              ></div>
              <div className="content">
                <h2 onClick={() => navigate(`/post/${post.id}`)}>
                  {post.title}
                </h2>
                <span> {post.description} </span>
                <br />
                {post.tags.map((tag, index) => {
                  return (
                    tag && (
                      <button
                        key={index}
                        onClick={() => navigate(`/categories/${tag}`)}
                        className="tag"
                      >
                        {tag}
                      </button>
                    )
                  );
                })}
                <br />
                <br />
                <br />
                <div className="actn-btns">
                  <button
                    id="edit"
                    onClick={() => navigate(`/admin/edit-post/${post.id}`)}
                  >
                    Continue... &nbsp;
                    <FaEdit />
                  </button>
                  <button id="edit">
                    Post &nbsp;
                    <FaArrowUp />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <DelPost closed={delClosed} setClosed={setDelClosed} />
    </main>
  );
};

export default MyPosts;
