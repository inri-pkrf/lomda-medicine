import './App.css';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import IntroLomda from './GenericComponent/IntroLomda';
import PartZero from './PartsComponent/PartZeroComponent/PartZero';

function App() {
  return (
    <div className="App">
      <img src={`${process.env.PUBLIC_URL}/Assets/logos/logo.png`} alt="main-logo" className="main-logo" />
      <img src={`${process.env.PUBLIC_URL}/Assets/logos/iLogo.png`} alt="iLogo" className="i-logo" />
      <Routes>
        <Route path="/" element={<IntroLomda />} />
        <Route path="part-zero" element={<PartZero />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}


export default AppWrapper;
