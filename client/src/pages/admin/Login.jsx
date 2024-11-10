import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Logo from "../../components/Logo2";
import Notification from "../../components/Notification";

import { useGlobalContext } from "../../context";

const Login = () => {
  const { endpoint, btnLoad, setBtnLoad, notification, setNotification } =
    useGlobalContext();

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [input, setInput] = useState({
    user: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value.toLowerCase();
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleShow = () => {
    setShow((prev) => {
      return !prev;
    });
  };

  const handleSUbmit = async (e) => {
    e.preventDefault();
    setBtnLoad(true);
    try {
      const { data } = await axios.post(`${endpoint}/auth/login`, {
        ...input,
      });
      setNotification({
        text: data.msg,
        theme: "success",
        status: true,
      });
      localStorage.setItem("user", data.userId);
      localStorage.setItem("token", data.token);
      setBtnLoad(false);
      setTimeout(() => {
        navigate("/admin");
      }, 3000);
    } catch (err) {
      const {
        response: { data },
      } = err;
      console.log(data);
      setNotification({
        text: data.msg,
        theme: "danger",
        status: true,
      });
      setBtnLoad(false);
    }
  };
  return (
    <main className="login-container">
      <form onSubmit={handleSUbmit}>
        <div className="inp-handler">
          <Notification notification={notification} />
          <Logo />
          <div className="inp-holder">
            <FaUser />
            <input
              type="text"
              name="user"
              value={input.user}
              onChange={handleChange}
              placeholder="username or email"
            />
          </div>
          <div className="inp-holder">
            <FaLock />
            <input
              type={show ? "text" : "password"}
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="password"
            />
            {input.password.length ? (
              show ? (
                <FaRegEyeSlash onClick={handleShow} />
              ) : (
                <FaEye onClick={handleShow} />
              )
            ) : (
              ""
            )}
          </div>
          <div className="btn-holder">
            <button>{btnLoad ? "Loging in..." : "Login"}</button>
          </div>
          <br />
          <span>
            I don't have an account,{" "}
            <Link
              style={{
                textDecoration: "none",
                color: "green",
                fontWeight: "600",
              }}
              to="/register"
            >
              Register...
            </Link>
          </span>
        </div>
      </form>
      <section className="rh-sec"></section>
    </main>
  );
};

export default Login;
