import React from "react";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import CategoryPosts from "./pages/CategoryPosts";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Post from "./pages/Post";

// Admin
import Dashboard from "./pages/admin/Dashboard";
import Write from "./pages/admin/Write";
import Posts from "./pages/admin/Posts";
import Account from "./pages/admin/Account";

import ErrorPage from "./pages/Error";
import ScrollTop from "./components/ScrollTop";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <ScrollTop />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/:name" element={<CategoryPosts />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="admin" element={<Dashboard />} />
          <Route path="admin/posts" element={<Posts />} />
          <Route path="admin/write" element={<Write />} />
          <Route path="admin/account" element={<Account />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
