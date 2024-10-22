import React from "react";

import Navbaek from "../components/Navbaek";
import Sidenav from "../components/Sidenav";
import Footer from "../components/Footer";
import PostSingle from "../components/PostSingle";
import Loading from "../components/Loading";

import { useGlobalContext } from "../context";

import { posts } from "../data/posts";

const BloggerPosts = () => {
  const { loading } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }
  return (
    <main>
      <Navbaek />
      <Sidenav />
      <section className="blogger-post-container">
        <div className="header">
          <div className="header-center">
            <h1>Oputa Lawrence</h1>
            <div
              style={{
                height: "200px",
                width: "200px",
                borderRadius: "50%",
                backgroundPosition: "center",
                backgroundSize: "cover",
                margin: "auto",
                backgroundImage: `url(/imgs/4757780.jpg)`,
              }}
            ></div>
            <p>lawrencejr</p>
          </div>
        </div>
        <div className="posts">
          {posts.length > 0 ? (
            <article className="singlePost-container">
              {posts.map((post, i) => {
                return <PostSingle key={i} data={post} />;
              })}
            </article>
          ) : (
            <h1>No posts</h1>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default BloggerPosts;
