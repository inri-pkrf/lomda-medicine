import React, { useEffect, useState } from 'react';
import questionsDataTwo from '../Data/QuestionsData/QuestionsDataTwo';
import questionsDataThree from '../Data/QuestionsData/QuestionsDataThree';
import questionsDataFour from '../Data/QuestionsData/QuestionsDataFour';
import '../genericComponent/styles/Questions.css';


const getRandomItems = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};


const pastelColors = ['#ffe5ec', '#e0f7fa', '#fff3cd']; // ורוד פסטל, תכלת פסטל, צהוב פסטל


const Questions = ({ chapter }) => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);


  useEffect(() => {
    let data = [];


    switch (chapter?.toUpperCase()) {
      case 'TWO':
        // dataTwo הוא אובייקט – צריך לאסוף 2 שאלות מכל מפתח (כלומר מכל קטגוריה)
        Object.values(questionsDataTwo).forEach((category) => {
          data.push(...getRandomItems(category, 2));
        });
        break;


      case 'THREE':
        data = getRandomItems(questionsDataThree, 3);
        break;


      case 'FOUR':
        data = getRandomItems(questionsDataFour, 3);
        break;


      default:
        data = [];
    }


    setSelectedQuestions(data);
  }, [chapter]);


  return (
    <div className="Questions">
      {selectedQuestions.map((question, index) => (
        <div
          className="question-card"
          key={question.id || index}
          style={{
            top: `${index * 10}px`,
            zIndex: 3 - index,
            backgroundColor: pastelColors[index % pastelColors.length],
          }}
        >
          <p>{question.question}</p>
        </div>
      ))}
    </div>
  );
};


export default Questions;



