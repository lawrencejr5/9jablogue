import React from "react";
import TagSingle from "./TagSingle";
import { FaTags } from "react-icons/fa";
import { useGlobalContext } from "../context";
import { catgories } from "../data/categories";
const Tags = () => {
  return (
    <section className="tags-container">
      <h1>
        Popular Tags <FaTags className="tag-icon" />
      </h1>
      <TagSingle data={catgories} />
    </section>
  );
};

export default Tags;
