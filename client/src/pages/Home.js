import React from "react";
import Navbar from "../components/Nav";
import Sidenav from "../components/Sidenav";
import Banner from "../components/Banner";
import NewsLetter from "../components/NewsLetter";
import Tags from "../components/Tags";
import Posts from "../components/Posts";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { useGlobalContext } from "../context";
const Home = () => {
  const { loading } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }
  return (
    <main>
      <Navbar color={"white"} />
      <Sidenav />
      <Banner />
      <NewsLetter />
      <Tags />
      <Posts />
      <Footer />
    </main>
  );
};

export default Home;
