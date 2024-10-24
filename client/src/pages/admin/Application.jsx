import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

import Logo from "../../components/Logo2";

const Application = () => {
  return (
    <main className="login-container">
      <form>
        <div className="inp-handler">
          <Logo />
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
          ></textarea>
          <div className="btn-holder">
            <button>Apply</button>
          </div>
        </div>
      </form>
      <section className="rh-sec"></section>
    </main>
  );
};

export default Application;
