import React from "react";
import Nav from "../components/Nav";
import Sidenav from "../components/Sidenav";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { useGlobalContext } from "../context";
import { FaChevronCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import { catgories } from "../data/categories";

const Categories = () => {
  const { loading } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }
  return (
    <main>
      <Nav color={"black"} />
      <section className="categ-container">
        <article className="header">
          <div className="header-center">
            <h1>Categories</h1>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Praesent eu porttitor
              enim, a semper lacus. Pellentesque habitant morbi tristique
              senectus et netus et malesuada fames.
            </p>
          </div>
        </article>
        <article className="categs">
          {catgories.map((categ, index) => {
            const { name, img, text } = categ;
            return (
              <div className="categ" key={index}>
                <div
                  className="img"
                  style={{
                    backgroundImage: `url(${img})`,
                  }}
                ></div>
                <Link to={`../categories/${name}`} className="content-link">
                  <div className="content">
                    <h1>{name}</h1>
                    <p>{text}</p>
                    <small> (10 Posts)</small>
                  </div>
                </Link>
              </div>
            );
          })}
        </article>
      </section>
      <Sidenav />
      <Footer />
    </main>
  );
};

export default Categories;
