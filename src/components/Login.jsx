import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import { AuthContext } from "./Auth";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    //console.log(currentUser);
    localStorage.setItem("logUserId", currentUser.uid);
    localStorage.setItem("logUserName", currentUser.email);
    return <Redirect to="/" currentUser={currentUser} />;
  }

  return (
    <div className="wrapper">
        <div className="container">
          <h1>LOG IN</h1>
          <form onSubmit={handleLogin} className="form">
            <input name="email" type="email" placeholder="Email" />
            <input name="password" type="password" placeholder="Password"  />
            <div><button type="submit" id="login-button">LOGIN</button></div>
            <Link to="/signup"> <button>SIGNUP</button> </Link>
          </form>
          
        </div>
        <ul className="bg-bubbles">
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
    </div>
  );
};

export default withRouter(Login);
