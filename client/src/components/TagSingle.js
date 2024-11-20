import React from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const TagSingle = ({ data }) => {
  return (
    <article className="singleTagCont">
      {data.map((datum, index) => {
        return (
          <Link
            to={`categories/${datum._id}`}
            className="singleTag"
            key={index}
          >
            {datum.category}
            <FaChevronCircleRight className="chevron-right" />
          </Link>
        );
      })}
    </article>
  );
};

export default TagSingle;
