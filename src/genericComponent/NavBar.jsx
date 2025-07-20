import React from 'react';
import '../genericComponent/styles/NavBar.css';


const steps = [
    { title: 'מבוא', isQuestion: false, isActive: false },
    { title: 'מבנה מפקדות', isQuestion: false, isActive: false },
    { title: 'שאלה', isQuestion: true, isActive: false },
    { title: 'פלרג', isQuestion: false, isActive: false },
    { title: 'שאלה', isQuestion: true, isActive: false },
    { title: 'יחסי גומלין', isQuestion: false, isActive: false },
    { title: 'שאלה', isQuestion: true, isActive: false },
    { title: 'סימולציה', isQuestion: false, isActive: true },
];


const NavBar = () => {
    return (
        <div className="NavBar">
            <div className="timeline">
                <div className="background-line"></div>
                {steps.map((step, index) => (
                    <div className="step" key={index}>
                        <div className={`circle ${step.isActive ? 'active' : ''}`}>
                            {step.isQuestion ? '?' : ''}
                        </div>
                        <div className={`label ${!step.isQuestion ? '' : 'empty'}`}>
                            {!step.isQuestion ? step.title : ''}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default NavBar;

