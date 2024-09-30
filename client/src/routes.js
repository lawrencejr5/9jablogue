import React from "react";
// import Navbar from "./components/Nav";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import CategoryPosts from "./pages/CategoryPosts";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Post from "./pages/Post";
import ErrorPage from "./pages/Error";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const routes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories:/name" element={<CategoryPosts />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default routes;
