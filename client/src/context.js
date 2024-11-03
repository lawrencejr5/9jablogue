import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { didUKnw } from "./data/didUKnw";
const Mycontext = createContext();
export const ContextApp = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [dukNo, setDukNo] = useState(0);

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

  const openSideNav = () => {
    setSideNavOpen(true);
  };
  const closeSideNav = () => {
    setSideNavOpen(false);
  };

  return (
    <Mycontext.Provider
      value={{
        loading,
        openSideNav,
        closeSideNav,
        sideNavOpen,
        dukNo,
      }}
    >
      {children}
    </Mycontext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Mycontext);
};
