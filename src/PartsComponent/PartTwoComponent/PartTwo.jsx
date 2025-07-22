import React, { useState, useEffect } from 'react';
import Explanations from '../../genericComponent/Explanations';
import { useLocation } from 'react-router-dom';
import TvMahoz from '../PartTwoComponent/TvMahoz';
import TvNafa from '../PartTwoComponent/TvNafa';
import '../PartTwoComponent/styles/PartTwo.css';

const PartTwo = ({ setHideNavBar }) => {
  const location = useLocation();
  const reviewMode = location.state?.reviewMode || false; // מצב סקירה, אם קיים
  const chapterName = "PartTwo";

  // בדיקת מצב התחלת הפרק ושיוך להשלמתו מה-sessionStorage
  const started = sessionStorage.getItem("partTwoStarted") === "true";
  const finished = sessionStorage.getItem("partTwoFinished") === "true";
  const endShown = sessionStorage.getItem("partTwoEndShown") === "true";

  // מצב להצגת ההסברים (start, end, או null - לא להציג)
  const [explanationStage, setExplanationStage] = useState(() => {
    // אם סיימנו והסיום כבר הוצג - לא להציג שוב
    if (finished && endShown) return null;

    // אם לא התחלת את הפרק - להציג את הפתיחה
    if (!started) return "start";

    // אחרת לא להציג הסבר כרגע
    return null;
  });

  // איזה רכיב פעיל: none, 'mahoz' או 'nafa'
  const [activeComponent, setActiveComponent] = useState("none");

  // האם מחוז ו/או נפה הושלמו
  const [mahozCompleted, setMahozCompleted] = useState(() => {
    return sessionStorage.getItem("mahozCompleted") === "true";
  });
  const [nafaCompleted, setNafaCompleted] = useState(() => {
    return sessionStorage.getItem("nafaCompleted") === "true";
  });

  // כשפותחים רכיב פעיל והפרק לא התחיל, מסמנים התחלה ומסתירים את הפתיחה
  useEffect(() => {
    if (activeComponent !== "none" && !started) {
      sessionStorage.setItem("partTwoStarted", "true");
      setExplanationStage(null);
    }
  }, [activeComponent, started]);

  // סינכרון השלמת מחוז ונפה ל-sessionStorage
  useEffect(() => {
    sessionStorage.setItem("mahozCompleted", mahozCompleted);
    sessionStorage.setItem("nafaCompleted", nafaCompleted);
  }, [mahozCompleted, nafaCompleted]);

  // אם שני הרכיבים הושלמו והסיום לא הוצג עדיין, מראה הסבר סיום אחרי דיליי של שנייה
  useEffect(() => {
    if (mahozCompleted && nafaCompleted && !endShown) {
      const timer = setTimeout(() => {
        sessionStorage.setItem("partTwoFinished", "true");
        sessionStorage.setItem("partTwoEndShown", "true");
        setExplanationStage("end");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [mahozCompleted, nafaCompleted, endShown]);

  // אם התקבלה פונקציית setHideNavBar, מסתירים את ה-navbar כשעוברים למסך מחוז או נפה
  useEffect(() => {
    if (!setHideNavBar) return;
    setHideNavBar(activeComponent === "mahoz" || activeComponent === "nafa");
  }, [activeComponent, setHideNavBar]);

  // סגירת ההסבר
  const closeExplanation = () => {
    setExplanationStage(null);
  };

  return (
    <div className="PartTwo">

      {/* הצגת הסברים פתיחה או סיום */}
      {explanationStage && (
        <Explanations
          chapterName={chapterName}
          position={explanationStage} // "start" או "end"
          onClose={closeExplanation}
        />
      )}

      {/* אם אין הסבר פתוח והרכיב לא פעיל, להציג תמונת טומר חושב */}
      {!explanationStage && activeComponent === "none" && (
        <img
          className="tomerThinkingPartTwo"
          src={`${process.env.PUBLIC_URL}/Assets/PartTwoImgs/TomerThinking.png`}
          alt="טומר חושב"
        />
      )}

      {/* כפתור נפה עם מחלקת CSS דינמית להשלמה */}
      <div
        className={`nafaTvBtn ${nafaCompleted ? 'completed-nafa' : ''}`}
        onClick={() => setActiveComponent("nafa")}
      >
        נפה
      </div>

      {/* כפתור מחוז עם מחלקת CSS דינמית להשלמה */}
      <div
        className={`mahozTvBtn ${mahozCompleted ? 'completed-mahoz' : ''}`}
        onClick={() => setActiveComponent("mahoz")}
      >
        מחוז
      </div>

      {/* הצגת רכיב נפה כשהוא פעיל */}
      {activeComponent === "nafa" && (
        <TvNafa
          onFinish={() => {
            setNafaCompleted(true);
            setActiveComponent("none");
          }}
        />
      )}

      {/* הצגת רכיב מחוז כשהוא פעיל */}
      {activeComponent === "mahoz" && (
        <TvMahoz
          onFinish={() => {
            setMahozCompleted(true);
            setActiveComponent("none");
          }}
        />
      )}
    </div>
  );
};

export default PartTwo;
