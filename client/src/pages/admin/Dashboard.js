import React from "react";

import AdminNav from "../../components/AdminNav";
import Logo from "../../components/Logo";
import AdminDd from "../../components/AdminDd";

const Dashboard = () => {
  return (
    <main className="admin-main">
      <Logo />
      <AdminDd />
      <AdminNav />
      <div className="header">
        <h1>Dashboard</h1>
      </div>
    </main>
  );
};

export default Dashboard;
