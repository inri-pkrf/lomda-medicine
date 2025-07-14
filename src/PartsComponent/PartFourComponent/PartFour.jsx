import React, { useState } from 'react';
import './styles/PartFour.css';
import relationsData from '../../Data/BoardData/RelationsData';
import Explanations from '../../genericComponent/Explanations';
import Board from './Board'; // נניח שהקומפוננטה שלך נמצאת כאן

const PartFour = () => {
    const [showExplanation, setShowExplanation] = useState(true);
    const [position, setPosition] = useState("start");
    const [chapterFinished, setChapterFinished] = useState(() => {
        return sessionStorage.getItem('chapterFinishedPartThree') === 'true';
    });
    const [backgroundImage, setBackgroundImage] = useState(`${process.env.PUBLIC_URL}/Assets/PartFourImgs/meetingRoom.png`);
    const [selectedRelation, setSelectedRelation] = useState(null);

    const chapterName = "PartFour";

    const handleHover = (id) => {
        const found = relationsData.find(item => item.id === id);
        if (found) {
            setBackgroundImage(found.ImgSrc);
        }
    };

    const resetBackground = () => {
        if (!selectedRelation) {
            setBackgroundImage(`${process.env.PUBLIC_URL}/Assets/PartFourImgs/meetingRoom.png`);
        }
    };

    const handleClick = (id) => {
        const found = relationsData.find(item => item.id === id);
        if (found) {
            setSelectedRelation(found);
            setBackgroundImage(found.ImgSrc); // נשאר גם לאחר hover
        }
    };

    const closeBoard = () => {
        setSelectedRelation(null);
        setBackgroundImage(`${process.env.PUBLIC_URL}/Assets/PartFourImgs/meetingRoom.png`);
    };

    return (
        <div className="PartFour">
            {showExplanation && (
                <Explanations
                    chapterName={chapterName}
                    position={position}
                    isChapterFinished={chapterFinished}
                    onClose={() => setShowExplanation(false)}
                />
            )}

            <img
                src={backgroundImage}
                alt="background"
                className="background-part3"
            />

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
