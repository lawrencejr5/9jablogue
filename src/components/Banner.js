import React from "react";
import { useGlobalContext } from "../context";
const Banner = () => {
  const { duk, dukNo } = useGlobalContext();
  return (
    <section className="banner">
      <div className="banner-center">
        <h1>Did you know?</h1>
        <em>
          {duk.map((d, i) => {
            return (
              <span key={i} className={i == dukNo && "active-carousel"}>
                {d.duk}
              </span>
            );
          })}
        </em>
      </div>
    </section>
  );
};

export default Banner;
