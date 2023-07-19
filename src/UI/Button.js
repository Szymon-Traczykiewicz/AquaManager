import React from 'react';
import '../App.css';

const Button = ({ labelOn, labelOff, status, onClick }) => {
    const buttonLabel = status ? labelOff : labelOn;

    const handleClick = () => {
        onClick(!status);
    };

    return (
        <div className={`button ${status ? 'active' : ''}`} onClick={handleClick}>
            <span 
            style={{ color: status? '#fff' : '#414141' }}
            className='TxtSingleButton'>{buttonLabel}</span>
        </div>
    );
};

export default Button;