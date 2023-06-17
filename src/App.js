import React from "react";
import "./App.css";
import axios from "axios";

import "./App.css";

import Navbar from "./components/common/Navbar";
import HomePage from "./components/HomePage";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import ResetPassword from "./components/Authentication/ResetPassword";
import ListProperties from "./components/ListProperties";

import PremiumPage from "./components/Premium";
import ProfilePage from "./components/UserDashboard/otherPages/ProfilePage";
import YourProperties from "./components/UserDashboard/otherPages/YourProperties";
import YourShortlists from "./components/UserDashboard/otherPages/YourShortlists";
import OwnersContacted from "./components/UserDashboard/otherPages/OwnersContacted";
import MainPage from "./components/PostProperty/MainPage";
import PropertyDetails from "./components/PostProperty/House/PropertyDetails";
import LocalityDetails from "./components/PostProperty/House/LocalityDetails";
import RentDetails from "./components/PostProperty/House/RentDetails";
import Amenities from "./components/PostProperty/House/Amenities";
import Gallery from "./components/PostProperty/House/Gallery";
import { useSelector } from "react-redux";

import RedirectPage from "./components/common/RedirectPage";
import SingleProperty from "./components/SingleProperty";
// axios.defaults.baseURL = "https://homewale-backend.onrender.com";
// axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.baseURL = "http://homewale.com/api";
// axios.defaults.baseURL = "http://13.200.85.135/api";
axios.defaults.withCredentials = true;

function App() {
  const userDetails = useSelector((state) => state.user.userDetails);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<ListProperties />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />

        {/* Premium page */}
        <Route path="/premium" element={<PremiumPage />} />

        {/* User Dashboard routes */}
        <Route path="/user/myprofile" element={<ProfilePage />} />
        <Route
          path="/user/mylistings/:propertyType"
          element={<YourProperties />}
        />
        <Route
          path="/user/myshortlists/:propertyType"
          element={<YourShortlists />}
        />
        <Route path="/user/ownerscontacted" element={<OwnersContacted />} />

        <Route
          path="/list-your-property-for-rent"
          element={userDetails ? <MainPage /> : <RedirectPage />}
        />
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
        <Route
          path="/property/manage/house/:id/gallery"
          element={<Gallery />}
        />
        <Route path="/property/:id/" element={<SingleProperty />} />
      </Routes>
    </div>
  );
}

export default App;
