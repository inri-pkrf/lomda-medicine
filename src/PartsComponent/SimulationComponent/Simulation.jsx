import React from 'react';

const Simulation = ({ onFinishSimulation }) => {
  return (
    <div className="Simulation">
      <h2>הסימולציה</h2>
      <p>כאן יגיע תוכן הסימולציה שלך...</p>
      <button onClick={onFinishSimulation}>סיים סימולציה</button>
    </div>
  );
};

export default Simulation;