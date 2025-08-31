import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/NavigationButtons.css';

const steps = [
    { id: 1, title: 'מבוא', path: '/part-one' },
    { id: 2, title: 'מבנה מפקדות', path: '/part-two' },
    { id: 3, title: 'שאלה', path: '/questions/TWO' },
    { id: 4, title: 'פלר"ג', path: '/part-three' },
    { id: 5, title: 'שאלה', path: '/questions/THREE' },
    { id: 6, title: 'יחסי גומלין', path: '/part-four' },
    { id: 7, title: 'שאלה', path: '/questions/FOUR' },
    { id: 8, title: 'סימולציה', path: '/simulation' },
];

const NavigationButtons = ({ showNext = true, allowNext = true, endShownKey = null }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const currentIndex = steps.findIndex(step => step.path === location.pathname);
    const prevStep = currentIndex > 0 ? steps[currentIndex - 1] : null;
    const nextStep = currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;
    const isSimulationStart = location.pathname === '/simulation';

    const defaultPrevPath = '/part-zero';

    // אם הועבר key, בודקים ב-sessionStorage אם ההסבר הסופי הוצג
    const canShowNext = endShownKey ? sessionStorage.getItem(endShownKey) === "true" : true;

    return (
          <div className="navigation-buttons">
    {(prevStep || isSimulationStart) && (
        <button
            className="btn-nav prev"
            onClick={() => {
                if (prevStep) navigate(prevStep.path);
                else navigate(steps[6].path); // השלב הקודם לפני הסימולציה
            }}
        >
            → הקודם
        </button>
    )}

    {showNext && nextStep && allowNext && canShowNext && (
        <button
            className="btn-nav next"
            onClick={() => {
                if (nextStep.path === '/simulation') {
                    // פותח את אינטרו הסימולציה במקום ניווט ישיר
                    navigate('/simulation', { state: { fromQuestions: true } });
                } else {
                    navigate(nextStep.path);
                }
            }}
        >
            המשך ←
        </button>
    )}
</div>

    );
};


export default NavigationButtons;
