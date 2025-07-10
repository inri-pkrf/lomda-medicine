import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PartTwoComponent/styles/TvNafa.css';


const TvNafa = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const stepKey = `Step${step}`;
  const currentStep = mahozData[stepKey];


  return (
    <div className="TvNafa">
      <div className='screen-nafa'>
   
    </div>
    </div>
  );
};


export default TvMahoz;



