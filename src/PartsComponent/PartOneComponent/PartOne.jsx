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
  const [viewedNoteIds, setViewedNoteIds] = useState([]);
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

  const closeNoteAndReturn = () => {
    setActiveNoteId(null);
    setIsZoomedCorkboard(false);
    setShowAboveBox(false);
    setShowNoteContent(false);

    setTimeout(() => {
      setShowNotes(true);
    }, 600);
  };

  const noteComponents = {
    1: <Note1 onClose={closeNoteAndReturn} />,
    2: <Note2 onClose={closeNoteAndReturn} />,
    3: <Note3 onClose={closeNoteAndReturn} />,
    4: <Note4 onClose={closeNoteAndReturn} />,
    5: <Note5 onClose={closeNoteAndReturn} />,
    6: <Note6 onClose={closeNoteAndReturn} />,
    7: <Note7 onClose={closeNoteAndReturn} />,
  };

  const handleNoteClick = (id) => {
    setActiveNoteId(id);
    setIsZoomedCorkboard(true);
    setShowNotes(false);
    setShowAboveBox(false);
    setShowNoteContent(false);

    setTimeout(() => {
      setShowAboveBox(true);
    }, 600);

    setTimeout(() => {
      setShowNoteContent(true);
    }, 1000);

    // הוספת הפתק לרשימת הנצפים אם לא קיים
    setViewedNoteIds((prev) => {
      if (!prev.includes(id)) {
        const updated = [...prev, id];
        sessionStorage.setItem('viewedNoteIds', JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  };

  // טעינה ראשונית מתוך sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem('viewedNoteIds');
    if (stored) {
      setViewedNoteIds(JSON.parse(stored));
    }
  }, []);

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
      {showExplanation && (
        <Explanations
          chapterName={chapterName}
          position={position}
          onClose={() => setShowExplanation(false)}
        />
      )}

      <>
        {activeNoteId === null && !showExplanation && (
          <img
            src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/ThomerPointing.png`}
            alt="Tomer"
            className={`Tomer-one ${notesFadeIn ? 'fade-in-one' : ''}`}
          />
        )}

        <img
          src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/corkboard.png`}
          alt="corkboard"
          className={`corkboard ${isZoomedCorkboard ? 'zoomed' : ''}`}
        />

        {isZoomedCorkboard && showAboveBox && (
          <div className="above-corkboard-box" />
        )}

        {activeNoteId === null && showNotes && notes.map(({ id, text }) => (
          <div className='contanier-notes' key={id}>
            <div
              className={`note-wrapper ${notesFadeIn ? 'fade-in-one' : ''} ${viewedNoteIds.includes(id) ? 'grayscale' : ''}`}
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

        {activeNoteId && showNoteContent && (
          <div className="note-expanded">
            {noteComponents[activeNoteId]}
          </div>
        )}
      </>
    </div>
  );
};

export default PartOne;
