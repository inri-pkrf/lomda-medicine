import './App.css';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';


import IntroLomda from './genericComponent/IntroLomda'
import PartZero from './PartsComponent/PartZeroComponent/PartZero';
import PartOne from './PartsComponent/PartOneComponent/PartOne';
import PartTwo from './PartsComponent/PartTwoComponent/PartTwo';
import PartThree from './PartsComponent/PartThreeComponent/PartThree';
import PartFour from './PartsComponent/PartFourComponent/PartFour';


function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isPartTwo = location.pathname.includes('part-two');

  return (
    <div className="App">
      <img
        src={`${process.env.PUBLIC_URL}/Assets/logos/logo.png`}
        alt="main-logo"
        className="main-logo"
        onClick={() => navigate('/')}
      />


      <div style={{ display: "none" }}>
        <div className="btn-text btn-text-prev">
          <div className="img-arrow img-arrow-prev" />
          <div className="text-label"></div>
        </div>


        <div className="btn-text btn-text-next">
          <div className="img-arrow img-arrow-next" />
          <div className="text-label"></div>
        </div>


        <div className="btn-text btn-text-end">
          <div className="img-arrow img-arrow-end" />
          <div className="text-label"></div>
        </div>
      </div>




      <Routes>
        <Route path="/" element={<IntroLomda />} />
        <Route path="part-zero" element={<PartZero />} />
        <Route path="part-one" element={<PartOne />} />
        <Route path="part-two" element={<PartTwo />} />
        <Route path="part-three" element={<PartThree />} />
        <Route path="part-four" element={<PartFour />} />
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



