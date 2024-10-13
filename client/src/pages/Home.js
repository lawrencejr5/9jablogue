import React from "react";
import { FaStar, FaTags } from "react-icons/fa";

import Navbar from "../components/Nav";
import Sidenav from "../components/Sidenav";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import NewsLetterForm from "../components/NewsLetterForm";
import TagSingle from "../components/TagSingle";
import PostSingle from "../components/PostSingle";
import LoadMore from "../components/LoadMore";

import { useGlobalContext } from "../context";

import { didUKnw } from "../data/didUKnw";
import { catgories } from "../data/categories";
import { posts } from "../data/posts";

const Home = () => {
  const { loading, dukNo } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }
  return (
    <main>
      <Navbar color={"white"} />
      {/* <Sidenav /> */}
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
      <section className="posts">
        <h1 className="header">Featured posts</h1>
        <PostSingle data={posts} />
      </section>
      <section className="posts">
        <h1 className="header">Latest posts</h1>
        <PostSingle data={posts} />
        <div className="loadMoreCont">
          <button className="loadmore">Show me more...</button>
        </div>
      </section>
      <section className="req-admin">
        <p>Want to be a blogger on 9jablogue? What are you waiting for?</p>
        <button>Apply now...</button>
      </section>
      <Footer />
    </main>
  );
};

export default Home;
