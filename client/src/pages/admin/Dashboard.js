import React from "react";
import { FaEye, FaThumbsUp, FaShare, FaChartLine } from "react-icons/fa";

import AdminNav from "../../components/AdminNav";
import Logo from "../../components/Logo";
import AdminDd from "../../components/AdminDd";

const Dashboard = () => {
  return (
    <main className="admin-main dashboard">
      <Logo />
      <AdminDd />
      <AdminNav />
      <div className="header">
        <h1>Dashboard</h1>
        <span>Welcome back👋 Lawrencejr</span>
      </div>
      <h2 style={{ display: "flex", alignItems: "center" }}>
        Statistics &nbsp;
        <FaChartLine />
      </h2>
      <div className="layouts">
        <div className="layout">
          <FaEye className="icon" />
          <div className="content">
            <strong>Views</strong>
            <span>756 views</span>
          </div>
        </div>
        <div className="layout">
          <FaThumbsUp className="icon" />
          <div className="content">
            <strong>Likes</strong>
            <span>400 likes</span>
          </div>
        </div>
        <div className="layout">
          <FaShare className="icon" />
          <div className="content">
            <strong>Shares</strong>
            <span>922 shares</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
