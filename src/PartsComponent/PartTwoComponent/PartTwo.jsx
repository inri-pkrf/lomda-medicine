

import React, { useState } from 'react';
import Explanations from '../../genericComponent/Explanations';
import TvMahoz from '../PartTwoComponent/TvMahoz';
import TvNafa from '../PartTwoComponent/TvNafa';
import '../PartTwoComponent/styles/PartTwo.css';


const PartTwo = () => {
  const [showExplanation, setShowExplanation] = useState(true);
  const [position, setPosition] = useState("start");
  const [activeComponent, setActiveComponent] = useState("none");
  const [mahozCompleted, setMahozCompleted] = useState(false); // חדש
  const [nafaCompleted, setNafaCompleted] = useState(false); // חדש
  const chapterName = "PartTwo";


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
          <div className="nafaTvBtn" onClick={() => setActiveComponent("nafa")}>
            נפה
          </div>
          <div
            className={`mahozTvBtn ${mahozCompleted ? 'completed' : ''}`}
            onClick={() => setActiveComponent("mahoz")}
          >
            מחוז
          </div>
   




      {activeComponent === "nafa" && <TvNafa onFinish={() => {
          setNafaCompleted(true);
          setActiveComponent("none");
        }}/>}
      {activeComponent === "mahoz" && (
        <TvMahoz onFinish={() => {
          setMahozCompleted(true);
          setActiveComponent("none");
        }} />
      )}
    </div>
  );
};


export default PartTwo;








      //  <button
      //       onClick={() => {
      //         setPosition("end");
      //         setShowExplanation(true);
      //       }}
      //     >
      //       סיום פרק
      //     </button>



