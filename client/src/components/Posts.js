import React from "react";

import PostSingle from "./PostSingle";
import LoadMore from "../components/LoadMore";

import { useGlobalContext } from "../context";

import { posts } from "../data/posts";

const Posts = () => {
  return (
    <section className="posts">
      <h1 className="header">Latest posts</h1>
      <PostSingle data={posts} />
      <LoadMore />
    </section>
  );
};

export default Posts;
