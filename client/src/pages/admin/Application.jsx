import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Logo from "../../components/Logo2";
import Notification from "../../components/Notification";

import { useGlobalContext } from "../../context";

const Application = () => {
  const {
    endpoint,
    btnLoad,
    setBtnLoad,
    notification,
    setNotification,
    token,
  } = useGlobalContext();

  const navigate = useNavigate();

  const [application, setApplication] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoad(true);
    try {
      console.log(token);

      const { data } = await axios.patch(
        `${endpoint}/authors/register/application`,
        {
          application,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotification({
        text: data.msg,
        theme: "success",
        status: true,
      });
      setBtnLoad(false);
      setTimeout(() => {
        navigate("/admin");
      }, 3000);
    } catch (err) {
      console.log(err);
      setNotification({
        text: err.response.data.msg,
        theme: "success",
        status: true,
      });
      setBtnLoad(false);
    }
  };
  return (
    <main className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="inp-handler">
          <Logo />
          <Notification notification={notification} />
          <h3>**Please answer the following questions</h3>
          <p className="question">
            Have you had any experience blogging or writing before? If you have,
            tell us about your experience and why you would want to be a blogger
            on 9jablogue
          </p>
          <textarea
            name=""
            id=""
            placeholder="answer"
            className="answer"
            onChange={(e) => setApplication(e.target.value)}
            value={application}
          ></textarea>
          <div className="btn-holder">
            <button>{btnLoad ? "Applying..." : "Apply"}</button>
          </div>
        </div>
      </form>
      <section className="rh-sec"></section>
    </main>
  );
};

export default Application;
