import React from 'react';
import '../styles/Note2.css';

const Note2 = ({ onClose }) => {
  return (
    <div className="Note2">
      <img
        src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note2/tape2.png`}
        alt="tape2"
        className='tapes tape2'
      />
      <div className='title-notes'>
        סד"כ פקע"ר
      </div>

      <div className='imgsNote2-container'>

        <div className="note2-item">
          <div className='note2-title'>מפקדת הפיקוד</div>
          <img
            src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note2/Hapak.jpg`}
            alt="mifkadot"
            className="note2-img" 
          />
        </div>

        <div className="note2-item">
          <div className='note2-title'>5 מחוזות</div>
          <img
            src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note2/Mahozot.png`}
            alt="mifkadot"
            className="note2-img"
          />
        </div>

        <div className="note2-item">
          <div className='note2-title'>20 נפות</div>
          <img
            src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note2/Nafot.png`}
            alt="mifkadot"
            className="note2-img"
          />
        </div>

        <div className="note2-item">
          <div className='note2-title'>חטיבת החילוץ וההדרכה</div>
          <img
            src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note2/Hativa.jpg`}
            alt="mifkadot"
            className="note2-img"
          />
        </div>

        <div className="note2-item">
          <div className='note2-title'>3 מפקדות משימתיות</div>
          <img
            src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note2/mifkadot.png`}
            alt="mifkadot"
            className="note2-img"
          />
        </div>

        <div className="note2-item">
          <div className='note2-title'>258 יקל"רים</div>
          <img
            src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note2/Yaklar.png`}
            alt="mifkadot"
            className="note2-img"
          />
        </div>

      </div>


      <div className="buttons-bar-note2">
        <div className="btn-text btn-text-end" onClick={onClose}>
          <div className="img-arrow img-arrow-end" />
          <div className="text-label">סיום</div>
        </div>
      </div>

    </div >
  );
};

export default Note2;
