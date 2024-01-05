import React from "react";
import Nav from "../components/Nav";
import Sidenav from "../components/Sidenav";
import Footer from "../components/Footer";

const Error = () => {
  return (
    <main className="error-main">
      <Nav color={"black"} />
      <section className="error-section">
        My guy, I think ur lost. We reccommend navigating back to the home
        screen using the menu above.
      </section>
      <Sidenav />
      <Footer />
    </main>
  );
};

export default Error;
