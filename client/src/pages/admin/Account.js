import React from "react";

import AdminNav from "../../components/AdminNav";
import Logo from "../../components/Logo";
import AdminDd from "../../components/AdminDd";

const Account = () => {
  return (
    <main className="admin-main">
      <Logo />
      <AdminDd />
      <AdminNav />
      <div className="header">
        <h1>Account</h1>
      </div>
    </main>
  );
};

export default Account;
