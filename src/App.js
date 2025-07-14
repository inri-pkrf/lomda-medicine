import './App.css';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';


import IntroLomda from './genericComponent/IntroLomda'
import PartZero from './PartsComponent/PartZeroComponent/PartZero';
import PartOne from './PartsComponent/PartOneComponent/PartOne';
import PartTwo from './PartsComponent/PartTwoComponent/PartTwo';
import PartThree from './PartsComponent/PartThreeComponent/PartThree';


function App() {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const location = useLocation();
  const isPartTwo = location.pathname.includes('part-two');


  const closeInfo = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowInfo(false);
      setIsClosing(false);
    }, 400); // משך הסגירה = משך האנימציה
  };


  return (
    <div className="App">
      <img
        src={`${process.env.PUBLIC_URL}/Assets/logos/logo.png`}
        alt="main-logo"
        className="main-logo"
        onClick={() => navigate('/')}
      />


      <img
        src={`${process.env.PUBLIC_URL}/Assets/logos/${isPartTwo ? 'iLogoWhite' : 'iLogo'}.png`}
        alt="iLogo"
        className="i-logo"
        onClick={() => setShowInfo(true)}
      />

      {showInfo && (
        <div className='info-part'>
          <div className={`info-overlay ${isClosing ? 'fade-out' : 'fade-in'}`}>
            <img
              src={`${process.env.PUBLIC_URL}/Assets/Btns/closeBlack.png`}
              alt="xbtn"
              className="xbtn"
              onClick={closeInfo}
            />
            <div className={`info-text ${isClosing ? 'pop-out' : 'pop-in'}`}>
              <u>מפתחות:</u><br />
              עלמה יובל  <br />
              אביטל גמבורג
              <br /><br />
              <u>גרפיקאיות:</u><br />
              עלמה יובל <br />
              אביטל גמבורג
              {/* <br />אגם אונגר */}
              <br /><br />
              <u>מומחה תוכן:</u><br />
              שליו אלפסי <br />
              איריס
              <br /><br />
              <u>מנהלת מחלקה:</u><br />
              תמר בוסתן
            </div>
          </div>
        </div>
      )}


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



