import React, { useState, useEffect } from 'react';
import Explanations from '../../genericComponent/Explanations';
import { useLocation } from 'react-router-dom';
import TvMahoz from '../PartTwoComponent/TvMahoz';
import TvNafa from '../PartTwoComponent/TvNafa';
import '../PartTwoComponent/styles/PartTwo.css';

const PartTwo = ({ setHideNavBar }) => {  // מקבלים את setHideNavBar בפרופס
  const location = useLocation();
  const reviewMode = location.state?.reviewMode || false;

  // showExplanation בברירת מחדל: false אם reviewMode, אחרת true
  const [showExplanation, setShowExplanation] = useState(!reviewMode);
  const [position, setPosition] = useState("start");
  const [activeComponent, setActiveComponent] = useState("none");
  const [mahozCompleted, setMahozCompleted] = useState(() => {
    return sessionStorage.getItem("mahozCompleted") === "true";
  });
  const [nafaCompleted, setNafaCompleted] = useState(() => {
    return sessionStorage.getItem("nafaCompleted") === "true";
  });
  const chapterName = "PartTwo";

  // שמירת מצב ה-completed ל-sessionStorage בכל שינוי
  useEffect(() => {
    sessionStorage.setItem("mahozCompleted", mahozCompleted);
  }, [mahozCompleted]);

  useEffect(() => {
    sessionStorage.setItem("nafaCompleted", nafaCompleted);
  }, [nafaCompleted]);

useEffect(() => {
  if (mahozCompleted && nafaCompleted) {
    setPosition("end");

    if (!reviewMode) {
      const timer = setTimeout(() => {
        setShowExplanation(true);
      }, 1000); 

      return () => clearTimeout(timer); 
    }
  }
}, [mahozCompleted, nafaCompleted, reviewMode]);

  useEffect(() => {
    if (!setHideNavBar) return;

    if (activeComponent === "mahoz" || activeComponent === "nafa") {
      setHideNavBar(true);
    } else {
      setHideNavBar(false);
    }
  }, [activeComponent, setHideNavBar]);

  return (
    <div className="PartTwo">
       {showExplanation && (
        <Explanations
          chapterName={chapterName}
          position={position}
          onClose={() => setShowExplanation(false)}
        />
      )}

      {!showExplanation && activeComponent === "none" && (
        <img
          className="tomerThinkingPartTwo"
          src={`${process.env.PUBLIC_URL}/Assets/PartTwoImgs/TomerThinking.png`}
          alt="טומר חושב"
        />
      )}

      <div
        className={`nafaTvBtn ${nafaCompleted ? 'completed-nafa' : ''}`}
        onClick={() => setActiveComponent("nafa")}
      >
        נפה
      </div>

      <div
        className={`mahozTvBtn ${mahozCompleted ? 'completed-mahoz' : ''}`}
        onClick={() => setActiveComponent("mahoz")}
      >
        מחוז
      </div>

      {activeComponent === "nafa" && (
        <TvNafa
          onFinish={() => {
            setNafaCompleted(true);
            setActiveComponent("none");
          }}
        />
      )}

      {activeComponent === "mahoz" && (
        <TvMahoz
          onFinish={() => {
            setMahozCompleted(true);
            setActiveComponent("none");
          }}
        />
      )}
    </div>
  );
};

export default PartTwo;
