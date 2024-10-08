import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import AdminNav from "../../components/AdminNav";
import Logo from "../../components/Logo";
import AdminDd from "../../components/AdminDd";
import Navbaek from "../../components/Navbaek";

import { catgories } from "../../data/categories";
import { posts } from "../../data/posts";
import { text } from "../../data/postText";

const EditPost = () => {
  const { id } = useParams();
  const thePost = posts.find((post) => post.id === Number(id));

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
            value={thePost.title}
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
            value={thePost.description}
            name=""
            id=""
          />
        </div>
        <div className="check-holder">
          {catgories.map((cat, i) => {
            return (
              <div className="check" key={i}>
                <input type="checkbox" name="" id="" />
                <label htmlFor="">{cat.name}</label>
              </div>
            );
          })}
        </div>
        <div className="inp-holder">
          <label htmlFor="">Post:</label>
          <textarea
            name=""
            placeholder="write something..."
            value={text}
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
