import React from "react";

import AdminNav from "../../components/AdminNav";
import Logo from "../../components/Logo";
import AdminDd from "../../components/AdminDd";

const Posts = () => {
  return (
    <main className="admin-main">
      <Logo />
      <AdminDd />
      <AdminNav />
      <div className="header">
        <h1>Your Posts</h1>
      </div>
    </main>
  );
};

export default Posts;
