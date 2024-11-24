import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Navbaek from "../components/Navbaek";
import Sidenav from "../components/Sidenav";
import Footer from "../components/Footer";
import PostSingle from "../components/PostSingle";
import Loading from "../components/Loading";

import { useGlobalContext } from "../context";

const BloggerPosts = () => {
  const {
    loading,
    getBloggerPosts,
    bloggerPosts: posts,
    getBlogger,
    blogger,
    fileEndpoint,
  } = useGlobalContext();

  const { name } = useParams();

  useEffect(() => {
    getBloggerPosts(name);
    getBlogger(name);
  }, []);

  return (
    <>
      {loading && <Loading />}
      <main>
        <Navbaek />
        <Sidenav />
        <section className="blogger-post-container">
          <div className="header">
            <div className="header-center">
              {/* <h1>{blogger.fullname}</h1>
              <span>@{blogger.username}</span> */}
              <div
                className="img"
                style={{
                  backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${fileEndpoint}/${blogger.profilePic})`,
                }}
              >
                <h1>{blogger.username}'s posts</h1>
              </div>
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
              <h1>...</h1>
            )}
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default BloggerPosts;
