import React from "react";
import { FaEdit } from "react-icons/fa";

import AdminNav from "../../components/AdminNav";
import Logo from "../../components/Logo";
import AdminDd from "../../components/AdminDd";

const Account = () => {
  return (
    <main className="admin-main account">
      <Logo />
      <AdminDd />
      <AdminNav />
      <div className="header">
        <h1>Account</h1>
        <div className="header-center">
          <div
            className="img"
            style={{ backgroundImage: `url(/imgs/profilePic1.jpg)` }}
          ></div>
          <h2>Oputa Ifeanyi Lawrence</h2>
          <span>lawrencejr</span>
        </div>
      </div>
      <div className="body">
        <h2>User details...</h2>
        <form>
          <div className="inp-handler">
            <div className="inp-holder">
              <input type="text" placeholder="fullname" />
            </div>
            <div className="inp-holder">
              <input type="text" placeholder="username" />
            </div>
            <div className="inp-holder">
              <input type="email" placeholder="email" />
            </div>
            <div className="inp-holder">
              <input type="text" placeholder="bio" />
            </div>
          </div>
          <div className="btn-holder">
            <button>update</button>
          </div>
        </form>
        <h2>Change password...</h2>
        <form>
          <div className="inp-handler">
            <div className="inp-holder">
              <input type="password" placeholder="old password" />
            </div>
            <div className="inp-holder">
              <input type="password" placeholder="new password" />
            </div>
            <div className="inp-holder">
              <input type="password" placeholder="confirm password" />
            </div>
          </div>
          <div className="btn-holder">
            <button>update</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Account;
