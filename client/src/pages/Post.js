import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import Navbaek from "../components/Navbaek";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

import { useGlobalContext } from "../context";

const Post = () => {
  const {
    getPost,
    singlePost: newPost,
    loading,
    fileEndpoint,
  } = useGlobalContext();

  const { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, []);

  return (
    <>
      {loading && <Loading />}
      <main>
        <Navbaek />
        <section className="apost_container">
          <aside className="breadcrumb">
            9jablogue &rarr; Post &rarr; {newPost.title}
          </aside>
          <article className="wrapper">
            <div
              className="postImg"
              style={{
                backgroundImage: `url(${fileEndpoint}/${newPost.thumb})`,
              }}
            ></div>
            <div className="entry_header">
              <div className="info">
                <div
                  className="img"
                  style={{
                    backgroundImage: `url(${fileEndpoint}/${
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
          <article
            className="content"
            dangerouslySetInnerHTML={{ __html: newPost.body }}
          />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Post;
