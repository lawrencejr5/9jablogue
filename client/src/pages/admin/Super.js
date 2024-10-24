import React, { useState } from "react";
import {
  FaEye,
  FaThumbsUp,
  FaShare,
  FaEdit,
  FaTrash,
  FaStar,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import AdminNav from "../../components/AdminNav";
import Logo from "../../components/Logo";
import AdminDd from "../../components/AdminDd";
import DelPost from "../../components/modals/DelPost";

import { posts } from "../../data/posts";
import { bloggers } from "../../data/bloggers";
import { catgories } from "../../data/categories";
import { didUKnw } from "../../data/didUKnw";

const Super = () => {
  const navigate = useNavigate();

  const [delClosed, setDelClosed] = useState(true);
  return (
    <main className="admin-main dashboard">
      <Logo />
      <AdminDd />
      <AdminNav />
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
                <th>Total share</th>
                <th>Actions</th>
                <th>Approve/Block</th>
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
                          backgroundImage: `url(${blogger.img})`,
                        }}
                      ></div>
                      <div className="content">
                        <strong>{blogger.fullname}</strong>
                        <br />
                        <small>@{blogger.username}</small>
                      </div>
                    </td>
                    <td>7 post(s)</td>
                    <td>
                      15k <FaEye />
                    </td>
                    <td>
                      6.5k <FaThumbsUp />
                    </td>
                    <td>
                      8k <FaShare />
                    </td>
                    <td>
                      <div className="actn-btns">
                        <button id="edit" style={{ color: "green" }}>
                          <FaEdit />
                        </button>
                        <button id="del" style={{ color: "red" }}>
                          <FaTrash />
                        </button>
                      </div>{" "}
                    </td>
                    <td>
                      <button id="approve-btn">Approve</button>&nbsp;
                      <button id="block-btn">Block</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="posts">
        <h1>All posts</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Post</th>
                <th>
                  <FaEye className="icon" />
                </th>
                <th>
                  <FaThumbsUp className="icon" />
                </th>
                <th>
                  <FaShare className="icon" />
                </th>
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
                          backgroundImage: `url(${post.thumb})`,
                        }}
                      ></div>
                      <div className="content">
                        <strong>{post.title}</strong>
                        <br />
                        <small>23rd Nov, 2023</small>
                      </div>
                    </td>
                    <td>
                      365 <FaEye />
                    </td>
                    <td>
                      222 <FaThumbsUp />
                    </td>
                    <td>
                      281 <FaShare />
                    </td>
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
                          onClick={() => setDelClosed(false)}
                        >
                          <FaTrash />
                        </button>
                        <button style={{ color: "black" }}>
                          <FaStar />
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
        <DelPost closed={delClosed} setClosed={setDelClosed} />
      </div>

      <div className="categories">
        <h1>Categories</h1>
        <h3>
          Create category <FaPlus size={13} />
        </h3>
        <form>
          <div className="inp-holder">
            <input type="file" />
          </div>
          <div className="inp-holder">
            <input type="text" placeholder="category" />
          </div>
          <div className="inp-holder">
            <input type="text" placeholder="description" />
          </div>
          <div className="btn-holder">
            <button>
              Create <FaPlus />
            </button>
          </div>
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
              {catgories.map((categ, i) => {
                return (
                  <tr key={i}>
                    <td className="post">
                      <div
                        className="img"
                        style={{
                          backgroundImage: `url(${categ.img})`,
                        }}
                      ></div>
                      <div className="content">
                        <strong>{categ.name}</strong>
                        <br />
                        <small>{categ.text}</small>
                      </div>
                    </td>

                    <td>
                      <div className="actn-btns">
                        <button id="edit" style={{ color: "green" }}>
                          <FaEdit />
                        </button>
                        <button id="del" style={{ color: "red" }}>
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
      </div>

      <div className="duks">
        <h1>Did you know?</h1>
        <h3>
          Add "did you know" <FaPlus size={13} />
        </h3>
        <form>
          <div className="inp-holder">
            <input type="text" placeholder="did you know..." />
          </div>
          <div className="btn-holder">
            <button>
              Add <FaPlus />
            </button>
          </div>
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
              {didUKnw.map((post, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td className="post">{post.text}</td>

                    <td>
                      <div className="actn-btns">
                        <button id="edit" style={{ color: "green" }}>
                          <FaEdit />
                        </button>
                        <button id="del" style={{ color: "red" }}>
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
      </div>
    </main>
  );
};

export default Super;
