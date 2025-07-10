import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PartZeroComponent/PartZero.css'

const PartZero = () => {
    const [step, setStep] = useState(1);
    const [showTextDiv, setShowTextDiv] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTextDiv(true);
        }, 100);


        return () => clearTimeout(timer);
    }, []);


    return (
        <div id="PartZero">
            <img
                src={`${process.env.PUBLIC_URL}/Assets/PartZeroImgs/Ambulance.png`}
                alt="Ambulance"
                className="ambulance-zero"
            />


            <div className={`divText-Ambulance ${showTextDiv ? 'fade-in-zero' : ''}`}>
                {/* Step 1 */}
                {step === 1 && (
                    <div id="text-Ambulance1">
                        <h2>ברוכים הבאים ללומדת מכלול רפואה!</h2>
                        <p>בלומדה זו תעבור הסבר הסבר הסבר ...</p>
                    </div>
                )}


                {/* Step 2 */}
                {step === 2 && (
                    <>
                        <div id="text-Ambulance2" className={fadeOut ? 'fade-out' : 'fade-in-zero'}>
                            <h2>בלומדה ילווה אתכם תומר – קצין רפואה</h2>
                            <p>הסבר הסבר הסבר ...</p>
                        </div>
                        <img
                            src={`${process.env.PUBLIC_URL}/Assets/PartZeroImgs/Tomer.png`}
                            alt="Tomer"
                            className={`Tomer-zero ${fadeOut ? 'fade-out' : 'fade-in-zero'}`}
                        />
                    </>
                )}


                <div className="buttons-bar">
                    {/* צד ימין – הקודם */}
                    <div className="btn-text btn-text-prev">
                        {step === 2 && (
                            <div onClick={() => {
                                setFadeOut(true);
                                setTimeout(() => {
                                    setStep(1);
                                    setFadeOut(false);
                                }, 400);
                            }}>
                                <div className="img-arrow img-arrow-prev" />
                                <div className="text-label">הקודם</div>
                            </div>
                        )}
                    </div>


                    {/* צד שמאל – המשך או סיום */}
                    <div className="btn-text btn-text-next">
                        {step === 1 && (
                            <div onClick={() => setStep(2)}>
                                <div className="img-arrow img-arrow-next" />
                                <div className="text-label">המשך</div>
                            </div>
                        )}
                        {step === 2 && (
                            <div className="btn-text btn-text-end" onClick={() => navigate('/part-one')}>
                                <div className="img-arrow img-arrow-end" />
                                <div className="text-label">סיום</div>
                            </div>
                        )}
                    </div>
                </div>


            </div>
        </div>
    );
};




export default PartZero;



