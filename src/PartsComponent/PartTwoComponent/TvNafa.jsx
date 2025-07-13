import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PartTwoComponent/styles/TvNafa.css';
import NafaData from '../../Data/TvData/NafaData';
import PopUp from '../../genericComponent/PopUp';


const TvNafa = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState({ title: '', content: '', color: '' });
  const [refuaImgShown, setRefuaImgShown] = useState(() => {
    const stored = JSON.parse(sessionStorage.getItem('nafaClickedButtons') || '[]');
    const required = [1, 3, 4, 5, 6, 7];
    return required.every(id => stored.includes(id));
  });


  const [clickedButtons, setClickedButtons] = useState(() => {
    const stored = JSON.parse(sessionStorage.getItem('nafaClickedButtons') || '[]');
    return new Set(stored);
  });


  const [button2Clicked, setButton2Clicked] = useState(() => {
    return sessionStorage.getItem('nafaClickedButton2') === 'true';
  });




  const navigate = useNavigate();
const handlePressed = (id) => {
  console.log("נלחץ כפתור", id);


  if (step === 0) {
    if (id === 2) {
      setButton2Clicked(true);
      sessionStorage.setItem('nafaClickedButton2', 'true');
      setStep(1); // כפתור 2 מעביר לשלב הבא
    } else {
      setClickedButtons(prev => {
        const newSet = new Set(prev);
        if (!newSet.has(id)) {
          newSet.add(id);
          sessionStorage.setItem('nafaClickedButtons', JSON.stringify([...newSet]));


          const requiredButtons = [1, 3, 4, 5, 6, 7];
          if (requiredButtons.every(num => newSet.has(num))) {
            setRefuaImgShown(true);
          }
        }
        return newSet;
      });
    }
  } else {
    // עבור שלבים אחרים
    setClickedButtons(prev => {
      const newSet = new Set(prev);
      if (!newSet.has(id)) {
        newSet.add(id);
        sessionStorage.setItem('nafaClickedButtons', JSON.stringify([...newSet]));


        const requiredButtons = [1, 2,3, 4, 5, 6, 7];
        if (requiredButtons.every(num => newSet.has(num))) {
          setRefuaImgShown(true);
        }
      }
      return newSet;
    });
  }


  // הצגת הפופאפ לפי הנתונים ב-NafaData
  const stepData = NafaData[step];
  if (stepData?.rolesBtn?.[id]) {
    const role = stepData.rolesBtn[id];
    setPopupContent({
      title: role.title || 'פריט מידע',
      content: role.content || '',
      color: role.color || '',
    });
    setPopupVisible(true);
  }
};




  const handleFinish = () => {
    const completedParts = JSON.parse(sessionStorage.getItem('completedParts') || '[]');
    if (!completedParts.includes('nafa')) {
      completedParts.push('nafa');
      sessionStorage.setItem('completedParts', JSON.stringify(completedParts));
    }
    onFinish();
  };


  const totalSteps = Object.keys(NafaData).length - 1;
  const currentStep = NafaData[step];


  // פונקציה להצגת קבוצת הכפתורים עם מיקום משתנה
 


  return (
    <div className="TvNafa">
      <img
        className="Tv-img-nafa"
        src={`${process.env.PUBLIC_URL}/Assets/PartTwoImgs/WarRoomTv.png`}
        alt="corkboard"
      />


      {(step === 0) && (
        <div className="intro-step-container screen-nafa">
          <img
            className="Tv-img-nafa-0"
            src={
              refuaImgShown
                ? `${process.env.PUBLIC_URL}/Assets/PartTwoImgs/Nafa/mivneNafa2.png`
                : `${process.env.PUBLIC_URL}/Assets/PartTwoImgs/Nafa/mivneNafa1.png`
            }
            alt="corkboard"
          />
          <h2 className="nafa-title"> נפה </h2>


          {currentStep && (
            <div className={`info-nafa ${currentStep?.srcImg ? 'with-image' : 'no-image'}`}>
              {currentStep.text}
            </div>
          )}
          <div
              className={`intro-buttons-group-nafa ${
                (step === 0) ? 'position-step-zero' : 'position-other-steps'
              }`}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((id) => (
                <button
                  key={id}
                  id={`btn-${id}-nafa`}
                  className={`intro-button-nafa ${
                    (id === 2 && button2Clicked) || (id !== 2 && clickedButtons.has(id))
                      ? 'completed-nafa-btn'
                      : ''
                  }`}
                  onClick={() => handlePressed(id)}
                  disabled={id === 2 && !refuaImgShown}
                >
                </button>
              ))}
            </div>
        </div>
      )}
      {(step === 3) && (
        <div className="intro-step-container screen-nafa">
           {currentStep?.srcImg && (
              <img
                className={`nafa-step-image step-${step}`}
                src={currentStep.srcImg}
                alt="מחוז"
              />
            )}
          <h2 className="nafa-title"> נפה </h2>


          {currentStep && (
            <div className={`info-nafa ${currentStep?.srcImg ? 'with-image' : 'no-image'}`}>
              {currentStep.text}
            </div>
          )}


    <div
              className={`intro-buttons-group-nafa-3 ${
                (step === 0) ? 'position-step-3' : 'position-other-steps'
              }`}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((id) => (
                <button
                  key={id}
                  id={`btn-${id}-nafa-3`}
                  className={`intro-button-nafa-3 ${
                    (id === 2 && button2Clicked) || (id !== 2 && clickedButtons.has(id))
                      ? 'completed-nafa-btn'
                      : ''
                  }`}
                  onClick={() => handlePressed(id)}
                  disabled={id === 2 && !refuaImgShown}
                >
                </button>
              ))}
            </div>
        </div>        
      )}


      {step !== 0 && step !== 3 && (
        <div className="screen-nafa">
          <h2 className="nafa-title">נפה</h2>


          <div className="step-content">
            {currentStep && (
              <div className={`info-nafa ${currentStep?.srcImg ? 'with-image' : 'no-image'}`}>
                {currentStep.text}
              </div>
            )}


            {currentStep?.srcImg && (
              <img
                className={`nafa-step-image step-${step}`}
                src={currentStep.srcImg}
                alt="מחוז"
              />
            )}


            {currentStep?.roles && (
              <div className="scrollable-container-nafa">
                <ul className="roles-list-nafa">
                  {currentStep.roles.map((role, idx) => (
                    <li key={idx}>{role}</li>
                  ))}
                </ul>
              </div>
            )}


            {currentStep?.subroles && (
              <ul className={`subroles-list-nafa step-${step}`}>
                {currentStep.subroles.map((role, idx) => (
                  <li key={idx}>{role}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}


      {step > 0 && (
  <div className="buttons-bar">
    <div
      className="btn-text btn-text-prev"
      style={{ visibility: step > 1 ? 'visible' : 'hidden' }}
      onClick={() => setStep(prev => Math.max(prev - 1, 1))}
    >
      <div className="img-arrow" />
      <div className="text-label">הקודם</div>
    </div>


    {step < totalSteps ? (
      <div
        className="btn-text btn-text-next"
        onClick={() => setStep(prev => Math.min(prev + 1, totalSteps))}
      >
        <div className="img-arrow" />
        <div className="text-label">המשך</div>
      </div>
    ) : (
      <div
        className="btn-text btn-text-end"
        onClick={() => {
          const requiredButtons = [1, 2, 3, 4, 5, 6];
          if (requiredButtons.every(id => clickedButtons.has(id))) {
            handleFinish();
          } else {
            console.log('נא ללחוץ על כל הכפתורים לפני סיום');
          }
        }}
      >
        <div className="img-arrow" />
        <div className="text-label">סיום</div>
      </div>
    )}
  </div>
)}


      <PopUp
        isVisible={popupVisible}
        onClose={() => setPopupVisible(false)}
        title={popupContent.title}
        content={popupContent.content}
        color={popupContent.color}
      />
    </div>
  );
};


export default TvNafa;





