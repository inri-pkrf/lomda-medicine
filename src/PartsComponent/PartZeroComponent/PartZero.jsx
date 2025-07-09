import React, { useEffect, useState } from 'react';
import '../PartZeroComponent/PartZero.css'

const PartZero = () => {

    return (
        <div id="PartZero">
            <img src={`${process.env.PUBLIC_URL}/Assets/PartZeroImgs/Ambulance.png`} alt="Ambulance" className="ambulance-zero" />
            <div className='divText-Ambulance'>
            </div>
        </div>
    );
};

export default PartZero;
