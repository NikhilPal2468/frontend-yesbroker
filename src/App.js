import { useState } from "react";
import "./App.css";
import axios from "axios";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";

import './App.css';

import Navbar from './components/common/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Toast1 from './components/common/Toast';
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
function App() {
  const [show, setShow] = useState(true)
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/home" element={<Navbar />} />
      </Routes>
      <HomePage />
      <Register show={show} setShow={setShow} />
      <Login showLogin={showLogin} setShowLogin={setShowLogin} />
      <Toast1 show={show} setShow={setShow} />
    </div>
  );
}

export default App;
