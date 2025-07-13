import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../genericComponent/styles/IntroLomda.css';

const IntroLomda = () => {
    const [showFullScreenPrompt, setShowFullScreenPrompt] = useState(true);
    const [isVideoEnded, setIsVideoEnded] = useState(false);
    const [showIntro, setShowIntro] = useState(false);
    const [showSkipButton, setShowSkipButton] = useState(false);
    const [fadeOutVideo, setFadeOutVideo] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!showFullScreenPrompt) {
            const skipButtonTimeout = setTimeout(() => setShowSkipButton(true), 2000);
            const fadeOutTimeout = setTimeout(() => {
                setFadeOutVideo(true);
                setTimeout(() => setIsVideoEnded(true), 300);
            }, 8400);
            const showIntroTimeout = setTimeout(() => setShowIntro(true), 8800);

            return () => {
                clearTimeout(skipButtonTimeout);
                clearTimeout(fadeOutTimeout);
                clearTimeout(showIntroTimeout);
            };
        }
    }, [showFullScreenPrompt]);

    const handleStartVideo = () => {
        setShowFullScreenPrompt(false);
        setIsVideoEnded(false);
        setShowIntro(false);
        setShowSkipButton(false);
        setFadeOutVideo(false);
    };

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
            {/* שלב ראשון – הודעת F11 */}
            {showFullScreenPrompt && (
                <div className="fullscreen-prompt">
                    <div className="prompt-text">
                        <p>להצגת הלומדה בצורה מיטבית לחצ/י על <strong>F11</strong></p>
                        <button className="btn-go" onClick={handleStartVideo}>צאו לדרך!</button>
                    </div>
                </div>
            )}

            {/* שלב שני – סרטון פתיחה */}
            {!showFullScreenPrompt && !isVideoEnded && (
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

            {/* שלב שלישי – מסך התחלה עם כפתור */}
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
