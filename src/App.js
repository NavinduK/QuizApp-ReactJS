import React from "react";
import "./App.css";
import firebase from "./firebase";
import Questions from "./components/Questions";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./components/Auth";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Questions} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
