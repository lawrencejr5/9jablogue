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
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [singlePost, setSinglePost] = useState([]);
  const [bloggers, setBloggers] = useState([]);

  // constants
  const endpoint = "http://localhost:5000/api/v1";
  const signedIn = localStorage.getItem("user");
  const [signedInUser, setSignedInUser] = useState([]);
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

  // Category
  const getCategories = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${endpoint}/categories`);
      setLoading(false);
      setCategories(data.categories);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const createCategory = async (formData) => {
    setBtnLoad(true);
    try {
      const { data } = await axios.post(`${endpoint}/categories`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setNotification({ text: data.msg, theme: "success", status: true });
      getCategories();
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

  const deleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(`${endpoint}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotification({ text: data.msg, theme: "success", status: true });
      getCategories();
    } catch (err) {
      const {
        response: { data },
      } = err;
      setNotification({ text: data.msg, theme: "danger", status: true });
      console.log(err);
    }
  };

  const updateCategory = async (id, formdata) => {
    setBtnLoad(true);
    try {
      const { data } = await axios.patch(
        `${endpoint}/categories/${id}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBtnLoad(false);
      setNotification({ text: data.msg, theme: "success", status: true });
      getCategories();
    } catch (err) {
      const {
        response: { data },
      } = err;
      setBtnLoad(false);
      setNotification({ text: data.msg, theme: "danger", status: true });
      console.log(err);
    }
  };

  // Posts
  const getPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${endpoint}/posts`);
      setLoading(false);
      setPosts(data.posts);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const getUserPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${endpoint}/posts?user=${signedIn}`);
      setLoading(false);
      setUserPosts(data.userPosts);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const getPost = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${endpoint}/posts/${id}`);
      setLoading(false);
      setSinglePost(data.post);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const createPost = async (formData) => {
    setBtnLoad(true);
    try {
      const { data } = await axios.post(`${endpoint}/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setNotification({ text: data.msg, theme: "success", status: true });
      getPosts();
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

  const deletePost = async (id) => {
    try {
      const { data } = await axios.delete(`${endpoint}/posts/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setNotification({ text: data.msg, theme: "success", status: true });
      getPosts();
    } catch (err) {
      const {
        response: { data },
      } = err;
      setNotification({ text: data.msg, theme: "danger", status: true });
      console.log(err);
    }
  };

  // Bloggers
  const getBloggers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${endpoint}/authors`);
      setLoading(false);
      setBloggers(data.authors);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${endpoint}/authors/${signedIn}`);
      setLoading(false);
      setSignedInUser(data.author);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getDuks();
    getCategories();
    getPosts();
    getUserPosts();
    getBloggers();
    getUser();
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
        //
        categories,
        getCategories,
        createCategory,
        deleteCategory,
        updateCategory,
        //
        posts,
        getPosts,
        getPost,
        getUserPosts,
        createPost,
        deletePost,
        userPosts,
        singlePost,
        //
        getBloggers,
        bloggers,
        signedInUser,
      }}
    >
      {children}
    </Mycontext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Mycontext);
};
