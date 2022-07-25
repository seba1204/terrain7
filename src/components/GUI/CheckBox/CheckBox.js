import React from 'react';

import './CheckBox.css';

const CheckBox = ({ name, onChange, value }) => {

    return (
        <div className='CheckBox'>
            <div className='CheckBox-name'>{name + " :"}</div>
            <input
                type="checkbox"
                checked={value}
                onChange={({ target }) => onChange(target.checked)}
                className='CheckBox-checkbox'
            />
        </div>
    );
};

export default CheckBox;