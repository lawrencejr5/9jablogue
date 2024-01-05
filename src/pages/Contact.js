import React from "react";
import Nav from "../components/Nav";
import Sidenav from "../components/Sidenav";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { useGlobalContext } from "../context";
const Contact = () => {
  const { loading } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }
  return (
    <main className="contact-main">
      <Nav color={"black"} />
      <Sidenav />
      <section className="contact-flex">
        <h1>Contact us</h1>
        <article className="contact-form">
          <form>
            <input type="text" placeholder="Fullname" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Subect" />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Your Message"
            ></textarea>
            <button>Submit</button>
          </form>
        </article>
        <article className="contact-image">
          <img
            src="imgs/desola-lanre-ologun-BVr3XaBiWLU-unsplash.jpg"
            width="100%"
            height="auto"
            alt=""
          />
        </article>
      </section>
      <Footer />
    </main>
  );
};

export default Contact;
