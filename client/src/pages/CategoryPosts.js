import React, { useEffect } from "react";
import Navbaek from "../components/Navbaek";
import Sidenav from "../components/Sidenav";
import Footer from "../components/Footer";
import { useGlobalContext } from "../context";
import PostSingle from "../components/PostSingle";
import LoadMore from "../components/LoadMore";
import Loading from "../components/Loading";

import { useParams } from "react-router-dom";

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
  }, [name]);

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
            <div
              className="img"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${fileEndpoint}/${category.img})`,
              }}
            >
              <div>
                <h1>{category.category}</h1>
                <p>{category.description}</p>
              </div>
            </div>
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
