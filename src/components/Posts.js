import React from "react";
import PostSingle from "./PostSingle";
import { useGlobalContext } from "../context";
import LoadMore from "../components/LoadMore";
const Posts = () => {
  const { post } = useGlobalContext();
  return (
    <section className="posts">
      <h1 className="header">Latest posts</h1>
      <PostSingle data={post} />
      <LoadMore />
    </section>
  );
};

export default Posts;
