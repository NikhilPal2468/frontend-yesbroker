import { useState } from "react";
import "./App.css";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";

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
