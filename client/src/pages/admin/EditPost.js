import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import AdminDd from "../../components/AdminDd";
import Navbaek from "../../components/Navbaek";

import Notification from "../../components/Notification";

import MyEditor from "../../components/MyEditor";

import { useGlobalContext } from "../../context";

const EditPost = () => {
  const {
    getPost,
    updatePost,
    singlePost,
    getCategories,
    categories,
    btnLoad,
    notification,
  } = useGlobalContext();
  const { id } = useParams();

  const [input, setInput] = useState({
    title: "",
    thumb: "",
    desc: "",
    categories: [],
    body: "",
  });

  useEffect(() => {
    getPost(id);
    getCategories();
  }, []);

  useEffect(() => {
    setInput({
      title: singlePost.title,
      thumb: singlePost.thumb,
      desc: singlePost.desc,
      categories: singlePost.categories ? [...singlePost.categories] : [],
      body: singlePost.body,
    });
  }, [singlePost]);

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
      const categories = checked
        ? [...prevInput.categories, name]
        : prevInput.categories.filter((category) => category !== name);
      return { ...prevInput, categories };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    for (const key in input) {
      if (key !== "categories") formdata.append(key, input[key]);
    }
    input.categories.forEach((category) => {
      formdata.append(`categories[]`, category);
    });
    await updatePost(id, formdata);
  };

  return (
    <main className="admin-main write">
      <Navbaek />
      <AdminDd />
      <div className="header">
        <h1>Edit Post</h1>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="inp-holder">
          <label htmlFor="">Title:</label>
          <input
            type="text"
            placeholder="title"
            name="title"
            onChange={handleChange}
            value={input.title}
            id="title"
          />
        </div>
        <div className="inp-holder">
          <label htmlFor="">Cover photo:</label>
          <input type="file" name="thumb" onChange={handleChange} id="" />
        </div>
        <div className="inp-holder">
          <label htmlFor="">Description:</label>
          <input
            type="text"
            placeholder="description"
            onChange={handleChange}
            value={input.desc}
            name="desc"
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
                  id=""
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
          <button>{btnLoad ? "Saving..." : "Save changes"}</button>
        </div>
      </form>
      <Notification notification={notification} />
    </main>
  );
};

export default EditPost;
