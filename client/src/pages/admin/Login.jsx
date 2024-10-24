import React from "react";
import { FaUser, FaLock } from "react-icons/fa";

import Logo from "../../components/Logo2";

const Login = () => {
  return (
    <main className="login-container">
      <form>
        <div className="inp-handler">
          <Logo />
          <div className="inp-holder">
            <FaUser />
            <input type="email" placeholder="username or email" />
          </div>
          <div className="inp-holder">
            <FaLock />
            <input type="password" placeholder="password" />
          </div>
          <div className="btn-holder">
            <button>Login</button>
          </div>
        </div>
      </form>
      <section className="rh-sec"></section>
    </main>
  );
};

export default Login;
