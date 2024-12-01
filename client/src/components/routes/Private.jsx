import React from "react";

import ErrorPage from "../../pages/Error";

import { useGlobalContext } from "../../context";

const Private = ({ children }) => {
  const { isAdmin } = useGlobalContext();

  if (!isAdmin) return <ErrorPage />;
  return children;
};

export default Private;
