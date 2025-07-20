import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './styles/PartThree.css';

import CardMedicine from './Cards/CardMedicine';
import CardReport from './Cards/CardReport';
import CardParlag from './Cards/CardParlag';
import Explanations from '../../genericComponent/Explanations';

const PartThree = ({ setHideNavBar }) => { // הוספת setHideNavBar בפרופס
    const location = useLocation();
    const reviewMode = location.state?.reviewMode || false;

    const [showExplanation, setShowExplanation] = useState(!reviewMode);

    const [hoveredItem, setHoveredItem] = useState(null);
    const [activeCard, setActiveCard] = useState(null);
    const [completedItems, setCompletedItems] = useState(() => {
        const saved = sessionStorage.getItem('completedItemsPartThree');
        return saved ? JSON.parse(saved) : [];
    });

    const [position, setPosition] = useState("start");
    const [chapterFinished, setChapterFinished] = useState(() => {
        return sessionStorage.getItem('chapterFinishedPartThree') === 'true';
    });

    const timerRef = useRef(null);
    const chapterName = "PartThree";

    const allItems = ['case', 'phone', 'vest'];

    const backgroundSrc = hoveredItem
        ? `${process.env.PUBLIC_URL}/Assets/PartThreeImgs/${hoveredItem}-site.png`
        : `${process.env.PUBLIC_URL}/Assets/PartThreeImgs/destractionSite.png`;

    const handleCloseCard = () => {
        if (activeCard && !completedItems.includes(activeCard)) {
            const updated = [...completedItems, activeCard];
            setCompletedItems(updated);
            sessionStorage.setItem('completedItemsPartThree', JSON.stringify(updated));
        }
        setActiveCard(null);
    };

    useEffect(() => {
        const allCompleted = allItems.every(id => completedItems.includes(id));
        if (allCompleted && !chapterFinished) {
            timerRef.current = setTimeout(() => {
                setPosition("end");
                if (!reviewMode) { // ✅ רק אם לא במצב review
                    setShowExplanation(true);
                }
                setChapterFinished(true);
                sessionStorage.setItem('chapterFinishedPartThree', 'true');
            }, 1200);
        }
    }, [completedItems, chapterFinished, reviewMode]);

    useEffect(() => {
        const storedCompleted = sessionStorage.getItem('completedItemsPartThree');
        if (storedCompleted) {
            setCompletedItems(JSON.parse(storedCompleted));
        }
        const finished = sessionStorage.getItem('chapterFinishedPartThree') === 'true';
        if (finished) {
            setChapterFinished(true);
            setPosition("end");
            if (!reviewMode) {
                setShowExplanation(true); // ✅ הצג הסבר רק אם לא review
            }
        }
    }, [reviewMode]);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    // הוספת הסתרת נאבר כשהכרטיס פתוח, ללא שינוי בלוגיקה
    useEffect(() => {
        if (!setHideNavBar) return;
        if (activeCard !== null) {
            setHideNavBar(true);
        } else {
            setHideNavBar(false);
        }
    }, [activeCard, setHideNavBar]);

    return (
        <div className="PartThree">
            {showExplanation && (
                <Explanations
                    chapterName={chapterName}
                    position={position}
                    isChapterFinished={chapterFinished}
                    onClose={() => setShowExplanation(false)}
                />
            )}

            <img
                src={backgroundSrc}
                alt="background"
                className="background-part3"
            />

            {!showExplanation && (
                <>
                    <img
                        src={`${process.env.PUBLIC_URL}/Assets/PartThreeImgs/ThomerShocked.png`}
                        alt="Tomer"
                        className="Tomer-three"
                    />

                    <div className="speechBubbleThree">
                        מצא את החפצים הקבורים בהריסות
                    </div>

                    <img
                        src={`${process.env.PUBLIC_URL}/Assets/PartThreeImgs/case.png`}
                        alt="case"
                        className={`items-three case ${completedItems.includes('case') ? 'item-complete' : ''}`}
                    />
                    <img
                        src={`${process.env.PUBLIC_URL}/Assets/PartThreeImgs/phone.png`}
                        alt="phone"
                        className={`items-three phone ${completedItems.includes('phone') ? 'item-complete' : ''}`}
                    />
                    <img
                        src={`${process.env.PUBLIC_URL}/Assets/PartThreeImgs/vest.png`}
                        alt="vest"
                        className={`items-three vest ${completedItems.includes('vest') ? 'item-complete' : ''}`}
                    />
                </>
            )}

            <div
                className='case-area items-area'
                onMouseEnter={() => setHoveredItem('case')}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setActiveCard('case')}
            />
            <div
                className='phone-area items-area'
                onMouseEnter={() => setHoveredItem('phone')}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setActiveCard('phone')}
            />
            <div
                className='vest-area items-area'
                onMouseEnter={() => setHoveredItem('vest')}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setActiveCard('vest')}
            />

            {activeCard && (
                <div className="card-overlay">
                    <div className={`card ${activeCard}-border`}>
                        {activeCard === 'case' && <CardMedicine onCloseCard={handleCloseCard} />}
                        {activeCard === 'phone' && <CardReport onCloseCard={handleCloseCard} />}
                        {activeCard === 'vest' && <CardParlag onCloseCard={handleCloseCard} />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartThree;
