import React, { useState } from "react";
import { FaEye, FaThumbsUp, FaEdit, FaTrash, FaEnvelope } from "react-icons/fa";

import { useGlobalContext } from "../../../context";

import DelUsr from "../../../components/modals/DelUsr";
import EditUsr from "../../../components/modals/EditUsr";
import Application from "../../../components/modals/Application";

const Users = () => {
  const { bloggers, updateUser, btnLoad, fileEndpoint } = useGlobalContext();

  const [delUsrClosed, setDelUsrClosed] = useState(true);
  const [editUsrClosed, setEditUsrClosed] = useState(true);
  const [openApply, setOpenApply] = useState(true);
  const [currUser, setCurrUser] = useState([]);

  // User functions
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
  const makeAdmin = async (id) => {
    const formData = {
      admin: true,
    };
    await updateUser(id, formData);
  };
  const removeAdmin = async (id) => {
    const formData = {
      admin: false,
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

  return (
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
              <th>Admin</th>
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
                        backgroundImage: `url(${fileEndpoint}/${blogger.profilePic})`,
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
                  <td>
                    {!blogger.admin ? (
                      <button
                        id="approve-btn"
                        onClick={() => makeAdmin(blogger._id)}
                      >
                        {btnLoad ? "Admining..." : "Make admin"}
                      </button>
                    ) : (
                      <button
                        id="unblock-btn"
                        onClick={() => removeAdmin(blogger._id)}
                      >
                        {btnLoad ? "Unadmining..." : "Remove Admin"}
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
  );
};

export default Users;
