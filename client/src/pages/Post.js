import React, { useEffect, useRef } from "react";
// import ReactHtmlParser from "react-html-parser";
import { useGlobalContext } from "../context";
import Navbaek from "../components/Navbaek";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const Post = () => {
  const { getPost, singlePost: newPost, loading } = useGlobalContext();

  const { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, []);

  if (loading) return <Loading />;
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
              backgroundImage: `url(http://localhost:5000/api/v1/uploads/${newPost.thumb})`,
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
                <b>@{newPost.author ? newPost.author.username : "..."} </b>
                <small>
                  {newPost.createdAt ? newPost.createdAt.split("T")[0] : "..."}
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
  );
};

export default Post;
