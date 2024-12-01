import React from "react";
import { useJwt } from "react-jwt";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const { isExpired } = useJwt(token);

  if (isExpired || !token || !user) return <Navigate to={"/login"} />;
  return children;
};

export default Protected;
