import React, { useState } from 'react';

import './CheckBox.css';

const CheckBox = ({ name, onChange, checked }) => {
    const [state, setState] = useState({ x: checked });

    const handleChange = ({ target }) => {
        setState({ x: target.checked });
        onChange(target.checked);
    };

    return (
        <div className='CheckBox'>
            <div className='CheckBox-name'>{name + " :"}</div>
            <input
                type="checkbox"
                checked={state.x}
                onChange={handleChange}
                className='CheckBox-checkbox'
            />
        </div>
    );
};

export default CheckBox;