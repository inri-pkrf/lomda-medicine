import React, { useState } from 'react';
import Explanations from '../../genericComponent/Explanations';

const PartOne = () => {
  const [showExplanation, setShowExplanation] = useState(true);
  const [position, setPosition] = useState("start");
  const chapterName = "PartOne";

  return (
    <div className="part-one-container">
      {showExplanation ? (
        <Explanations
          chapterName={chapterName}
          position={position}
          onClose={() => setShowExplanation(false)}
        />
      ) : (
        <>
          {/* כאן שמים את התוכן של פרק 1 */}
          <h2>ברוכה הבאה לפרק הראשון!</h2>

          {/* בסיום הפעילות מציגים שוב את ההסבר עם position=end */}
          <button
            onClick={() => {
              setPosition("end");
              setShowExplanation(true);
            }}
          >
            סיום פרק
          </button>
        </>
      )}
    </div>
  );
};

export default PartOne;
