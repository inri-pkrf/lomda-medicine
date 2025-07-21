import React, { useState, useEffect, useRef } from 'react';
import './styles/PartFour.css';
import relationsData from '../../Data/BoardData/RelationsData';
import Explanations from '../../genericComponent/Explanations';
import Board from './Board';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const PartFour = ({ setHideNavBar }) => { // הוספת setHideNavBar בפרופס
    const navigate = useNavigate();
    const timerRef = useRef(null);
    const location = useLocation();
    const reviewMode = location.state?.reviewMode || false;

    const [showExplanation, setShowExplanation] = useState(!reviewMode);

    const [position, setPosition] = useState("start");
    const [chapterFinished, setChapterFinished] = useState(() => {
        return sessionStorage.getItem('chapterFinishedPartFour') === 'true';
    });
    const [backgroundImage, setBackgroundImage] = useState(`${process.env.PUBLIC_URL}/Assets/PartFourImgs/meetingRoomNew.png`);
    const [selectedRelation, setSelectedRelation] = useState(null);
    const [hoveredRelationId, setHoveredRelationId] = useState(null);
    const [visitedRelations, setVisitedRelations] = useState(() => {
        const saved = sessionStorage.getItem('visitedRelationsPartFour');
        return saved ? JSON.parse(saved) : [];
    });

    const chapterName = "PartFour";

    // לאחר טעינה – בדוק אם הפרק כבר הושלם
  useEffect(() => {
  const storedVisited = sessionStorage.getItem('visitedRelationsPartFour');
  const visited = storedVisited ? JSON.parse(storedVisited) : [];
  setVisitedRelations(visited);

  const finished = sessionStorage.getItem('chapterFinishedPartFour') === 'true';
  setChapterFinished(finished);

  if (finished) {
    setPosition("end");
    setShowExplanation(false); // כבר סיים בעבר - לא מציג הסבר בכלל
  } else if (visited.length === 0 && !reviewMode) {
    setShowExplanation(true);  // כניסה ראשונה - הסבר פתיחה
    setPosition("start");
  } else {
    // כבר ביקר לפחות בפריט אחד, אך לא סיים
    setShowExplanation(false);
    setPosition("middle");
  }
}, [reviewMode]);

    // בדיקה אם כל הפריטים נבחרו
useEffect(() => {
  const allVisited = relationsData.every(rel => visitedRelations.includes(rel.id));
  if (allVisited && !chapterFinished) {
    timerRef.current = setTimeout(() => {
      setPosition("end");
      if (!reviewMode) setShowExplanation(true); // הסבר סיום עם דיליי
      setChapterFinished(true);
      sessionStorage.setItem('chapterFinishedPartFour', 'true');
    }, 1200);
  }

  return () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };
}, [visitedRelations, chapterFinished, reviewMode]);

    // הסתרת נאבר כאשר הלוח פתוח
    useEffect(() => {
        if (!setHideNavBar) return;
        if (selectedRelation !== null) {
            setHideNavBar(true);
        } else {
            setHideNavBar(false);
        }
    }, [selectedRelation, setHideNavBar]);


    const handleCloseExplanation = () => {
        setShowExplanation(false);
    };

    const handleHover = (id) => {
        const found = relationsData.find(item => item.id === id);
        if (found) {
            setBackgroundImage(found.ImgSrc);
            setHoveredRelationId(id);
        }
    };

    const resetBackground = () => {
        if (!selectedRelation) {
            setBackgroundImage(`${process.env.PUBLIC_URL}/Assets/PartFourImgs/meetingRoomNew.png`);
        }
        setHoveredRelationId(null);
    };

    const handleClick = (id) => {
        const found = relationsData.find(item => item.id === id);
        if (found) {
            setSelectedRelation(found);
            setBackgroundImage(found.ImgSrc);
        }
    };

    const closeBoard = () => {
        if (selectedRelation && !visitedRelations.includes(selectedRelation.id)) {
            const updated = [...visitedRelations, selectedRelation.id];
            setVisitedRelations(updated);
            sessionStorage.setItem('visitedRelationsPartFour', JSON.stringify(updated));
        }
        setSelectedRelation(null);
        setBackgroundImage(`${process.env.PUBLIC_URL}/Assets/PartFourImgs/meetingRoomNew.png`);
    };

    return (
        <div className="PartFour">
            {showExplanation && (
                <Explanations
                    chapterName={chapterName}
                    position={position}
                    isChapterFinished={chapterFinished}
                    onClose={handleCloseExplanation}
                />
            )}

            <img
                src={backgroundImage}
                alt="background"
                className="background-part4"
            />

            {relationsData.map((relation) => {
                const isHovered = hoveredRelationId === relation.id;
                const isSelected = selectedRelation?.id === relation.id;
                const isVisited = visitedRelations.includes(relation.id);
                const shouldHighlight = isHovered || isSelected || isVisited;

                return (
                    <div
                        key={relation.id}
                        className={`relation-label ${relation.id}-label`}
                        style={{
                            border: `3px solid ${relation.colorRelation}`,
                            color: shouldHighlight ? 'white' : relation.colorRelation,
                            backgroundColor: shouldHighlight ? relation.colorRelation : 'transparent',
                            transition: '0.3s ease',
                            transform: isHovered ? 'scale(1.05)' : 'scale(0.95)',
                        }}
                    >
                        {relation.name}
                    </div>
                );
            })}

            <img
                src={`${process.env.PUBLIC_URL}/Assets/PartFourImgs/TomerBack.png`}
                alt="tomer"
                className="tomer-back"
            />

            {/* אזורים סטטיים עם התנהגות דינמית */}
            <div
                id='relations1'
                className='people-area modain-area'
                onMouseEnter={() => handleHover('relations1')}
                onMouseLeave={resetBackground}
                onClick={() => handleClick('relations1')}
            />
            <div
                id='relations2'
                className='people-area lashcab-area'
                onMouseEnter={() => handleHover('relations2')}
                onMouseLeave={resetBackground}
                onClick={() => handleClick('relations2')}
            />
            <div
                id='relations3'
                className='people-area mada-area'
                onMouseEnter={() => handleHover('relations3')}
                onMouseLeave={resetBackground}
                onClick={() => handleClick('relations3')}
            />
            <div
                id='relations4'
                className='people-area malka-area'
                onMouseEnter={() => handleHover('relations4')}
                onMouseLeave={resetBackground}
                onClick={() => handleClick('relations4')}
            />
            <div
                id='relations5'
                className='people-area mivzaim-area'
                onMouseEnter={() => handleHover('relations5')}
                onMouseLeave={resetBackground}
                onClick={() => handleClick('relations5')}
            />
            <div
                id='relations6'
                className='people-area shoolhan-area'
                onMouseEnter={() => handleHover('relations6')}
                onMouseLeave={resetBackground}
                onClick={() => handleClick('relations6')}
            />
            <div
                id='relations7'
                className='people-area uxluxsia-area'
                onMouseEnter={() => handleHover('relations7')}
                onMouseLeave={resetBackground}
                onClick={() => handleClick('relations7')}
            />
            <div
                id='relations8'
                className='people-area tikshuv-area'
                onMouseEnter={() => handleHover('relations8')}
                onMouseLeave={resetBackground}
                onClick={() => handleClick('relations8')}
            />

            {/* קומפוננטת הלוח */}
            {selectedRelation && (
                <Board relation={selectedRelation} onClose={closeBoard} />
            )}
        </div>
    );
};

export default PartFour;