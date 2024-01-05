import React from "react";
import { Link } from "react-router-dom";

const PostSingle = ({ data }) => {
  return (
    <article className="singlePost-container">
      {data.map((datum) => {
        const { title, description, thumb, id, categories } = datum;
        let newTitle = title.replaceAll(" ", "_");
        let newwTitle = newTitle.replaceAll("?", "");

        let lowTitle = newwTitle.toLowerCase();
        return (
          <div key={id} className="singlePost">
            <div
              className="img"
              style={{
                backgroundImage: `url(http://localhost/9jablogueApi/admin/uploads/${thumb})`,
              }}
            ></div>
            <div className="content">
              <Link className="link" to={`/post/${lowTitle}/${id}`}>
                {categories.map((tag, index) => {
                  return (
                    tag && (
                      <Link key={index} to={`/categories/${tag}`}>
                        <button className="tag">{tag}</button>
                      </Link>
                    )
                  );
                })}
                <h1 className="title">{title}</h1>
                <p>{description}</p>
              </Link>
            </div>
          </div>
        );
      })}
    </article>
  );
};
export default PostSingle;
