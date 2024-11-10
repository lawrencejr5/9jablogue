import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaRegEyeSlash,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Logo from "../../components/Logo2";
import Notification from "../../components/Notification";

import { useGlobalContext } from "../../context";

const Register = () => {
  const { endpoint, btnLoad, setBtnLoad, notification, setNotification } =
    useGlobalContext();

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [input, setInput] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    cPassword: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoad(true);
    try {
      const { data } = await axios.post(`${endpoint}/auth/register`, {
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
        navigate("/application");
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
      <form onSubmit={handleSubmit}>
        <div className="inp-handler">
          <Notification notification={notification} />
          <Logo />
          <div className="inp-holder">
            <FaUser />
            <input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={handleChange}
              placeholder="fullname"
            />
          </div>
          <div className="inp-holder">
            <FaUser />
            <input
              type="text"
              name="username"
              value={input.username}
              onChange={handleChange}
              placeholder="username"
            />
          </div>
          <div className="inp-holder">
            <FaEnvelope />
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="email"
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
          <div className="inp-holder">
            <FaLock />
            <input
              type={show ? "text" : "password"}
              name="cPassword"
              value={input.cPassword}
              onChange={handleChange}
              placeholder="confirm password"
            />
            {input.cPassword.length ? (
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
            <button>{btnLoad ? "Registering..." : "Register"}</button>
          </div>
          <br />
          <span>
            I already have an account,{" "}
            <Link
              style={{
                textDecoration: "none",
                color: "green",
                fontWeight: "600",
              }}
              to="/login"
            >
              Login...
            </Link>
          </span>
        </div>
      </form>
      <section className="rh-sec"></section>
    </main>
  );
};

export default Register;
