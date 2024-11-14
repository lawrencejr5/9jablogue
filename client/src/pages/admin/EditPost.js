import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import AdminNav from "../../components/AdminNav";
import Logo from "../../components/Logo";
import AdminDd from "../../components/AdminDd";
import Navbaek from "../../components/Navbaek";

import { catgories } from "../../data/categories";
import { posts } from "../../data/posts";
import { text } from "../../data/postText";

import { useGlobalContext } from "../../context";

const EditPost = () => {
  const { getPost, singlePost, getCategories, categories } = useGlobalContext();
  const { id } = useParams();

  useEffect(() => {
    getPost(id);
    getCategories();
  }, []);

  return (
    <main className="admin-main write">
      <Navbaek />
      <AdminDd />
      <div className="header">
        <h1>Edit Post</h1>
      </div>
      <form action="">
        <div className="inp-holder">
          <label htmlFor="">Title:</label>
          <input
            type="title"
            placeholder="title"
            name=""
            value={singlePost.title}
            id=""
          />
        </div>
        <div className="inp-holder">
          <label htmlFor="">Thumbnail:</label>
          <input type="file" name="" id="" />
        </div>
        <div className="inp-holder">
          <label htmlFor="">Description:</label>
          <input
            type="title"
            placeholder="description"
            value={singlePost.desc}
            name=""
            id=""
          />
        </div>
        <div className="check-holder">
          {categories.map((cat, i) => {
            return (
              <div className="check" key={i}>
                <input type="checkbox" name="" id="" />
                <label htmlFor="">{cat.category}</label>
              </div>
            );
          })}
        </div>
        <div className="inp-holder">
          <label htmlFor="">Post:</label>
          <textarea
            name=""
            placeholder="write something..."
            value={singlePost.body}
            id=""
          ></textarea>
        </div>
        <div className="btn-holder">
          <button>Update</button>
        </div>
      </form>
    </main>
  );
};

export default EditPost;
