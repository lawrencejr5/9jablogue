import React from "react";
import TagSingle from "./TagSingle";
import { FaTags } from "react-icons/fa";
import { useGlobalContext } from "../context";
const Tags = () => {
  const { category } = useGlobalContext();
  return (
    <section className="tags-container">
      <h1>
        Popular Tags <FaTags className="tag-icon" />
      </h1>
      <TagSingle data={category} />
    </section>
  );
};

export default Tags;
