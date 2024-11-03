import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Notification = ({ notification }) => {
  const { text, theme, status } = notification;
  return (
    <div className="notification-container">
      <div className={`notification text-${theme} ${status ? "down" : "up"}`}>
        {theme === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
        &nbsp;&nbsp;<span>{text}</span>
      </div>
    </div>
  );
};

export default Notification;
