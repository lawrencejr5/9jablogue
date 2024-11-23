import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTags } from "react-icons/fa";

import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import NewsLetterForm from "../components/NewsLetterForm";
import TagSingle from "../components/TagSingle";
import PostSingle from "../components/PostSingle";
import FeaturedPost from "../components/FeaturedPost";

import { useGlobalContext } from "../context";

const Home = () => {
  const {
    loading,
    dukNo,
    duks,
    posts,
    getPosts,
    categories,
    featuredPost,
    getFeaturedPost,
  } = useGlobalContext();

  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
    getFeaturedPost();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <main>
        <Navbar color={"white"} />
        <section className="banner">
          <div className="banner-center">
            <h1>Did you know?</h1>
            <em>
              {duks.map((d, i) => {
                return (
                  <span key={i} className={i == dukNo && "active-carousel"}>
                    {d.text}
                  </span>
                );
              })}
            </em>
          </div>
        </section>
        <section className="news-letter">
          <span>
            Get the email newsletter and unlock access to members-only content
            and updates from 9jaoldschool
          </span>
          <NewsLetterForm />
        </section>
        <section className="tags-container">
          <h1>
            Popular Tags <FaTags className="tag-icon" />
          </h1>
          <TagSingle data={categories} />
        </section>
        <section className="posts featured">
          <h1 className="header">Editor's pick</h1>
          <FeaturedPost data={featuredPost} />
        </section>
        <section className="posts">
          <h1 className="header">Latest posts</h1>
          <article className="singlePost-container">
            {posts.slice(0, 3).map((post, key) => {
              return <PostSingle key={key} data={post} />;
            })}
          </article>
          <div className="loadMoreCont">
            <button className="loadmore" onClick={() => navigate("/posts")}>
              Show me more...
            </button>
          </div>
        </section>
        <section className="req-admin">
          <h1>Join us</h1>
          <p>Want to be a blogger on 9jablogue? What are you waiting for?</p>
          <button onClick={() => navigate("/register")}>Apply now...</button>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Home;
