import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PartTwoComponent/styles/TvMahoz.css';
import mahozData from '../../Data/TvData/MahozData'; // ← שים לב לנתיב


const TvMahoz = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const stepKey = `Step${step}`;
  const currentStep = mahozData[stepKey];


  return (
    <div className="TvMahoz">
      <div className='screen-mahoz'>
   
    </div>
    </div>
  );
};


export default TvMahoz;



