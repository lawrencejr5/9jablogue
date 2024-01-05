import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "../context";
import Navbaek from "../components/Navbaek";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const Post = () => {
  const contentRef = useRef(null);
  const { post, postLoading } = useGlobalContext();
  const { title, id: findId } = useParams();
  let ogTitle = title.replaceAll("_", " ");
  const newPost = post.find((post) => {
    const { id } = post;
    if (findId == id) {
      return post;
    }
  });

  useEffect(() => {
    if (postLoading) {
      contentRef.current.innerHTML = "Loading....";
    } else {
      contentRef.current.innerHTML = newPost.post;
    }
  }, [newPost]);

  if (postLoading) {
    return <Loading />;
  }
  return (
    <main>
      <Navbaek />
      <section className="apost_container">
        <aside className="breadcrumb">
          9jablogue &rarr; Post &rarr; {ogTitle}
        </aside>
        <article className="wrapper">
          <div
            className="postImg"
            style={{
              height: "200px",
              width: "200px",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundImage: `url(http://localhost/9jablogueApi/admin/uploads/${newPost.thumb})`,
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
                <small>{newPost.datetime}</small>
              </div>
            </div>
            <div className="description">
              <h1>{newPost.title}</h1>
              <em>{newPost.description}</em>
            </div>
          </div>
        </article>
        <article className="content" ref={contentRef}>
          {newPost.post}
        </article>
      </section>
      <Footer />
    </main>
  );
};

export default Post;
