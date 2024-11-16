import React, { useState, useRef, useEffect } from "react";
import {
  FaEye,
  FaThumbsUp,
  FaShare,
  FaEdit,
  FaTrash,
  FaPlus,
  FaEnvelope,
  FaRegHeart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminNav from "../../components/AdminNav";
import Logo from "../../components/Logo";
import AdminDd from "../../components/AdminDd";
import DelPost from "../../components/modals/DelPost";
import DelCat from "../../components/modals/DelCat";
import DelDuk from "../../components/modals/DelDuk";
import DelUsr from "../../components/modals/DelUsr";
import EditUsr from "../../components/modals/EditUsr";
import Application from "../../components/modals/Application";
import Notification from "../../components/Notification";
import Loading from "../../components/Loading";

import { posts } from "../../data/posts";

import { useGlobalContext } from "../../context";

const Super = () => {
  const {
    duks,
    addDuk,
    updateDuk,
    categories,
    createCategory,
    updateCategory,
    bloggers,
    // posts,
    getPosts,
    getDuks,
    getBloggers,
    getCategories,
    updateUser,
    notification,
    btnLoad,
    loading,
    endpoint,
  } = useGlobalContext();

  useEffect(() => {
    getDuks();
    getCategories();
    getPosts();
    getBloggers();
  }, []);

  const navigate = useNavigate();

  const [delPostClosed, setDelPostClosed] = useState(true);
  const [delCatClosed, setDelCatClosed] = useState(true);
  const [delDukClosed, setDelDukClosed] = useState(true);
  const [delUsrClosed, setDelUsrClosed] = useState(true);

  const [editUsrClosed, setEditUsrClosed] = useState(true);

  const [openApply, setOpenApply] = useState(true);
  const [currUser, setCurrUser] = useState([]);

  const openApplyFunc = (curr) => {
    setCurrUser(curr);
    setOpenApply(false);
  };
  const approveUser = async (id) => {
    const formData = {
      status: 1,
    };
    await updateUser(id, formData);
  };
  const blockUser = async (id) => {
    const formData = {
      status: 2,
    };
    await updateUser(id, formData);
  };
  const editUserFunc = (curr) => {
    setCurrUser(curr);
    setEditUsrClosed(false);
  };
  const delUserFunc = (curr) => {
    setCurrUser(curr);
    setDelUsrClosed(false);
  };

  // Inputs
  const [input, setInput] = useState({
    duk: "",
    category: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value.toLowerCase();
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleFileChange = (e) => {
    setInput((prev) => {
      return { ...prev, file: e.target.files[0] };
    });
  };

  // Duk
  const [currDuk, setCurrDuk] = useState(null);
  const [dukEditing, setDukEditing] = useState(false);

  const handleDukSubmit = async (e) => {
    e.preventDefault();
    await addDuk(input);
    setInput({ ...input, duk: "" });
  };

  const editDukFunc = (curr) => {
    setCurrDuk(curr);
    setInput({ duk: curr.text });
    setDukEditing(true);
  };

  const handleDukUpdate = async (e) => {
    e.preventDefault();
    await updateDuk(currDuk._id, input);
    setCurrDuk(null);
    setInput({ duk: "" });
    setDukEditing(false);
  };

  const delDukFunc = (curr) => {
    setCurrDuk(curr);
    setDelDukClosed(false);
  };

  // Category
  const inputRef = useRef(null);
  const [currCateg, setCurrCateg] = useState([]);
  const [categEditing, setCategEditing] = useState(false);
  const handleCategSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in input) {
      formData.append(key, input[key]);
    }
    await createCategory(formData);
    setInput({ ...input, category: "", description: "", file: null });
    inputRef.current.value = "";
  };
  const delCategFunc = (categ) => {
    setCurrCateg(categ);
    setDelCatClosed(false);
  };
  const editCategFunc = (categ) => {
    setCurrCateg(categ);
    setCategEditing(true);
    setInput({
      ...input,
      category: categ.category,
      description: categ.description,
      file: "",
    });
  };

  const handleCategUpdate = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("category", input.category);
    formdata.append("description", input.description);
    if (input.file) {
      formdata.append("file", input.file);
    }
    await updateCategory(currCateg._id, formdata);
    setCategEditing(false);
    setInput({ ...input, category: "", description: "", file: null });
    inputRef.current.value = "";
  };

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
        <div className="accounts">
          <h1>Manage accounts</h1>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Total posts</th>
                  <th>Total views</th>
                  <th>Total likes</th>
                  <th>Actions</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bloggers.map((blogger, i) => {
                  return (
                    <tr key={i}>
                      <td className="post">
                        <div
                          className="img"
                          style={{
                            backgroundImage: `url(http://localhost:5000/api/v1/uploads/${blogger.profilePic})`,
                          }}
                        ></div>
                        <div className="content">
                          <strong>{blogger.fullname}</strong>
                          <br />
                          <small>@{blogger.username}</small>
                        </div>
                      </td>
                      <td>{blogger.totalPosts} post(s)</td>
                      <td>
                        {blogger.totalViews} <FaEye />
                      </td>
                      <td>
                        {blogger.totalLikes} <FaThumbsUp />
                      </td>
                      <td>
                        <div className="actn-btns">
                          <button
                            id="edit"
                            onClick={() => editUserFunc(blogger)}
                            style={{ color: "green" }}
                          >
                            <FaEdit />
                          </button>
                          <button
                            id="edit"
                            onClick={() => openApplyFunc(blogger)}
                            style={{ color: "grey" }}
                          >
                            <FaEnvelope />
                          </button>
                          {blogger.admin ? (
                            ""
                          ) : (
                            <button
                              id="del"
                              onClick={() => delUserFunc(blogger)}
                              style={{ color: "red" }}
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>{" "}
                      </td>
                      <td>
                        {blogger.status === 0 ? (
                          <button
                            id="approve-btn"
                            onClick={() => approveUser(blogger._id)}
                          >
                            {btnLoad ? "Approving..." : "Approve"}
                          </button>
                        ) : blogger.status === 1 ? (
                          <button
                            id="block-btn"
                            onClick={() => blockUser(blogger._id)}
                          >
                            {btnLoad ? "Blocking..." : "Block"}
                          </button>
                        ) : (
                          <button
                            id="unblock-btn"
                            onClick={() => approveUser(blogger._id)}
                          >
                            {btnLoad ? "Unblocking..." : "Unblock"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Application
            closed={openApply}
            setClosed={setOpenApply}
            currUser={currUser}
          />
          <EditUsr
            closed={editUsrClosed}
            setClosed={setEditUsrClosed}
            currUser={currUser}
          />
          <DelUsr
            closed={delUsrClosed}
            setClosed={setDelUsrClosed}
            currUser={currUser}
          />
        </div>

        <div className="posts">
          <h1>All posts</h1>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Post</th>
                  <th>By</th>
                  <th>Categories</th>
                  <th>Date & time</th>
                  <th>
                    <FaEye className="icon" />
                  </th>
                  <th>
                    <FaThumbsUp className="icon" />
                  </th>
                  {/* <th>
                    <FaShare className="icon" />
                  </th> */}
                  <th>Actions</th>
                  <th>Approve</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, i) => {
                  return (
                    <tr key={i}>
                      <td className="post">
                        <div
                          className="img"
                          style={{
                            backgroundImage: `url(http://localhost:5000/api/v1/uploads/${post.thumb})`,
                          }}
                        ></div>
                        <div className="content">
                          <strong>{post.title}</strong>
                          <br />
                          <small>{post.desc}</small>
                        </div>
                      </td>
                      {/* <td>@{post.author.username}</td> */}
                      <td>
                        {post.tags.map((cat, i) => {
                          return (
                            <span key={i}>
                              {cat} <br />
                            </span>
                          );
                        })}
                      </td>
                      <td>23rd Nov, 2024</td>
                      <td>
                        365 <FaEye />
                      </td>
                      <td>
                        222 <FaThumbsUp />
                      </td>
                      {/* <td>
                        281 <FaShare />
                      </td> */}
                      <td>
                        <div className="actn-btns">
                          <button
                            id="edit"
                            style={{ color: "green" }}
                            onClick={() =>
                              navigate(`/admin/edit-post/${post.id}`)
                            }
                          >
                            <FaEdit />
                          </button>
                          <button
                            id="del"
                            style={{ color: "red" }}
                            onClick={() => setDelPostClosed(false)}
                          >
                            <FaTrash />
                          </button>
                          <button style={{ color: "black" }}>
                            <FaRegHeart />
                          </button>
                        </div>{" "}
                      </td>
                      <td>
                        <button id="approve-btn">Approve</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <DelPost closed={delPostClosed} setClosed={setDelPostClosed} />
        </div>

        <div className="categories">
          <h1>Categories</h1>
          <h3>
            Create category <FaPlus size={13} />
          </h3>
          <form onSubmit={categEditing ? handleCategUpdate : handleCategSubmit}>
            <div className="inp-holder">
              <input type="file" ref={inputRef} onChange={handleFileChange} />
            </div>
            <div className="inp-holder">
              <input
                type="text"
                placeholder="category"
                name="category"
                onChange={handleChange}
                value={input.category}
              />
            </div>
            <div className="inp-holder">
              <input
                type="text"
                placeholder="description"
                name="description"
                onChange={handleChange}
                value={input.description}
              />
            </div>
            {categEditing ? (
              <div className="btn-holder">
                {btnLoad ? (
                  <button>Upudating...</button>
                ) : (
                  <button>
                    Edit <FaEdit />
                  </button>
                )}
              </div>
            ) : (
              <div className="btn-holder">
                {btnLoad ? (
                  <button>Adding...</button>
                ) : (
                  <button>
                    Add <FaPlus />
                  </button>
                )}
              </div>
            )}
          </form>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((categ, i) => {
                  return (
                    <tr key={i}>
                      <td className="post">
                        <div
                          className="img"
                          style={{
                            backgroundImage: `url(${endpoint}/uploads/${categ.img})`,
                          }}
                        ></div>
                        <div className="content">
                          <strong>{categ.category}</strong>
                          <br />
                          <small>{categ.description}</small>
                        </div>
                      </td>

                      <td>
                        <div className="actn-btns">
                          <button
                            id="edit"
                            onClick={() => editCategFunc(categ)}
                            style={{ color: "green" }}
                          >
                            <FaEdit />
                          </button>
                          <button
                            id="del"
                            onClick={() => delCategFunc(categ)}
                            style={{ color: "red" }}
                          >
                            <FaTrash />
                          </button>
                        </div>{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <DelCat
            closed={delCatClosed}
            setClosed={setDelCatClosed}
            categ={currCateg}
          />
        </div>

        <div className="duks">
          <h1>Did you know?</h1>
          <h3>
            Add "did you know" <FaPlus size={13} />
          </h3>
          <form onSubmit={dukEditing ? handleDukUpdate : handleDukSubmit}>
            <div className="inp-holder">
              <input
                type="text"
                onChange={handleChange}
                value={input.duk}
                name="duk"
                placeholder="did you know..."
              />
            </div>
            {dukEditing ? (
              <div className="btn-holder">
                {btnLoad ? (
                  <button>Upudating...</button>
                ) : (
                  <button>
                    Edit <FaEdit />
                  </button>
                )}
              </div>
            ) : (
              <div className="btn-holder">
                {btnLoad ? (
                  <button>Adding...</button>
                ) : (
                  <button>
                    Add <FaPlus />
                  </button>
                )}
              </div>
            )}
          </form>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Text</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {duks.map((duk, i) => {
                  return (
                    <tr key={i}>
                      <td>{duk._id}</td>
                      <td className="post">{duk.text}</td>
                      <td>
                        <div className="actn-btns">
                          <button
                            id="edit"
                            onClick={() => editDukFunc(duk)}
                            style={{ color: "green" }}
                          >
                            <FaEdit />
                          </button>
                          <button
                            id="del"
                            onClick={() => delDukFunc(duk)}
                            style={{ color: "red" }}
                          >
                            <FaTrash />
                          </button>
                        </div>{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <DelDuk
              currDuk={currDuk}
              closed={delDukClosed}
              setClosed={setDelDukClosed}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Super;
