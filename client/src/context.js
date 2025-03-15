import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

const Mycontext = createContext();
export const ContextApp = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [btnLoad, setBtnLoad] = useState(false);
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [dukNo, setDukNo] = useState(0);

  // data
  const [duks, setDuks] = useState([]);
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [bloggerPosts, setBloggerPosts] = useState([]);
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [singlePost, setSinglePost] = useState([]);
  const [bloggers, setBloggers] = useState([]);
  const [blogger, setBlogger] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  const [userTotalLikes, setUserTotalLikes] = useState(0);
  const [userTotalViews, setUserTotalViews] = useState(0);

  // constants
  const endpoint = "https://9jablogue.vercel.app/api/v1";
  const fileEndpoint = "https://9jablogue.vercel.app/api/v1/uploads";
  const signedIn = localStorage.getItem("user");
  const [signedInUser, setSignedInUser] = useState(null);
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
    }, 10000);
    return () => {
      clearInterval(myInterval);
    };
  }, [duks]);

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

  const getCategory = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${endpoint}/categories/${id}`);
      setLoading(false);
      setCategory(data.category);
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
  const getAllPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${endpoint}/posts`);
      setLoading(false);
      setAllPosts(data.posts);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const getPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${endpoint}/posts?status=1`);
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
      setUserPosts(data.posts);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const getCategoryPosts = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${endpoint}/posts?category=${id}&status=1`
      );
      setLoading(false);
      setCategoryPosts(data.posts);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const getFeaturedPost = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${endpoint}/posts/featured/post`);
      setLoading(false);
      setFeaturedPost(data.post);
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

  const searchPosts = async (query) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${endpoint}/posts/search/post?query=${query}`
      );
      setLoading(false);
      setPosts(data.posts);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const updatePost = async (id, formdata) => {
    setBtnLoad(true);
    try {
      const { data } = await axios.patch(`${endpoint}/posts/${id}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setBtnLoad(false);
      setNotification({ text: data.msg, theme: "success", status: true });
      await getUserPosts();
      await getPosts();
      await getAllPosts();
    } catch (err) {
      const {
        response: { data },
      } = err;
      setBtnLoad(false);
      setNotification({ text: data.msg, theme: "danger", status: true });
      console.log(err);
    }
  };

  const featurePost = async (id) => {
    try {
      const { data } = await axios.patch(
        `${endpoint}/posts/feature/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotification({ text: data.msg, theme: "success", status: true });
      await getUserPosts();
      await getPosts();
      await getAllPosts();
    } catch (err) {
      const {
        response: { data },
      } = err;
      setBtnLoad(false);
      setNotification({ text: data.msg, theme: "danger", status: true });
      console.log(err);
    }
  };

  const likePost = async (id) => {
    try {
      const { data } = await axios.patch(
        `${endpoint}/posts/like/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotification({ text: data.msg, theme: "success", status: true });
      await getPost(id);
    } catch (err) {
      const {
        response: { data },
      } = err;
      setBtnLoad(false);
      setNotification({ text: data.msg, theme: "danger", status: true });
      console.log(err);
    }
  };

  const viewPost = async (id) => {
    try {
      const { data } = await axios.patch(
        `${endpoint}/posts/view/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getPost(id);
    } catch (err) {
      const {
        response: { data },
      } = err;
      setBtnLoad(false);
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
      await getPosts();
      await getAllPosts();

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
      await getPosts();
      await getAllPosts();
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

  const getBlogger = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${endpoint}/authors/${id}`);
      setLoading(false);
      setBlogger(data.author);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const getBloggerPosts = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${endpoint}/posts?user=${id}&status=1`);
      setLoading(false);
      setBloggerPosts(data.posts);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${endpoint}/authors/${signedIn}`);
      setSignedInUser(data.author);
      setIsAdmin(data.admin);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const updateUser = async (id, formdata) => {
    setBtnLoad(true);
    try {
      const { data } = await axios.patch(
        `${endpoint}/authors/${id}`,
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
      await getUser();
      await getBloggers();
    } catch (err) {
      const {
        response: { data },
      } = err;
      setBtnLoad(false);
      setNotification({ text: data.msg, theme: "danger", status: true });
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    setBtnLoad(true);
    try {
      const { data } = await axios.delete(`${endpoint}/authors/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBtnLoad(false);
      setNotification({ text: data.msg, theme: "success", status: true });
      await getBloggers();
    } catch (err) {
      const {
        response: { data },
      } = err;
      setBtnLoad(false);
      setNotification({ text: data.msg, theme: "danger", status: true });
      console.log(err);
    }
  };

  const updatePassword = async (formdata) => {
    setBtnLoad(true);
    try {
      const { data } = await axios.patch(
        `${endpoint}/authors/password/update`,
        { ...formdata },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBtnLoad(false);
      setNotification({ text: data.msg, theme: "success", status: true });
      await getUser();
      await getBloggers();
    } catch (err) {
      const {
        response: { data },
      } = err;
      setBtnLoad(false);
      setNotification({ text: data.msg, theme: "danger", status: true });
      console.log(err);
    }
  };

  const getUserTotalLikes = async () => {
    try {
      const { data } = await axios.get(`${endpoint}/authors/posts/likes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserTotalLikes(data.totalLikes);
    } catch (err) {
      const {
        response: { data },
      } = err;
      console.log(data.msg);
    }
  };

  const getUserTotalViews = async () => {
    try {
      const { data } = await axios.get(`${endpoint}/authors/posts/views`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserTotalViews(data.totalViews);
    } catch (err) {
      const {
        response: { data },
      } = err;
      console.log(data.msg);
    }
  };

  useEffect(() => {
    getDuks();
    getCategories();
    getPosts();
    getFeaturedPost();
    getUserPosts();
    getBloggers();
    getUser();
    getUserTotalLikes();
    getUserTotalViews();
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
        fileEndpoint,
        signedIn,
        token,
        isAdmin,
        //
        getUser,
        //
        duks,
        setDuks,
        getDuks,
        addDuk,
        deleteDuk,
        updateDuk,
        //
        category,
        categories,
        getCategory,
        getCategories,
        createCategory,
        deleteCategory,
        updateCategory,
        //
        posts,
        allPosts,
        getAllPosts,
        getPosts,
        getPost,
        searchPosts,
        getFeaturedPost,
        getUserPosts,
        getCategoryPosts,
        createPost,
        featurePost,
        likePost,
        viewPost,
        updatePost,
        deletePost,
        userPosts,
        featuredPost,
        categoryPosts,
        singlePost,
        //
        getBloggers,
        getBlogger,
        getBloggerPosts,
        blogger,
        bloggers,
        bloggerPosts,
        signedInUser,
        updateUser,
        deleteUser,
        updatePassword,
        //
        getUserTotalLikes,
        getUserTotalViews,
        userTotalLikes,
        userTotalViews,
      }}
    >
      {children}
    </Mycontext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Mycontext);
};
