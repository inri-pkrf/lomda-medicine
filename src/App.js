import './App.css';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import IntroLomda from './GenericComponent/IntroLomda';
import PartZero from './PartsComponent/PartZeroComponent/PartZero';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <img src={`${process.env.PUBLIC_URL}/Assets/logos/logo.png`} alt="main-logo" className="main-logo" onClick={() => navigate('/')} />
      <img src={`${process.env.PUBLIC_URL}/Assets/logos/iLogo.png`} alt="iLogo" className="i-logo" />

      {/* <div className='info-part'>
        <div className='info-overlay '>
          <div className='info-text'>
            מפתחות:   <br />
            עלמה יובל  <br />
            אביטל גמבורג
            <br />
            <br />
            גרפיקאיות:  <br />
            עלמה יובל <br />
            אביטל גמבורג <br />
            אגם
            <br />
            <br />
            מומחה תוכן:  <br />
            שליו אלפסי <br />
            איריס
            <br />
            <br />
            מנהלת פרוקייט:  <br />
            תמר בוסטן
          </div>
        </div>
      </div> */}

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
