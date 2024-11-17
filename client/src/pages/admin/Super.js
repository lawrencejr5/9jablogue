import React, { useState, useEffect } from "react";

import AdminNav from "../../components/AdminNav";
import Logo from "../../components/Logo";
import AdminDd from "../../components/AdminDd";
import Notification from "../../components/Notification";

import Loading from "../../components/Loading";

import Duks from "./super/Duks";
import Categories from "./super/Categories";
import Users from "./super/Users";
import Posts from "./super/Posts";

import { useGlobalContext } from "../../context";

const Super = () => {
  const {
    getPosts,
    getDuks,
    getBloggers,
    getCategories,
    notification,
    btnLoad,
    loading,
  } = useGlobalContext();

  useEffect(() => {
    getDuks();
    getCategories();
    getPosts();
    getBloggers();
  }, []);

  return (
    <>
      {/* {loading && <Loading />} */}
      <main className="admin-main dashboard">
        <Logo />
        <AdminDd />
        <AdminNav />

        <Notification notification={notification} />

        <div className="header">
          <h1>Super admin</h1>
          <h3>You're welcome to the super dongeon</h3>
        </div>

        {/*  All user accounts */}
        <Users />

        {/* All posts */}
        <Posts />

        {/* All categories */}
        <Categories />

        {/* All did you knows */}
        <Duks />
      </main>
    </>
  );
};

export default Super;
