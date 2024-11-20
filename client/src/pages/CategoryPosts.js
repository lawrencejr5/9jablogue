import React, { useEffect } from "react";
import Navbaek from "../components/Navbaek";
import Sidenav from "../components/Sidenav";
import Footer from "../components/Footer";
import { useGlobalContext } from "../context";
import PostSingle from "../components/PostSingle";
import LoadMore from "../components/LoadMore";
import Loading from "../components/Loading";

import { useParams } from "react-router-dom";

import { posts } from "../data/posts";
import { catgories } from "../data/categories";

const CategoryPosts = () => {
  const {
    loading,
    fileEndpoint,
    category,
    getCategory,
    categoryPosts,
    getCategoryPosts,
  } = useGlobalContext();

  const { name } = useParams();

  useEffect(() => {
    getCategory(name);
    getCategoryPosts(name);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <main>
      <Navbaek />
      <Sidenav />
      <section className="cat_posts_container">
        <article className="header">
          <div className="header-center">
            <h1>{category.category}</h1>
            <div
              style={{
                height: "200px",
                width: "200px",
                borderRadius: "50%",
                backgroundPosition: "center",
                backgroundSize: "cover",
                margin: "auto",
                backgroundImage: `url(${fileEndpoint}/${category.img})`,
              }}
            ></div>
            <p>{category.description}</p>
          </div>
        </article>
        <article className="cat_posts">
          <div className="cat_posts_header">Posts on {category.category}</div>
          {categoryPosts.length > 0 ? (
            <article className="singlePost-container">
              {categoryPosts.map((post, i) => {
                return <PostSingle key={i} data={post} />;
              })}
            </article>
          ) : (
            <h1>No posts</h1>
          )}
        </article>
      </section>
      <Footer />
    </main>
  );
};

export default CategoryPosts;
