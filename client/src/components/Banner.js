import React from "react";
import { useGlobalContext } from "../context";

import { didUKnw } from "../data/didUKnw";
const Banner = () => {
  const { dukNo } = useGlobalContext();
  return (
    <section className="banner">
      <div className="banner-center">
        <h1>Did you know?</h1>
        <em>
          {didUKnw.map((d, i) => {
            return (
              <span key={i} className={i == dukNo && "active-carousel"}>
                {d.text}
              </span>
            );
          })}
        </em>
      </div>
    </section>
  );
};

export default Banner;
