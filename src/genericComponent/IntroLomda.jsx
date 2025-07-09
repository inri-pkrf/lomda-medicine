import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../GenericComponent/styles/IntroLomda.css';

const IntroLomda = () => {
    // const [isVideoEnded, setIsVideoEnded] = useState(false);
    // const [showIntro, setShowIntro] = useState(false);
        const [isVideoEnded, setIsVideoEnded] = useState(true);
    const [showIntro, setShowIntro] = useState(true);
    const [showSkipButton, setShowSkipButton] = useState(false);
    const [fadeOutVideo, setFadeOutVideo] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const skipButtonTimeout = setTimeout(() => {
            setShowSkipButton(true);
        }, 2000);

        const showIntroTimeout = setTimeout(() => {
            setShowIntro(true);
        }, 8200);

        const fadeOutTimeout = setTimeout(() => {
            setFadeOutVideo(true);
            setTimeout(() => {
                setIsVideoEnded(true);
            }, 300);
        }, 8000);

        return () => {
            clearTimeout(skipButtonTimeout);
            clearTimeout(showIntroTimeout);
            clearTimeout(fadeOutTimeout);
        };
    }, []);

    const skipVideo = () => {
        setFadeOutVideo(true);
        setTimeout(() => {
            setIsVideoEnded(true);
            setShowIntro(true);
        }, 300);
    };

    const handleStartBtn = () => {
        setIsExiting(true);
        setTimeout(() => {
            navigate('/part-zero');
        }, 1000);
    };

    return (
        <div id="IntroLomda">
            {!isVideoEnded && (
                <div className={`video-section ${fadeOutVideo ? 'fade-out' : ''}`}>
                    {showSkipButton && (
                        <button className="skip" onClick={skipVideo}>
                            &lt;&lt; דלג/י
                        </button>
                    )}
                    <video className="video-intro" autoPlay muted playsInline>
                        <source
                            src={`${process.env.PUBLIC_URL}/Assets/intro/introVidComp.mp4`}
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}

            {showIntro && (
                <div className={`intro-section ${isExiting ? 'exit' : ''}`}>

                    <img src={`${process.env.PUBLIC_URL}/Assets/PartZeroImgs/clouds.png`} alt="clouds" className="clouds" />
                    <img src={`${process.env.PUBLIC_URL}/Assets/PartZeroImgs/hospital.png`} alt="hospital" className="hospital" />
                    <img src={`${process.env.PUBLIC_URL}/Assets/PartZeroImgs/Ambulance.png`} alt="Ambulance" className="ambulance" />

                    <div className="intro-text-slide-in text-area">
                        <h1 className="lomda-title">לומדה למכלול רפואה</h1>
                        <button className="btn-start" onClick={handleStartBtn}>התחלה</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IntroLomda;
