import React from "react";
import Logo from "./Logo";
import { links } from "../data/links";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import NewsLetter from "./NewsLetterForm";

const Footer = () => {
  const { category } = useGlobalContext();
  return (
    <footer>
      <Logo />
      <div className="footer-content">
        <div className="quick-links">
          <h3>Quick Links</h3>
          {links.map((link, index) => {
            const { name, linkto, icon } = link;
            return (
              <Link to={linkto} className="link" key={index}>
                {icon}
                <span>{name}</span>
              </Link>
            );
          })}
        </div>
        <div className="tags">
          <h3>Tags</h3>
          {category.map((cat, index) => {
            return (
              <Link
                className="tag"
                to={`categories/${cat.category}`}
                key={index}
              >
                {cat.category}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="news-letter">
        <NewsLetter />
      </div>
    </footer>
  );
};

export default Footer;
