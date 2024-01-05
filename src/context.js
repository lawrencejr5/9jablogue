import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { didUKnw } from "./data/didUKnw";
const Mycontext = createContext();
const cat_url = "http://localhost/9jablogueApi/api/categories.php";
const duk_url = "http://localhost/9jablogueApi/api/duk.php";
const post_url = "http://localhost/9jablogueApi/api/posts.php";
const single_post_url = "http://localhost/9jablogueApi/api/post.php?id=";
export const ContextApp = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(true);
  const [catLoading, setCatLoading] = useState(true);
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [dukNo, setDukNo] = useState(0);
  const [duk, setDuk] = useState(didUKnw);
  const [category, setCategory] = useState([]);
  const [post, setPost] = useState([]);

  const fetchCategories = async () => {
    try {
      setCatLoading(true);
      const res = await fetch(cat_url);
      const data = await res.json();
      const { categories } = data;
      if (categories) {
        setCatLoading(false);
        setCategory(categories);
      } else {
        setCatLoading(false);
        setCategory([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDuk = async () => {
    try {
      setLoading(true);
      const res = await fetch(duk_url);
      const data = await res.json();
      const { did_u_knw } = data;
      if (did_u_knw) {
        setLoading(false);
        setDuk(did_u_knw);
      } else {
        setLoading(false);
        setDuk([]);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      setPostLoading(true);
      const res = await fetch(post_url);
      const data = await res.json();
      const { posts } = data;
      if (data) {
        setPostLoading(false);
        setPost(posts);
      } else {
        setPostLoading(false);
        setPost([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    fetchDuk();
  }, []);

  useEffect(() => {
    const myInterval = setInterval(() => {
      setDukNo((curr) => {
        const newNum = curr + 1;
        if (newNum > duk.length - 1) {
          return 0;
        }
        return newNum;
      });
    }, 10000);
    return () => {
      clearInterval(myInterval);
    };
  }, []);
  // useEffect(() => {
  //   const loadTimeOut = setTimeout(() => {
  //     setLoading(false);
  //   }, 1500);
  //   return () => {
  //     clearTimeout(loadTimeOut);
  //   };
  // }, []);

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
        duk,
        dukNo,
        category,
        post,
        postLoading,
        catLoading,
        fetchPosts,
        fetchCategories,
      }}
    >
      {children}
    </Mycontext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Mycontext);
};
