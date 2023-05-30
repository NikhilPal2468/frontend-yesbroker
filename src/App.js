import { useState } from "react";
import "./App.css";
import axios from "axios";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";

import "./App.css";

import Navbar from "./components/common/Navbar";
import HomePage from "./components/HomePage";
import ListProperties from "./components/ListProperties";

import { Routes as Switch, Route } from "react-router-dom";
import ProfilePage from "./components/UserDashboard/otherPages/ProfilePage";
import YourProperties from "./components/UserDashboard/otherPages/YourProperties";
import YourShortlists from "./components/UserDashboard/otherPages/YourShortlists";
import OwnersContacted from "./components/UserDashboard/otherPages/OwnersContacted";

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
      {showRegister && (
        <Register show={showRegister} setShow={setShowRegister} />
      )}
      {showLogin && <Login showLogin={showLogin} setShowLogin={setShowLogin} />}
      <Switch>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<ListProperties />} />
        <Route path="/user/myprofile" element={<ProfilePage />} />
        <Route path="/user/mylistings/flats" element={<YourProperties />} />
        <Route path="/user/mylistings/pgs" element={<YourProperties />} />
        <Route path="/user/myshortlists" element={<YourShortlists />} />
        <Route path="/user/ownerscontacted" element={<OwnersContacted />} />
      </Switch>
    </div>
  );
}

export default App;
