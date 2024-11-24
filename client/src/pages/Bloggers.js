import React, { useEffect } from "react";

import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import SingleBlogger from "../components/SingleBlogger";

import { useGlobalContext } from "../context";

import { bloggers } from "../data/bloggers";

const Bloggers = () => {
  const { loading, getBloggers, bloggers } = useGlobalContext();

  useEffect(() => {
    getBloggers();
  }, []);

  return (
    <>
      {loading && <Loading />}

      <main>
        <Navbar color={"black"} />
        <section className="bloggers-container">
          <div className="header">
            <h1>Bloggers</h1>
            <p>Meet our distinguished bloggers on 9jablogue</p>
          </div>
          <div className="body">
            {bloggers.map((blogger, i) => {
              return <SingleBlogger data={blogger} key={i} />;
            })}
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Bloggers;
