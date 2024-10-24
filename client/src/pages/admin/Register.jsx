import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

import Logo from "../../components/Logo2";

const Register = () => {
  return (
    <main className="login-container">
      <form>
        <div className="inp-handler">
          <Logo />
          <div className="inp-holder">
            <FaUser />
            <input type="text" placeholder="fullname" />
          </div>
          <div className="inp-holder">
            <FaUser />
            <input type="text" placeholder="username" />
          </div>
          <div className="inp-holder">
            <FaEnvelope />
            <input type="email" placeholder="email" />
          </div>

          <div className="inp-holder">
            <FaLock />
            <input type="password" placeholder="password" />
          </div>
          <div className="inp-holder">
            <FaLock />
            <input type="password" placeholder="confirm password" />
          </div>
          <div className="btn-holder">
            <button>Register</button>
          </div>
        </div>
      </form>
      <section className="rh-sec"></section>
    </main>
  );
};

export default Register;
