import React, { useEffect, useState } from 'react';
import '../PartZeroComponent/PartZero.css'

const PartZero = () => {

    const [showTextDiv, setShowTextDiv] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTextDiv(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div id="PartZero">
            <img src={`${process.env.PUBLIC_URL}/Assets/PartZeroImgs/Ambulance.png`} alt="Ambulance" className="ambulance-zero" />
            <div className={`divText-Ambulance ${showTextDiv ? 'fade-in' : ''}`}>
                <div id='text-Ambulance1'>
                    <h2>
                        ברוכים הבאים ללומדת מכלול רפואה!
                    </h2>
                    <p>
                        בלומדה זו תעבור הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר
                    </p>
                </div>
                <div id="text-Ambulance2" style={{ display: "none" }}>
                    <h2>
                        בלומדה ילווה אותם תומר- קצין רפואה
                    </h2>
                    <p>
                        בלומדה ילווה אותם תומר- קצין רפואה
                        הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר הסבר
                    </p>
                </div>
                <img src={`${process.env.PUBLIC_URL}/Assets/PartZeroImgs/Tomer.png`} alt="Tomer" className="Tomer-zero" style={{ display: "none" }} />

            </div>
        </div>
    );
};

export default PartZero;
