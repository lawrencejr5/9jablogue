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
  const { loading, fileEndpoint, categories } = useGlobalContext();

  return (
    <>
      {loading && <Loading />}
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
            {categories.map((categ, index) => {
              const { _id: id, category, img, description } = categ;
              return (
                <div className="categ" key={index}>
                  <div
                    className="img"
                    style={{
                      backgroundImage: `url(${img})`,
                    }}
                  ></div>
                  <Link to={`../categories/${id}`} className="content-link">
                    <div className="content">
                      <h1>{category}</h1>
                      <p>{description}</p>
                      {/* <small> (10 Posts)</small> */}
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
    </>
  );
};

export default Categories;
