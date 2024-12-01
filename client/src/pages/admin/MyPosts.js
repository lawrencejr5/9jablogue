import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaArrowUp } from "react-icons/fa";

import AdminNav from "../../components/AdminNav";
import Logo from "../../components/Logo";
import AdminDd from "../../components/AdminDd";
import DelPost from "../../components/modals/DelPost";

import { posts } from "../../data/posts";

import { useGlobalContext } from "../../context";

const MyPosts = () => {
  const navigate = useNavigate();

  const [delClosed, setDelClosed] = useState(true);
  const { getUserPosts, userPosts, fileEndpoint } = useGlobalContext();

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <main className="admin-main my-posts">
      <Logo />
      <AdminDd />
      <AdminNav />
      <div className="header">
        <h1>Your Posts({userPosts.length})</h1>
      </div>
      <div className="posts-container">
        {userPosts.map((post, i) => {
          return (
            <div className="post" key={i}>
              <div
                className="thumb"
                onClick={() => navigate(`/post/${post._id}`)}
                style={{
                  backgroundImage: `url(${fileEndpoint}/${post.thumb})`,
                }}
              ></div>
              <div className="content">
                <h2 onClick={() => navigate(`/post/${post._id}`)}>
                  {post.title}
                </h2>
                <span>
                  {" "}
                  {post.desc.slice(0, 100)}
                  {post.desc.length > 100 && "..."}{" "}
                </span>
                <br />
                {/* {post.categories.map((tag, index) => {
                  return (
                    tag && (
                      <button
                        key={index}
                        onClick={() => navigate(`/categories/${tag.category}`)}
                        className="tag"
                      >
                        {tag.category}
                      </button>
                    )
                  );
                })} */}
                <br />
                <br />
                <br />
                <div className="actn-btns">
                  <button
                    id="edit"
                    onClick={() => navigate(`/admin/edit-post/${post._id}`)}
                  >
                    Continue writing... &nbsp;
                    <FaEdit />
                  </button>
                  {/* <button id="edit">
                    Post &nbsp;
                    <FaArrowUp />
                  </button> */}
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
