import React, { useEffect, useState } from 'react';
import '../GenericComponent/styles/IntroLomda.css';

const IntroLomda = () => {
    const [isVideoEnded, setIsVideoEnded] = useState(false);
    const [showIntro, setShowIntro] = useState(false);
    const [showSkipButton, setShowSkipButton] = useState(false);
    const [fadeOutVideo, setFadeOutVideo] = useState(false);

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
                <div className="intro-section">
                    <img src={`${process.env.PUBLIC_URL}/Assets/logos/logo.png`} alt="main-logo" className="main-logo" />
                    <img src={`${process.env.PUBLIC_URL}/Assets/logos/iLogo.png`} alt="iLogo" className="i-logo" />

                    <img src={`${process.env.PUBLIC_URL}/Assets/PartZeroImgs/clouds.png`} alt="clouds" className="clouds" />
                    <img src={`${process.env.PUBLIC_URL}/Assets/PartZeroImgs/hospital.png`} alt="hospital" className="hospital" />
                    <img src={`${process.env.PUBLIC_URL}/Assets/PartZeroImgs/Ambulance.png`} alt="Ambulance" className="ambulance" />

                    <div className="intro-text-slide-in text-area">
                        <h1 className="lomda-title">לומדה למכלול רפואה</h1>
                        <button className="btn-start">התחלה</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IntroLomda;
