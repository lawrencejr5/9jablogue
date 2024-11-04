import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { didUKnw } from "./data/didUKnw";

const Mycontext = createContext();
export const ContextApp = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [btnLoad, setBtnLoad] = useState(false);
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [dukNo, setDukNo] = useState(0);

  // data
  const [duks, setDuks] = useState([]);

  // constants
  const endpoint = "http://localhost:5000/api/v1";
  const signedIn = localStorage.getItem("user");
  const token = localStorage.getItem("token");

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

  // Did you know
  const getDuks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${endpoint}/duks`);
      setLoading(false);
      setDuks(data.duks);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const addDuk = async (input) => {
    setBtnLoad(true);
    try {
      const { data } = await axios.post(
        `${endpoint}/duks`,
        { text: input.duk },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotification({ text: data.msg, theme: "success", status: true });
      getDuks();
      setBtnLoad(false);
    } catch (err) {
      const {
        response: { data },
      } = err;
      setNotification({ text: data.msg, theme: "danger", status: true });
      console.log(err);
      setBtnLoad(false);
    }
  };

  const deleteDuk = async (id) => {
    try {
      const { data } = await axios.delete(`${endpoint}/duks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotification({ text: data.msg, theme: "success", status: true });
      getDuks();
    } catch (err) {
      const {
        response: { data },
      } = err;
      setNotification({ text: data.msg, theme: "danger", status: true });
      console.log(err);
    }
  };

  const updateDuk = async (id, input) => {
    setBtnLoad(true);

    try {
      const { data } = await axios.patch(
        `${endpoint}/duks/${id}`,
        { text: input.duk },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBtnLoad(false);
      setNotification({ text: data.msg, theme: "success", status: true });
      getDuks();
    } catch (err) {
      const {
        response: { data },
      } = err;
      setBtnLoad(false);
      setNotification({ text: data.msg, theme: "danger", status: true });
      console.log(err);
    }
  };

  useEffect(() => {
    getDuks();
  }, []);
  useEffect(() => {
    const myInterval = setInterval(() => {
      setDukNo((curr) => {
        const newNum = curr + 1;
        if (newNum > duks.length - 1) {
          return 0;
        }
        return newNum;
      });
      // console.log(duks);
    }, 10000);
    return () => {
      clearInterval(myInterval);
    };
  }, []);

  return (
    <Mycontext.Provider
      value={{
        loading,
        setLoading,
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
        //
        duks,
        setDuks,
        getDuks,
        addDuk,
        deleteDuk,
        updateDuk,
      }}
    >
      {children}
    </Mycontext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Mycontext);
};
