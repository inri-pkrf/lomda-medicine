import React, { useState, useEffect } from 'react';
import Explanations from '../../genericComponent/Explanations';
import './styles/PartOne.css';

import Note1 from './Notes/Note1';
import Note2 from './Notes/Note2';
import Note3 from './Notes/Note3';
import Note4 from './Notes/Note4';
import Note5 from './Notes/Note5';
import Note6 from './Notes/Note6';
import Note7 from './Notes/Note7';

const PartOne = () => {
  const [showExplanation, setShowExplanation] = useState(true);
  const [position, setPosition] = useState("start");
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isZoomedCorkboard, setIsZoomedCorkboard] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  const [showAboveBox, setShowAboveBox] = useState(false);
  const [notesFadeIn, setNotesFadeIn] = useState(false);
  const [showNoteContent, setShowNoteContent] = useState(false);

  const chapterName = "PartOne";

  const notes = [
    { id: 1, text: 'ייעוד פקע"ר' },
    { id: 2, text: 'סד"כ פקע"ר' },
    { id: 3, text: 'סד"כ פקע"ר רפואה' },
    { id: 4, text: "התפיסה המבצעית" },
    { id: 5, text: 'מחוזות פקע"ר' },
    { id: 6, text: "מבנה הפיקוד" },
    { id: 7, text: "המענה המבצעי" },
  ];

  const noteComponents = {
    1: <Note1 />,
    2: <Note2 />,
    3: <Note3 />,
    4: <Note4 />,
    5: <Note5 />,
    6: <Note6 />,
    7: <Note7 />,
  };

  const handleNoteClick = (id) => {
    setActiveNoteId(id);
    setIsZoomedCorkboard(true);
    setShowNotes(false);
    setShowAboveBox(false);
    setShowNoteContent(false); // איפוס לפני פתיחה חדשה

    // אחרי שהלוח גדל - להראות את הקופסה הלבנה
    setTimeout(() => {
      setShowAboveBox(true);
    }, 600);

    // דיליי של שניה לפני הצגת תוכן הפתק
    setTimeout(() => {
      setShowNoteContent(true);
    }, 1000);
  };

  useEffect(() => {
    if (showNotes) {
      setNotesFadeIn(false);
      const timeoutId = setTimeout(() => {
        setNotesFadeIn(true);
      }, 10);
      return () => clearTimeout(timeoutId);
    } else {
      setNotesFadeIn(false);
    }
  }, [showNotes]);

  return (
    <div className="PartOne">
      {showExplanation ? (
        <Explanations
          chapterName={chapterName}
          position={position}
          onClose={() => setShowExplanation(false)}
        />
      ) : (
        <>
          {/* תומר מוצג רק אם אין פתק פתוח */}
          {activeNoteId === null && (
            <img
              src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/ThomerPointing.png`}
              alt="Tomer"
              className={`Tomer-one ${notesFadeIn ? 'fade-in' : ''}`}
            />
          )}

          {/* הלוח עם אנימציה */}
          <img
            src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/corkboard.png`}
            alt="corkboard"
            className={`corkboard ${isZoomedCorkboard ? 'zoomed' : ''}`}
          />

          {/* דיב מעל הלוח - רק כשהלוח בגדול והקופסה מופעלת */}
          {isZoomedCorkboard && showAboveBox && (
            <div className="above-corkboard-box">
              {/* כאן תוכלי להוסיף כותרת או עיצוב */}
            </div>
          )}

          {/* פתקים - מופיעים רק כשהאין פתק פתוח וגם showNotes אמיתי */}
          {activeNoteId === null && showNotes && notes.map(({ id, text }) => (
            <div className='contanier-notes' key={id}>
              <div
                className={`note-wrapper ${notesFadeIn ? 'fade-in' : ''}`}
                id={`note${id}`}
                onClick={() => handleNoteClick(id)}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note${id}/note${id}.png`}
                  alt={`note${id}`}
                  className="notes"
                />
                <div className="note-text">{text}</div>
              </div>
            </div>
          ))}

          {/* תוכן הפתק המורחב עם דיליי */}
          {activeNoteId && showNoteContent && (
            <div className="note-expanded">
              <button
                className="close-btn"
                onClick={() => {
                  setActiveNoteId(null);
                  setIsZoomedCorkboard(false);
                  setShowAboveBox(false);
                  setShowNoteContent(false);

                  // מחכה לסיום האנימציה של הקטנת הלוח לפני שמראה פתקים
                  setTimeout(() => {
                    setShowNotes(true);
                  }, 600);
                }}
              >
                חזור
              </button>
              {noteComponents[activeNoteId]}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PartOne;



{/* סיום פרק 1 */ }
{/* <button
            onClick={() => {
              setPosition("end");
              setShowExplanation(true);
            }}
          >
            סיום פרק
          </button> */}