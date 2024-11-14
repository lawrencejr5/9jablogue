import React, { useState, useRef } from "react";
import { FaSave } from "react-icons/fa";

import AdminNav from "../../components/AdminNav";
import Logo from "../../components/Logo";
import AdminDd from "../../components/AdminDd";
import MyEditor from "../../components/MyEditor";
import Notification from "../../components/Notification";

import { useGlobalContext } from "../../context";

const Write = () => {
  const { createPost, btnLoad, notification, categories } = useGlobalContext();

  const [input, setInput] = useState({
    title: "",
    thumb: "",
    desc: "",
    categories: [],
    body: "",
  });
  const thumbRef = useRef(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = name === "thumb" ? e.target.files[0] : e.target.value;
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleBodyChange = (value) => {
    setInput((prev) => {
      return { ...prev, body: value };
    });
  };

  const handleCheckChange = (e) => {
    const { name, checked } = e.target;

    setInput((prevInput) => {
      const newCategories = checked
        ? [...prevInput.categories, name]
        : prevInput.categories.filter((category) => category !== name);
      return { ...prevInput, categories: newCategories };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in input) {
      if (key !== "categories") formData.append(key, input[key]);
    }
    input.categories.forEach((category) => {
      formData.append(`categories[]`, category);
    });
    await createPost(formData);
    thumbRef.current.value = "";
    setInput({ title: "", desc: "", categories: [], thumb: null });
  };
  return (
    <main className="admin-main write">
      <Logo />
      <AdminDd />
      <AdminNav />
      <Notification notification={notification} />
      <div className="header">
        <h1>Write</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inp-holder">
          <label htmlFor="">Title:</label>
          <input
            type="title"
            placeholder="title"
            name="title"
            value={input.title}
            onChange={handleChange}
            id="title"
          />
        </div>
        <div className="inp-holder">
          <label htmlFor="">Cover photo:</label>
          <input
            type="file"
            name="thumb"
            ref={thumbRef}
            onChange={handleChange}
            id=""
          />
        </div>
        <div className="inp-holder">
          <label htmlFor="">Description:</label>
          <input
            type="title"
            placeholder="description"
            name="desc"
            value={input.desc}
            onChange={handleChange}
            id=""
          />
        </div>
        <div className="check-holder">
          {categories.map((cat, i) => {
            return (
              <div className="check" key={i}>
                <input
                  type="checkbox"
                  name={cat._id}
                  onChange={handleCheckChange}
                  checked={input.categories.includes(cat._id)}
                />
                <label htmlFor="">{cat.category}</label>
              </div>
            );
          })}
        </div>
        <div className="inp-holder">
          <label htmlFor="">Post:</label>
          <MyEditor value={input.body} handleChange={handleBodyChange} />
          <input type="hidden" name="body" value={input.body} />
        </div>
        <div className="btn-holder">
          {btnLoad ? (
            <button>Saving...</button>
          ) : (
            <button>
              Save &nbsp;
              <FaSave />
            </button>
          )}
        </div>
      </form>
    </main>
  );
};

export default Write;
