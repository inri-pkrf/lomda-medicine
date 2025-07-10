import React from 'react';
import '../styles/Note1.css';


const Note1 = () => {
    return (
        <div className="Note1">
            <img
                src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note1/tape1.png`}
                alt="tape1"
                className='tapes tape1'
            />
        </div>
    );
};

export default Note1;
