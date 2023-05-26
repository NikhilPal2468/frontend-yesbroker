import { useState } from "react";
import "./App.css";
import axios from "axios";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";

import "./App.css";

import Navbar from "./components/common/Navbar";
import HomePage from "./components/HomePage";
import ListProperties from "./components/ListProperties";
import { Routes as Switch, Route, Link } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="App">
      <Navbar
        showLogin={showLogin}
        showRegister={showRegister}
        setShowLogin={setShowLogin}
        setShowRegister={setShowRegister}
      />
      <Register show={showRegister} setShow={setShowRegister} />
      <Login showLogin={showLogin} setShowLogin={setShowLogin} />
      <Switch>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<ListProperties />} />
        {/* <Toast1 show={show} setShow={setShow} /> */}
      </Switch>
    </div>
  );
}

export default App;
