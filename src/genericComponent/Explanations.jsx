import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Explanations.css';
import explanationsData from '../Data/ExplanationsData/ExplanationsData';

const Explanations = ({ position, chapterName, onClose }) => {
  const content = explanationsData[chapterName]?.[position];
  const tomerImg = explanationsData[chapterName]?.TomerImg;
  const nextPart = explanationsData[chapterName]?.end?.nextPart;

  const navigate = useNavigate();

  const handleClose = () => {
    if (position === 'start') {
      onClose(); // רק סגירה
    } else if (position === 'end') {
      onClose(); // סגירה
      if (nextPart) {
        navigate(nextPart); // נווט לפרק הבא
      }
    }
  };

  if (!content) return null;

  return (
    <div
    id="Explanations"
  >
    {tomerImg && (
      <img
        src={tomerImg}
        alt="תומר"
        className={`tomer-img tomer${chapterName} ${position === "start" ? "fade-inExplanations" : ""}`}
      />
    )}
    <div className={`speech-bubble ${chapterName} ${position === "start" ? "fade-inExplanations" : ""}`}>
      <img
        className='close-btn-bubble'
        onClick={handleClose}
        src={`${process.env.PUBLIC_URL}/Assets/Btns/closeBlack.png`}
      />
      <p style={{ paddingTop: '20px' }}>
        {content.text}
      </p>
    </div>
  </div>
  
  );
};

export default Explanations;
