import React from "react";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import CategoryPosts from "./pages/CategoryPosts";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import Bloggers from "./pages/Bloggers";
import BloggerPosts from "./pages/BloggerPosts";

// Auth
import Register from "./pages/admin/Register";
import Login from "./pages/admin/Login";

// Admin
import Dashboard from "./pages/admin/Dashboard";
import Write from "./pages/admin/Write";
import MyPosts from "./pages/admin/MyPosts";
import Account from "./pages/admin/Account";
import EditPost from "./pages/admin/EditPost";
import Super from "./pages/admin/Super";

import ErrorPage from "./pages/Error";
import ScrollTop from "./components/ScrollTop";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Application from "./pages/admin/Application";

const App = () => {
  return (
    <>
      <Router>
        <ScrollTop />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/categories/" element={<Categories />} />
          <Route path="/categories/:name" element={<CategoryPosts />} />
          <Route path="/about/" element={<About />} />
          <Route path="/contact/" element={<Contact />} />
          <Route path="/bloggers" element={<Bloggers />} />
          <Route path="/bloggers/:name" element={<BloggerPosts />} />
          <Route path="/posts/" element={<Posts />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/application" element={<Application />} />
          <Route path="/admin/" element={<Dashboard />} />
          <Route path="/admin/super" element={<Super />} />
          <Route path="admin/posts/" element={<MyPosts />} />
          <Route path="admin/write/" element={<Write />} />
          <Route path="admin/edit-post/:id" element={<EditPost />} />
          <Route path="admin/account/" element={<Account />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
