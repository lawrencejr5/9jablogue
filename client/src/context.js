import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { didUKnw } from "./data/didUKnw";
const Mycontext = createContext();
export const ContextApp = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [btnLoad, setBtnLoad] = useState(false);
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [dukNo, setDukNo] = useState(0);

  // constants
  const endpoint = "http://localhost:5000/api/v1";
  const signedIn = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  // Did you know
  useEffect(() => {
    const myInterval = setInterval(() => {
      setDukNo((curr) => {
        const newNum = curr + 1;
        if (newNum > didUKnw.length - 1) {
          return 0;
        }
        return newNum;
      });
    }, 10000);
    return () => {
      clearInterval(myInterval);
    };
  }, []);

  // Sidenav
  const openSideNav = () => {
    setSideNavOpen(true);
  };
  const closeSideNav = () => {
    setSideNavOpen(false);
  };

  //Notification
  const [notification, setNotification] = useState({
    text: "",
    status: "",
    theme: "",
  });
  useEffect(() => {
    const notiTimeout = setTimeout(() => {
      setNotification({ ...notification, status: false });
    }, 2000);
    return () => clearTimeout(notiTimeout);
  }, [notification]);

  return (
    <Mycontext.Provider
      value={{
        loading,
        openSideNav,
        closeSideNav,
        sideNavOpen,
        dukNo,
        btnLoad,
        setBtnLoad,
        notification,
        setNotification,
        //
        endpoint,
        signedIn,
        token,
      }}
    >
      {children}
    </Mycontext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Mycontext);
};
