
import { useState } from 'react';
import './App.css';

import Navbar from './components/common/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Toast1 from './components/common/Toast';
function App() {
  const [show, setShow] = useState(true)
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/home" element={<Navbar />} />
      </Routes>
      <HomePage />
      {/* <Authentication show={show} setShow={setShow} /> */}
      <Toast1 show={show} setShow={setShow} />
    </div>
  );
}

export default App;
