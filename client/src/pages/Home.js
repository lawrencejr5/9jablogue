import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaTags } from "react-icons/fa";

import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import NewsLetterForm from "../components/NewsLetterForm";
import TagSingle from "../components/TagSingle";
import PostSingle from "../components/PostSingle";

import { useGlobalContext } from "../context";

import { didUKnw } from "../data/didUKnw";
import { catgories } from "../data/categories";
import { posts } from "../data/posts";

const Home = () => {
  const { loading, dukNo } = useGlobalContext();

  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }
  return (
    <main>
      <Navbar color={"white"} />
      <section className="banner">
        <div className="banner-center">
          <h1>Did you know?</h1>
          <em>
            {didUKnw.map((d, i) => {
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
          Get the email newsletter and unlock access to members-only content and
          updates from 9jaoldschool
        </span>
        <NewsLetterForm />
      </section>
      <section className="tags-container">
        <h1>
          Popular Tags <FaTags className="tag-icon" />
        </h1>
        <TagSingle data={catgories} />
      </section>
      <section className="posts featured">
        <h1 className="header">Featured</h1>
        <div className="post">
          <div className="img"></div>
          <div className="content">
            <h1>Hunger dey Nigeria, We dey call on Tinubu</h1>
            <Link to={`/categories/Documentary`} className="link">
              <button className="tag">documentary</button>
            </Link>
            <Link to={`/categories/Politics`} className="link">
              <button className="tag">politics</button>
            </Link>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              similique non blanditiis a eum officiis at assumenda laboriosam,
              repellendus corporis animi quos adipisci provident ducimus nihil,
              officia suscipit esse! Earum?e
            </p>
          </div>
        </div>
      </section>
      <section className="posts">
        <h1 className="header">Latest posts</h1>
        <article className="singlePost-container">
          {posts.slice(0, 3).map((post) => {
            return <PostSingle data={post} />;
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
  );
};

export default Home;
