import React, { useState } from 'react';
import Explanations from '../../genericComponent/Explanations';
import { useNavigate } from 'react-router-dom';
import '../PartTwoComponent/styles/PartTwo.css'


const PartTwo = () => {
  const [showExplanation, setShowExplanation] = useState(true);
  const [position, setPosition] = useState("start");
  const chapterName = "PartTwo";
  const navigate = useNavigate();


  return (
    <div className="PartTwo">
      {showExplanation && (
        <Explanations
          chapterName={chapterName}
          position={position}
          onClose={() => setShowExplanation(false)}
        />
      )}
      <>
        {/* כאן שמים את תוכן הפרק */}
        <img className='tomerThinkingPartTwo' src={`${process.env.PUBLIC_URL}/Assets/PartTwoImgs/TomerThinking.png`} />
        <div className='nafaTvBtn' onClick={() => navigate('/tv-nafa')} >נפה</div>
        <div className='mahozTvBtn' onClick={() => navigate('/tv-mahoz')} >מחוז</div>


        {/* <button
            onClick={() => {
              setPosition("end");
              setShowExplanation(true);
            }}
          >
            סיום פרק
          </button> */}
      </>
    </div>
  );
};


export default PartTwo;



