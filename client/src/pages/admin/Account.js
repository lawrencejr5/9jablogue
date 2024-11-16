import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminNav from "../../components/AdminNav";
import Logo from "../../components/Logo";
import AdminDd from "../../components/AdminDd";
import Notification from "../../components/Notification";

import { useGlobalContext } from "../../context";

const Account = () => {
  const navigate = useNavigate();

  const {
    signedIn,
    signedInUser,
    getUser,
    updateUser,
    updatePassword,
    btnLoad,
    notification,
  } = useGlobalContext();

  const [input, setInput] = useState({
    username: "",
    fullname: "",
    email: "",
    profilePic: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    threads: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const name = e.target.id;
    const value = name == "profilePic" ? e.target.files[0] : e.target.value;
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    for (const key in input) formdata.append(key, input[key]);

    await updateUser(signedIn, formdata);
    await getUser();
  };

  const handleSocialSubmit = async (e) => {
    e.preventDefault();
    const formdata = {
      socials: {
        instagram: input.instagram,
        facebook: input.facebook,
        threads: input.threads,
        twitter: input.twitter,
        linkedin: input.linkedin,
      },
    };
    await updateUser(signedIn, formdata);
    await getUser();
  };
  const handlePassSubmit = async (e) => {
    e.preventDefault();

    const formdata = {
      oldPassword: input.oldPassword,
      newPassword: input.newPassword,
      confirmPassword: input.confirmPassword,
    };
    await updatePassword(formdata);
    setTimeout(() => {
      navigate("/login");
    }, 2500);
  };

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (signedInUser) {
      const {
        username,
        fullname,
        profilePic,
        email,
        socials: { instagram, twitter, linkedin, facebook, threads },
      } = signedInUser;

      setInput((prev) => {
        return {
          ...prev,
          username,
          fullname,
          email,
          profilePic,
          instagram,
          twitter,
          threads,
          facebook,
          linkedin,
        };
      });
    }
  }, [signedInUser]);
  return (
    <main className="admin-main account">
      <Logo />
      <AdminDd />
      <AdminNav />
      <Notification notification={notification} />
      <div className="header">
        <h1>Account</h1>
        <div className="header-center">
          <div
            className="img"
            style={{
              backgroundImage: `url(http://localhost:5000/api/v1/uploads/${
                signedInUser && signedInUser.profilePic
              })`,
            }}
          ></div>
          <h2>{signedInUser && signedInUser.fullname}</h2>
          <span>@{signedInUser && signedInUser.username}</span>
        </div>
      </div>
      <div className="body">
        <h2>User details...</h2>
        <form onSubmit={handleUserSubmit}>
          <div className="inp-handler">
            <div className="inp-holder">
              <input type="file" id="profilePic" onChange={handleChange} />
            </div>
            <div className="inp-holder">
              <input
                type="text"
                id="fullname"
                value={input.fullname}
                onChange={handleChange}
                placeholder="fullname"
              />
            </div>
            <div className="inp-holder">
              <input
                type="text"
                id="username"
                value={input.username}
                onChange={handleChange}
                placeholder="username"
              />
            </div>
            <div className="inp-holder">
              <input
                type="email"
                id="email"
                value={input.email}
                onChange={handleChange}
                placeholder="email"
              />
            </div>
          </div>
          <div className="btn-holder">
            <button>{btnLoad ? "Saving..." : "Save changes"}</button>
          </div>
        </form>
        <h2>Socials...</h2>
        <form onSubmit={handleSocialSubmit}>
          <div className="inp-handler">
            <div className="inp-holder">
              <input
                type="text"
                id="facebook"
                value={input.facebook}
                onChange={handleChange}
                placeholder="facebook"
              />
            </div>
            <div className="inp-holder">
              <input
                type="text"
                id="instagram"
                value={input.instagram}
                onChange={handleChange}
                placeholder="instagram"
              />
            </div>
            <div className="inp-holder">
              <input
                type="text"
                id="twitter"
                value={input.twitter}
                onChange={handleChange}
                placeholder="twitter"
              />
            </div>
            <div className="inp-holder">
              <input
                type="text"
                id="threads"
                value={input.threads}
                onChange={handleChange}
                placeholder="threads"
              />
            </div>
            <div className="inp-holder">
              <input
                type="text"
                id="linkedin"
                value={input.linkedin}
                onChange={handleChange}
                placeholder="linkedin"
              />
            </div>
          </div>
          <div className="btn-holder">
            <button>{btnLoad ? "Saving..." : "Save changes"}</button>
          </div>
        </form>
        <h2>Change password...</h2>
        <form onSubmit={handlePassSubmit}>
          <div className="inp-handler">
            <div className="inp-holder">
              <input
                type="password"
                id="oldPassword"
                value={input.oldPassword}
                onChange={handleChange}
                placeholder="old password"
              />
            </div>
            <div className="inp-holder">
              <input
                type="password"
                id="newPassword"
                value={input.newPassword}
                onChange={handleChange}
                placeholder="new password"
              />
            </div>
            <div className="inp-holder">
              <input
                type="password"
                id="confirmPassword"
                value={input.confirmPassword}
                onChange={handleChange}
                placeholder="confirm password"
              />
            </div>
          </div>
          <div className="btn-holder">
            <button>Save changes</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Account;
