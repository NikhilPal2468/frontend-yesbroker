import React from "react";
import "./App.css";
import axios from "axios";

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

import HousePage from "./components/SinglePage/House/HousePage";

import Loader from "./components/Loader";
import RoomDetails from "./components/PostProperty/Pg/RoomDetails";
import PgLocality from "./components/PostProperty/Pg/PgLocality";
import PgDetails from "./components/PostProperty/Pg/PgDetails";
axios.defaults.baseURL = "http://13.200.85.135/api";

// axios.defaults.baseURL = "https://homewale-backend.onrender.com";
axios.defaults.baseURL = "http://localhost:5000";
// axios.defaults.baseURL = "http://13.200.85.135/api";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <Navbar />
      <Loader />
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

        <Route path="/list-your-property-for-rent" element={<MainPage />} />

        {/* HOUSE */}
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
        {/* single page for house */}
        <Route path="/property/:id/" element={<HousePage />} />

        {/* PG */}
        <Route path="/property/manage/pg/:id/room" element={<RoomDetails />} />
        <Route
          path="/property/manage/pg/:id/locality"
          element={<PgLocality />}
        />
        <Route
          path="/property/manage/pg/:id/pgdetails"
          element={<PgDetails />}
        />
      </Routes>
    </div>
  );
}

export default App;
