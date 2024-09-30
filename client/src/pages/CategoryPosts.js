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
  const { name } = useParams();
  const singlePost = posts.filter((post) => {
    const { tags } = post;
    if (tags.includes(name)) {
      return post;
    }
  });
  const singleCat = catgories.find((cat) => {
    if (name === cat.name) {
      return cat;
    }
  });

  // if (catLoading) {
  //   return <Loading />;
  // }
  return (
    <main>
      <Navbaek />
      <Sidenav />
      <section className="cat_posts_container">
        <article className="header">
          <div className="header-center">
            <h1>{name}</h1>
            <div
              style={{
                height: "200px",
                width: "200px",
                borderRadius: "50%",
                backgroundPosition: "center",
                backgroundSize: "cover",
                margin: "auto",
                backgroundImage: `url(${singleCat.img})`,
              }}
            ></div>
            <p>{singleCat.text}</p>
          </div>
        </article>
        <article className="cat_posts">
          <div className="cat_posts_header">Posts on {name}</div>
          {singlePost.length > 0 ? (
            <>
              <PostSingle data={singlePost} />
              <LoadMore />
            </>
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
