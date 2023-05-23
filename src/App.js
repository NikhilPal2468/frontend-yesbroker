import { useState } from "react";
import "./App.css";
import axios from "axios";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="App">
      <button
        onClick={() => {
          setShow(true);
        }}
      >
        Signup
      </button>
      <button
        onClick={() => {
          setShowLogin(true);
        }}
      >
        Login
      </button>
      <Register show={show} setShow={setShow} />
      <Login showLogin={showLogin} setShowLogin={setShowLogin} />
    </div>
  );
}

export default App;
