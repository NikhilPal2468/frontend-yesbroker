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
import RentalDetails from "./components/PostProperty/Pg/RentalDetails";
import PgLocality from "./components/PostProperty/Pg/PgLocality";
import PgAmenities from "./components/PostProperty/Pg/PgAmenities";
import PgDetails from "./components/PostProperty/Pg/PgDetails";
import { useSelector } from "react-redux";
import VerifyEmail from "./components/Authentication/VerifyEmail";
import Footer from "./components/common/Footer";
import AdminPortal from "./components/AdminPortal";
import ErrorPage from "./components/common/ErrorPage";
import ManageUsers from "./components/AdminPortal/ManageUsers";
import PgGallery from "./components/PostProperty/Pg/PgGallery";

// axios.defaults.baseURL = "https://homewale-backend.onrender.com";
axios.defaults.baseURL = "http://localhost:5000";
// axios.defaults.baseURL = "https://homewale.com/api";
// axios.defaults.baseURL = "http://13.200.85.135/api";
axios.defaults.withCredentials = true;

function App() {
  const userDetails = useSelector((state) => state.user?.userDetails);

  return (
    <div className={`App Appcontainer`}>
      <Navbar userDetails={userDetails} />
      <Loader />
      <Routes>
        <Route path="/" element={<HomePage userDetails={userDetails} />} />
        <Route
          path="/properties"
          element={<ListProperties userDetails={userDetails} />}
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />

        {/* Premium page */}
        <Route path="/premium" element={<PremiumPage />} />

        {/* User Dashboard routes */}
        <Route
          path="/user/myprofile"
          element={<ProfilePage userDetails={userDetails} />}
        />
        <Route
          path="/user/mylistings/:propertyType"
          element={<YourProperties userDetails={userDetails} />}
        />
        <Route
          path="/user/myshortlists/:propertyType"
          element={<YourShortlists userDetails={userDetails} />}
        />
        <Route
          path="/user/ownerscontacted"
          element={<OwnersContacted userDetails={userDetails} />}
        />

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
        <Route
          path="/property/:id/"
          element={<HousePage userDetails={userDetails} />}
        />

        {/* PG */}
        <Route
          path="/property/manage/pg/:id/property"
          element={<PgDetails />}
        />
        <Route
          path="/property/manage/pg/:id/rental"
          element={<RentalDetails />}
        />
        <Route
          path="/property/manage/pg/:id/locality"
          element={<PgLocality />}
        />
        <Route
          path="/property/manage/pg/:id/amenities"
          element={<PgAmenities />}
        />
        <Route path="/property/manage/pg/:id/gallery" element={<PgGallery />} />
        <Route
          path="/verifyEmail/:id/:email/:token"
          element={<VerifyEmail />}
        />
        <Route
          path="/admin"
          element={userDetails?.is_user_admin ? <AdminPortal /> : <ErrorPage />}
        />
        <Route
          path="/admin/manageUsers"
          element={userDetails?.is_user_admin ? <ManageUsers /> : <ErrorPage />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
