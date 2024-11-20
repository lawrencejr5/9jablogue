import React from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { useGlobalContext } from "../context";
const TagSingle = ({ data }) => {
  const navigate = useNavigate();
  const { fileEndpoint } = useGlobalContext();
  return (
    <article className="singleTagCont">
      {data.map((datum, index) => {
        return (
          <div
            onClick={() => {
              navigate(`categories/${datum._id}`);
            }}
            className="singleTag"
            key={index}
          >
            <div
              className="img"
              style={{
                backgroundImage: `url(${fileEndpoint}/${datum.img})`,
              }}
            ></div>
            <span>{datum.category}</span>
            <FaChevronCircleRight className="chevron-right" />
          </div>
        );
      })}
    </article>
  );
};

export default TagSingle;
