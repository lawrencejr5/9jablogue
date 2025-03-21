import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import PostSingle from "../components/PostSingle";

import { useGlobalContext } from "../context";

const Posts = () => {
  const { loading, posts, searchPosts } = useGlobalContext();

  const [query, setQuery] = useState("");

  useEffect(() => {
    searchPosts(query);
  }, [query]);

  return (
    <>
      {loading && <Loading />}
      <main>
        <Navbar color={"black"} />
        <section className="all-posts-container">
          <article className="header">
            <div className="header-center">
              <h1>Posts</h1>
              <div className="inp-holder">
                <FaSearch className="icon" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Wetin you go like read?"
                />
              </div>
            </div>
          </article>
          <div className="posts">
            <article className="singlePost-container">
              {posts.length === 0 ? (
                <strong>No posts...</strong>
              ) : (
                posts.map((post, i) => {
                  return <PostSingle data={post} key={i} />;
                })
              )}
            </article>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Posts;
