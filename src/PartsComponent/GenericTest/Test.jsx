import React, { useState, useEffect } from 'react';
import TestData from '../../Data/TestData'; // כאן את מדביקה את השאלות שלך
import './Test.css';
import NavigationButtons from '../../genericComponent/NavigationButtons';

const Test = ({ onFinishTest }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const currentQuestion = TestData[currentIndex];

  const handleOptionSelect = idx => {
    setSelectedOption(idx);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    // עדכון ציון אם התשובה נכונה
    if (selectedOption === currentQuestion.correct) {
      setScore(prev => prev + 1);
    }

    setSelectedOption(null);

    // מעבר לשאלה הבאה או סיום המבחן
    if (currentIndex < TestData.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowScore(true); // כאן מציגים את הציון
    }
  };

  // קריאה ל-onFinishTest בסיום המבחן
  useEffect(() => {
    if (showScore && onFinishTest) {
      onFinishTest(); // מפעיל את הניווט ב-App.js
    }
  }, [showScore, onFinishTest]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowScore(false);
  };

  if (showScore) {
    return (
      <div className="Test-fullscreen intro-screen">
        <h2>סיימתם את המבחן 🎉</h2>
        <p>הציון שלך: {score} / {TestData.length}</p>
        <button className="start-Test-button" onClick={handleRestart}>
          התחל שוב
        </button>
        <NavigationButtons showNext={false} allowNext={true} TestStarted={true} />
      </div>
    );
  }

  return (
    <div className="Test-fullscreen intro-screen">
      <div className="Test-intro-text">
        <h2>שאלה {currentIndex + 1} מתוך {TestData.length}</h2>
        <p>{currentQuestion.question}</p>
      </div>

      <div className="Test-selection-grid">
        {currentQuestion.options.map((opt, idx) => (
          <div
            key={idx}
            className={`Test-card ${selectedOption === idx ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(idx)}
          >
            {opt}
          </div>
        ))}
      </div>

      <button
        className="start-Test-button"
        onClick={handleNext}
        disabled={selectedOption === null}
      >
        {currentIndex < TestData.length - 1 ? 'המשך' : 'סיים'}
      </button>

      <NavigationButtons
        showNext={!showScore}
        allowNext={true}
        TestStarted={true}
      />
    </div>
  );
};

export default Test;
