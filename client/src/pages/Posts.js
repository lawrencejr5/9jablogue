import React from "react";
import { FaSearch } from "react-icons/fa";

import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import PostSingle from "../components/PostSingle";

import { useGlobalContext } from "../context";

const Posts = () => {
  const { loading, posts } = useGlobalContext();
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
            {posts.map((post, i) => {
              return <PostSingle data={post} key={i} />;
            })}
          </article>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Posts;
