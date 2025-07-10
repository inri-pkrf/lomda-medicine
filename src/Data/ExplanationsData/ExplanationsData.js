const explanationsData = {
    PartOne: {
     TomerImg:`${process.env.PUBLIC_URL}/Assets/PartOneImgs/ThomerPointingHalf.png`,
      start: {
        text: <><b> "הקריאה מהחמ"ל"</b> <br/>
        קראו לי מהחמ"ל לבוא לעזור . <br/>אבל אני לא מכיר את כולם בפיקוד, ולא  יודע מה הסדכ שלי?"- יש פה כמה פתקים על הלוח שיוכלו לסייע
        </>
      },
      end: {
        text: <> הגענו לסיום הפרק</>,
        nextPart:"/part-two"
      }
    },
    PartTwo: {
     TomerImg:`${process.env.PUBLIC_URL}/Assets/PartTwoImgs/Mahoz/ThomerThinkingHalf.png`,
      start: {
        text: <>   <b>"הבנת השטח"</b> 
        הגעתי לחמ"ל לנסות להבין מי נגד מי<br/> אבל משום מה רק 2 מסכים עובדים כדאי שנבדוק את אלו שלא עובדים
 </>
      },
      end: {
         text: <> הגענו לסיום הפרק</>,
        nextPart:"/part-Three"
      }
    },
    PartThree: {
    TomerImg:`${process.env.PUBLIC_URL}/Assets/PartThreeImgs/Mahoz/ThomerShockedHalf.png`,

      start: {
        text: <><b>"את מי אני מלחץ ? למי אני מדווח?"</b>
        ד"ר תומר מקבל מידע מהשטח וצריך להעביר אותו הלאה.<br/>
         הלומדה מציגה לו את הפלר"ג, שיטת הרפואה ושיטת הידווח בצורה אינרקטיבית.<br/>
        מצא את החפצים הקבורים בהריסות-<br/>
        1.  מכשיר הקשר- לשיטת הדיווח<br/>
        2.  ווסט חילוץ- לפלר"ג<br/>
        3.  וערכת עזרה ראשונה- לשיטת הרפואה
        </>
      },
      end: {
         text: <> הגענו לסיום הפרק</>,
        nextPart:"/part-Four"
      }
    },
    PartFour: {
    TomerImg:"${process.env.PUBLIC_URL}/Assets/PartThreeImgs/Mahoz/ThomerShockedHalf.png",

      start: {
        text: <><b>"אני לא לבד"</b>
        האירוע מתפתח, ולפתע יש בעיה בלוגיסטיקה או צורך בתחבורה. ד"ר תומר צריך לפנות למכלול אחר.
         החניכים צריכים לבחור למי פונים ומה המכלול נותן לרפואה ומה הרפואה נותנת למכלול.
         מתקבל משוב על הבחירה (“פנייה ישירה למכלול תחבורה לא מקובלת – צריך לעבור דרך מכלול תיאום”).
        </>
      },
      end: {
         text: <> הגענו לסיום הפרק</>,
        nextPart:"/simulation"
      }
    }
  };
  
  export default explanationsData;
  