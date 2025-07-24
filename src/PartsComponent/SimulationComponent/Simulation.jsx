import React, { useState, useEffect, useRef } from 'react';
import simulationData from '../../Data/simulationData';
import './Simulation.css';
import NavigationButtons from '../../genericComponent/NavigationButtons';

const Simulation = ({ onFinishSimulation }) => {
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);

  // האם המשתמש התחיל אי פעם? (נשמר בסשן)
  const [simulationStarted, setSimulationStarted] = useState(() => {
    return sessionStorage.getItem('simulationStarted') === 'true';
  });

  // האם להציג את מסך הפתיחה
  const [showIntroScreen, setShowIntroScreen] = useState(() => {
    return !simulationStarted;
  });

  // התקדמות בהודעות
  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = sessionStorage.getItem('simulationIndex');
    return saved ? parseInt(saved, 10) : 0;
  });

  const getNextButtonText = () => {
    if (!nextMessage) return "סיום";
    switch (nextMessage.type) {
      case "תיאור":
        return "לחצו להמשך הסימולציה";
      case "שאלה":
        return "לחצו לקריאת השאלה";
      case "תשובה":
        return "לחצו לצפייה בתשובה";
      case "סיום":
        return "למידה ולקחים";
      default:
        return "המשך";
    }
  };

  const filteredMessages = simulationData.messages.filter(msg => msg.type !== "התחלה");
  const messagesToShow = filteredMessages.slice(0, currentIndex + 1);
  const nextMessage = filteredMessages[currentIndex + 1];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentIndex]);

  useEffect(() => {
    if (simulationStarted) {
      sessionStorage.setItem('simulationIndex', currentIndex.toString());
    }
  }, [currentIndex, simulationStarted]);

  const handleStartScreenContinue = () => {
    // רק מסתיר את מסך הפתיחה – לא שומר התחלה
    setShowIntroScreen(false);
  };

  const handleNext = () => {
    // כאן קובעים שהסימולציה באמת התחילה
    if (!simulationStarted) {
      sessionStorage.setItem('simulationStarted', 'true');
      setSimulationStarted(true);
    }

    if (!nextMessage) {
      setTimeout(() => {
        onFinishSimulation?.();
      }, 1000);
      return;
    }

    setCurrentIndex(prev => prev + 1);
  };

  // 🟡 שלב הפתיחה (אם לא התחיל עדיין)
  if (showIntroScreen) {
    return (
      <div className="simulation-fullscreen intro-screen">
        <div className="simulation-intro-text">
          <h2>סיימתם את שלבי הלמידה 🎉</h2>
          <p>
            כעת תעברו לסימולציה מסכמת הכוללת תרחיש חירום רפואי.<br />
            קראו כל שלב ולחצו על כפתור ההמשך כדי להתקדם.
          </p>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/Assets/Simulation/TomerSImulation.png`}
          alt="Tomer"
          className='TomerPhone-sim'
        />
        <button className="start-simulation-button" onClick={handleStartScreenContinue}>
          התחלת הסימולציה
        </button>
        <NavigationButtons showNext={false} />
      </div>
    );
  }

  // 🟢 הסימולציה עצמה
  return (
    <div className="simulation-fullscreen">
      <div className="simulation-title">{simulationData.name}</div>

      <div className="chat-window" ref={chatRef}>
        {messagesToShow.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.side === 1 ? 'right' : 'left'} fade-in`}
          >
            <div className="chat-bubble">
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-footer">
        {!nextMessage ? (
          <button className="next-button" onClick={onFinishSimulation}>
            סיים סימולציה
          </button>
        ) : (
          <button className="next-button" onClick={handleNext}>
            {getNextButtonText()}
          </button>
        )}
      </div>

      <NavigationButtons showNext={false} />
    </div>
  );
};

export default Simulation;
