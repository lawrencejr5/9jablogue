import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaRegEye, FaHeart } from "react-icons/fa";
import { format } from "date-fns";

import Navbaek from "../components/Navbaek";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Notification from "../components/Notification";

import { useGlobalContext } from "../context";

const Post = () => {
  const {
    getPost,
    singlePost: newPost,
    loading,
    fileEndpoint,
    likePost,
    notification,
  } = useGlobalContext();

  const { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, []);

  const like = async (id) => {
    await likePost(id);
  };

  return (
    <>
      {loading && <Loading />}
      <main>
        <Navbaek />
        <Notification notification={notification} />
        <section className="apost_container">
          <aside className="breadcrumb">
            9jablogue &rarr; Post &rarr; {newPost.title}
          </aside>
          <article className="wrapper">
            <div
              className="postImg"
              style={{
                backgroundImage: `url(${newPost.thumb})`,
              }}
            ></div>
            <div className="entry_header">
              <div className="info">
                <div
                  className="img"
                  style={{
                    backgroundImage: `url(${
                      newPost.author ? newPost.author.profilePic : ""
                    })`,
                  }}
                ></div>
                <div className="detail">
                  <b>@{newPost.author ? newPost.author.username : "..."} </b>
                  <small>
                    {newPost.createdAt
                      ? format(newPost.createdAt, "PPpp")
                      : "..."}
                  </small>
                </div>
              </div>
              <div className="description">
                <h1>{newPost.title}</h1>
                <em>{newPost.desc}</em>
              </div>
            </div>
          </article>
          <div className="reactions">
            <span>
              {newPost.views}&nbsp;
              <FaRegEye />
            </span>
            <span>
              {newPost.likes === 0 ? "" : newPost.likes}&nbsp;
              <FaRegHeart />
            </span>
          </div>
          <article
            className="content"
            dangerouslySetInnerHTML={{ __html: newPost.body }}
          />
          <div className="floating_like_btn">
            <button onClick={() => like(id)}>
              <FaRegHeart />
            </button>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Post;
