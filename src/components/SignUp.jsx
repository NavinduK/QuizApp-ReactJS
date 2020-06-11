import React, { useCallback } from "react";
import { withRouter } from "react-router";
import firebase from "../firebase";
import { Link } from "react-router-dom";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div className="wrapper">
        <div className="container">
          <h1>SIGN UP</h1>
          <form onSubmit={handleSignUp} className="form">
            <input name="email" type="email" placeholder="Email" />
            <input name="password" type="password" placeholder="Password"  />
            <div><button type="submit" id="login-button">SIGNUP</button></div>
            <Link to="/login"> <button>LOGIN</button></Link>
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

export default withRouter(SignUp);
