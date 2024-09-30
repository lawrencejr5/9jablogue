import React, { useEffect, useRef } from "react";
// import ReactHtmlParser from "react-html-parser";
import { useGlobalContext } from "../context";
import Navbaek from "../components/Navbaek";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

import { posts } from "../data/posts";
import { text } from "../data/postText";

const Post = () => {
  const { postLoading } = useGlobalContext();
  const { id: findId } = useParams();
  // let ogTitle = title.replaceAll("_", " ");
  const newPost = posts.find((post) => findId == post.id);

  if (postLoading) {
    return <Loading />;
  }
  return (
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
              height: "200px",
              width: "200px",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundImage: `url(${newPost.thumb})`,
            }}
          ></div>
          <div className="entry_header">
            <div className="info">
              <div
                className="img"
                style={{
                  height: "30px",
                  width: "30px",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  borderRadius: "50%",
                  backgroundImage: `url(/imgs/profilePic1.jpg)`,
                }}
              ></div>
              <div className="detail">
                <b>Oputa Ifeanyi Lawrence </b>
                <small>{`23rd Nov, 2023`}</small>
              </div>
            </div>
            <div className="description">
              <h1>{newPost.title}</h1>
              <em>{newPost.description}</em>
            </div>
          </div>
        </article>
        <article className="content">{text}</article>
      </section>
      <Footer />
    </main>
  );
};

export default Post;
