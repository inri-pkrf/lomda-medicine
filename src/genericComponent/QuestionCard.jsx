import React, { useEffect, useState } from 'react';
import '../genericComponent/styles/QuestionCard.css';

const QuestionCard = ({
  question,
  isActive,
  backgroundColor,
  zIndex,
  questionNumber,
  totalQuestions,
  selectedAnswer: selectedAnswerProp = null,
  onAnswerSelect,
  showCorrectAnswerProp = false,      // מקבל את מצב הצגת התשובה הנכונה מהאב
  onShowCorrectAnswer,                // callback לשינוי המצב אצל האב
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(selectedAnswerProp);
  const [showResult, setShowResult] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(showCorrectAnswerProp);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    setSelectedAnswer(selectedAnswerProp);
    setShowResult(!!selectedAnswerProp);
    setShowCorrectAnswer(showCorrectAnswerProp);
    setIsLocked(selectedAnswerProp === question.correct_answer);
  }, [question, selectedAnswerProp, showCorrectAnswerProp]);

  const handleAnswerClick = (answer) => {
    if (isLocked) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    if (onAnswerSelect) onAnswerSelect(answer);

    if (answer === question.correct_answer) {
      setIsLocked(true);
    }
  };

  const handleShowCorrectAnswerClick = () => {
    setShowCorrectAnswer(true);
    if (onShowCorrectAnswer) onShowCorrectAnswer(true); // מעדכן אצל האב את מצב הצגת התשובה הנכונה
    if (onAnswerSelect) onAnswerSelect(question.correct_answer);
  };

  return (
    <div
      className={`question-card ${isActive ? 'active' : ''}`}
      style={{ backgroundColor, zIndex }}
    >
      <div className="question-counter">
         {questionNumber}/{totalQuestions}
      </div>

      <p className="question-name">{question.question}</p>

      {question.type === 'multiple_choice' && question.answers?.length > 0 && (
        <>
          <div className="answers-grid">
            {question.answers.map((answer, idx) => (
              <button
                key={idx}
                className={`answer-button ${
                  selectedAnswer === answer
                    ? answer === question.correct_answer
                      ? 'correct'
                      : 'incorrect'
                    : ''
                }`}
                onClick={() => handleAnswerClick(answer)}
                disabled={isLocked}
              >
                {answer}
              </button>
            ))}
          </div>

          {showResult && (
            <div className="result-message">
              {selectedAnswer === question.correct_answer ? (
                <span className="correct-text">כל הכבוד!</span>
              ) : (
                <span className="incorrect-text">לא נורא, נסו שוב</span>
              )}
            </div>
          )}
        </>
      )}

      {question.type === 'open' && (
        <>
          {!showCorrectAnswer && (
            <button className="show-right-btn" onClick={handleShowCorrectAnswerClick}>
              הצגת תשובה נכונה
            </button>
          )}
          {showCorrectAnswer && (
            <div className="correct-answer">
              תשובה נכונה:<br /> {question.correct_answer}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuestionCard;
