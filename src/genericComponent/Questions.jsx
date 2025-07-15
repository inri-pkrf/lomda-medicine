import React, { useEffect, useState } from 'react';
import { useNavigate,useParams  } from 'react-router-dom'; 
import questionsDataTwo from '../Data/QuestionsData/QuestionsDataTwo';
import questionsDataThree from '../Data/QuestionsData/QuestionsDataThree';
import questionsDataFour from '../Data/QuestionsData/QuestionsDataFour';
import QuestionCard from './QuestionCard';
import '../genericComponent/styles/Questions.css';

const STORAGE_KEY = 'questionsAppData';

const getRandomItems = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const pastelColors = ['#fce5cd', '#cce0d6', '#f4cccc', 'rgb(223 204 239)'];

const Questions = () => {
  const navigate = useNavigate(); 
  const { chapter } = useParams();

  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersCorrectMap, setAnswersCorrectMap] = useState({});
  const [answersMap, setAnswersMap] = useState({});
  const [showCorrectAnswerMap, setShowCorrectAnswerMap] = useState({});

  useEffect(() => {
    const savedDataJSON = sessionStorage.getItem(STORAGE_KEY);
    if (savedDataJSON) {
      try {
        const savedData = JSON.parse(savedDataJSON);
        if (savedData.chapter === chapter) {
          setSelectedQuestions(savedData.selectedQuestions || []);
          setAnswersCorrectMap(savedData.answersCorrectMap || {});
          setAnswersMap(savedData.answersMap || {});
          setShowCorrectAnswerMap(savedData.showCorrectAnswerMap || {});
          setCurrentIndex(savedData.currentIndex || 0);
          return;
        }
      } catch (e) {
        console.error('Error parsing sessionStorage data', e);
      }
    }

    let data = [];
    if (chapter?.toUpperCase() === 'TWO') {
      questionsDataTwo.forEach((category) => {
        const selected = getRandomItems(category, 2);
        data.push(...selected);
      });
    } else if (chapter?.toUpperCase() === 'THREE') {
      data = getRandomItems(questionsDataThree, 3);
    } else if (chapter?.toUpperCase() === 'FOUR') {
      data = getRandomItems(questionsDataFour, 3);
    }
    setSelectedQuestions(data);
    setCurrentIndex(0);
    setAnswersCorrectMap({});
    setAnswersMap({});
    setShowCorrectAnswerMap({});
  }, [chapter]);

  useEffect(() => {
    if (selectedQuestions.length === 0) return;
    const dataToSave = {
      chapter,
      selectedQuestions,
      currentIndex,
      answersCorrectMap,
      answersMap,
      showCorrectAnswerMap,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [chapter, selectedQuestions, currentIndex, answersCorrectMap, answersMap, showCorrectAnswerMap]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < selectedQuestions.length - 1 ? prev + 1 : prev));
  };

  const handleBack = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleAnswerSelect = (answer) => {
    setAnswersMap((prev) => ({
      ...prev,
      [currentIndex]: answer,
    }));

    const isCorrect = answer === selectedQuestions[currentIndex].correct_answer;
    setAnswersCorrectMap((prev) => ({
      ...prev,
      [currentIndex]: isCorrect,
    }));
  };

  const handleShowCorrectAnswer = () => {
    setShowCorrectAnswerMap((prev) => ({
      ...prev,
      [currentIndex]: true,
    }));
  };

  // ✅ מחזיר את הנתיב הבא לפי הפרק
  const getNextPath = () => {
    switch (chapter?.toUpperCase()) {
      case 'TWO':
        return '/part-three';
      case 'THREE':
        return '/part-four';
      case 'FOUR':
        return '/test';
      default:
        return '/';
    }
  };

  return (
    <div className="Questions">
      <div
        className="carousel-stack-container"
        style={{ position: 'relative', width: '100%', height: '500px', overflowX: 'visible' }}
      >
        <div className="carousel-stack" style={{ position: 'relative', width: '100%', height: '100%' }}>
          {selectedQuestions.map((question, index) => {
            let offset = index - currentIndex;
            if (offset < 0) {
              offset += selectedQuestions.length;
            }
            const getTranslateX = (offset, baseSpacing) => offset * baseSpacing;
            const translateX = getTranslateX(offset, 40);
            const scale = offset === 0 ? 1 : 1;
            const zIndex = 100 - offset;

            return (
              <div
                key={question.id || index}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(calc(-50% + ${translateX}px), -50%) scale(${scale})`,
                  zIndex,
                  transition: 'transform 0.4s ease, opacity 0.4s ease',
                  cursor: offset === 0 ? 'auto' : 'pointer',
                  borderRadius: '8px',
                }}
                onClick={() => {
                  if (offset !== 0) {
                    setCurrentIndex(index);
                  }
                }}
              >
                <QuestionCard
                  question={question}
                  isActive={offset === 0}
                  backgroundColor={pastelColors[index % pastelColors.length]}
                  questionNumber={currentIndex + 1}
                  totalQuestions={selectedQuestions.length}
                  selectedAnswer={answersMap[currentIndex] || null}
                  onAnswerSelect={offset === 0 ? handleAnswerSelect : undefined}
                  showCorrectAnswer={showCorrectAnswerMap[currentIndex] || false}
                  onShowCorrectAnswer={offset === 0 ? handleShowCorrectAnswer : undefined}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="btn-text btn-text-prev">
        {selectedQuestions.length > 0 && currentIndex > 0 && (
          <div onClick={handleBack} style={{ cursor: 'pointer' }}>
            <div className="img-arrow img-arrow-prev" />
            <div className="text-label">שאלה קודמת</div>
          </div>
        )}
      </div>

      <div className="btn-text btn-text-next">
        {selectedQuestions.length > 0 &&
          currentIndex < selectedQuestions.length - 1 &&
          answersCorrectMap[currentIndex] && (
            <div onClick={handleNext} style={{ cursor: 'pointer' }}>
              <div className="img-arrow img-arrow-next" />
              <div className="text-label">שאלה הבאה</div>
            </div>
          )}
      </div>

      <div className="btn-text btn-text-end">
        {selectedQuestions.length > 0 &&
          currentIndex === selectedQuestions.length - 1 &&
          answersCorrectMap[currentIndex] && (
            <div onClick={() => navigate(getNextPath())} style={{ cursor: 'pointer' }}>
              <div className="img-arrow img-arrow-next" />
              <div className="text-label">לפרק סיום</div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Questions;
