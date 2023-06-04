import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";

import "./App.css";

import Navbar from "./components/common/Navbar";
import HomePage from "./components/HomePage";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import ResetPassword from "./components/Authentication/ResetPassword";
import ListProperties from "./components/ListProperties";

import ProfilePage from "./components/UserDashboard/otherPages/ProfilePage";
import YourProperties from "./components/UserDashboard/otherPages/YourProperties";
import YourShortlists from "./components/UserDashboard/otherPages/YourShortlists";
import OwnersContacted from "./components/UserDashboard/otherPages/OwnersContacted";
import MainPage from "./components/PostProperty/MainPage";
import PropertyDetails from "./components/PostProperty/House/PropertyDetails";
import LocalityDetails from "./components/PostProperty/House/LocalityDetails";
import RentDetails from "./components/PostProperty/House/RentDetails";
import Amenities from "./components/PostProperty/House/Amenities";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Navbar
        showLogin={showLogin}
        showRegister={showRegister}
        setShowLogin={setShowLogin}
        setShowRegister={setShowRegister}
        user={user}
        setUser={setUser}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<ListProperties />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />

        {/* User Dashboard routes */}
        <Route path="/user/myprofile" element={<ProfilePage />} />
        <Route path="/user/mylistings" element={<YourProperties />} />
        <Route path="/user/mylistings/flats" element={<YourProperties />} />
        <Route path="/user/mylistings/pgs" element={<YourProperties />} />
        <Route path="/user/myshortlists/houses" element={<YourShortlists />} />
        <Route path="/user/myshortlists/pgs" element={<YourShortlists />} />
        <Route path="/user/ownerscontacted" element={<OwnersContacted />} />
        <Route path="/list-your-property-for-rent" element={<MainPage />} />
        <Route
          path="/property/manage/house/:id/property"
          element={<PropertyDetails />}
        />
        <Route
          path="/property/manage/house/:id/locality"
          element={<LocalityDetails />}
        />
        <Route
          path="/property/manage/house/:id/rental"
          element={<RentDetails />}
        />
        <Route
          path="/property/manage/house/:id/amenities"
          element={<Amenities />}
        />
      </Routes>
      {showRegister && (
        <Register
          show={showRegister}
          setShow={setShowRegister}
          user={user}
          setUser={setUser}
          setShowLogin={setShowLogin}
        />
      )}
      {showLogin && (
        <Login
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          user={user}
          setUser={setUser}
        />
      )}
    </div>
  );
}

export default App;
