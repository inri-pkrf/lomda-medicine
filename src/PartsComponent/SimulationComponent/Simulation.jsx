import React, { useState, useEffect, useRef } from 'react';
import simulationData from '../../Data/simulationData';
import './Simulation.css';

const Simulation = ({ onFinishSimulation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);

  // ⛔️ מסנן את הודעת ה"התחלה"
  const filteredMessages = simulationData.messages.filter(msg => msg.type !== "התחלה");
  const messagesToShow = filteredMessages.slice(0, currentIndex + 1);
  const nextMessage = filteredMessages[currentIndex + 1];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentIndex]);

  const getNextButtonText = () => {
    if (!nextMessage) return "סיום";
    switch (nextMessage.type) {
      case "תיאור": return "לחצו לקריאת התיאור";
      case "שאלה": return "לחצו לקריאת השאלה";
      case "תשובה": return "לחצו לצפייה בתשובה";
      case "סיום": return "למידה ולקחים";
      default: return "המשך";
    }
  };

  const handleNext = () => {
    if (!nextMessage) {
      setTimeout(() => {
        onFinishSimulation?.();
      }, 1000);
      return;
    }
    setCurrentIndex(currentIndex + 1);
  };

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

    </div>
  );
};


export default Simulation;


