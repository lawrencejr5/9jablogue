import React from "react";
import { FaSearch } from "react-icons/fa";

import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import PostSingle from "../components/PostSingle";

import { useGlobalContext } from "../context";

import { posts } from "../data/posts";

const Posts = () => {
  const { loading } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }
  return (
    <main>
      <Navbar color={"black"} />
      <section className="all-posts-container">
        <article className="header">
          <div className="header-center">
            <h1>Posts</h1>
            <div className="inp-holder">
              <FaSearch className="icon" />
              <input type="text" placeholder="Wetin you go like read?" />
            </div>
          </div>
        </article>
        <div className="posts">
          <article className="singlePost-container">
            {posts.map((post) => {
              return <PostSingle data={post} />;
            })}
          </article>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Posts;
