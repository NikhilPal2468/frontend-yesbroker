
import { useState } from 'react';
import './App.css';
import Authentication from './components/Authentication';

function App() {
  const [show, setShow] = useState(false)
  return (
    <div className="App">
      <button onClick={() => { setShow(true); }}>NIKHIL</button>
      <Authentication show={show} setShow={setShow} />
    </div>
  );
}

export default App;
