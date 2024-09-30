import React from "react";
import Nav from "../components/Nav";
import Sidenav from "../components/Sidenav";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { useGlobalContext } from "../context";

const About = () => {
  const { loading } = useGlobalContext();
  // if (loading) {
  //   return <Loading />;
  // }
  return (
    <main>
      <Nav color={"black"} />
      <section className="about-content">
        <h1>About us</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit
          sequi, quaerat nemo itaque modi qui numquam ea ab natus possimus
          dignissimos culpa sapiente pariatur necessitatibus incidunt, beatae,
          laborum quibusdam quos. Aenean eget urna aliquet, viverra orci quis,
          aliquam erat. Ut rutrum quam quam, eu eleifend est blandit et. Vivamus
          suscipit ultrices. Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Veritatis quos repudiandae similique sit, reprehenderit dolor
          fugit illo incidunt! Neque quisquam eveniet alias fugiat porro
          aliquam, sint quaerat veniam inventore facilis. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Perspiciatis consectetur amet
          doloremque neque velit. Rerum sequi commodi odit asperiores impedit
          dicta similique magnam atque corporis nisi, vero nostrum saepe
          dolorem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
          facilis dicta, asperiores architecto libero in id corporis quod ipsam.
          Laboriosam officia totam nulla nostrum excepturi, aspernatur quae
          incidunt iure fuga!
        </p>
        <h1>About the founder</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit
          sequi, quaerat nemo itaque modi qui numquam ea ab natus possimus
          dignissimos culpa sapiente pariatur necessitatibus incidunt, beatae,
          laborum quibusdam quos.
        </p>
      </section>
      <Sidenav />
      <Footer />
    </main>
  );
};

export default About;
