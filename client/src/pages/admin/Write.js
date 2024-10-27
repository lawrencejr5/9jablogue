import React from "react";
import { FaSave } from "react-icons/fa";

import AdminNav from "../../components/AdminNav";
import Logo from "../../components/Logo";
import AdminDd from "../../components/AdminDd";
import MyEditor from "../../components/MyEditor";

import "react-quill/dist/quill.snow.css";

import { catgories } from "../../data/categories";

const Write = () => {
  return (
    <main className="admin-main write">
      <Logo />
      <AdminDd />
      <AdminNav />
      <div className="header">
        <h1>Write</h1>
      </div>
      <form action="">
        <div className="inp-holder">
          <label htmlFor="">Title:</label>
          <input type="title" placeholder="title" name="" id="" />
        </div>
        <div className="inp-holder">
          <label htmlFor="">Thumbnail:</label>
          <input type="file" name="" id="" />
        </div>
        <div className="inp-holder">
          <label htmlFor="">Description:</label>
          <input type="title" placeholder="description" name="" id="" />
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
          <MyEditor />
        </div>
        <div className="btn-holder">
          <button>
            Save &nbsp;
            <FaSave />
          </button>
        </div>
      </form>
    </main>
  );
};

export default Write;
