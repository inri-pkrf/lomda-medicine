import React from 'react';
import '../styles/Note4.css';

const Note4 = ({onClose}) => {
  return (
    <div className="Note4">
      <img
        src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note4/tape4.png`}
        alt="tape4"
        className='tapes'
        id='tape4-one'
      />
      <img
        src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note4/tape4.png`}
        alt="tape4"
        className='tapes'
        id='tape4-two'
      />

      <div className='title-notes'>
        התפיסה המבצעית
      </div>

      <img
        src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note4/Mivzait.png`}
        alt="Mivzait"
        className='Mivzait'
      />

       <div className="buttons-bar-note4">
        <div className="btn-text btn-text-end" onClick={onClose}>
          <div className="img-arrow img-arrow-end" />
          <div className="text-label">סיום</div>
        </div>
      </div>

    </div>
  );
};

export default Note4;
