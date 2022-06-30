import React, { useState } from 'react';
import RSlider from 'react-input-slider';

import './Slider.css';

const Slider = ({ name, onChange, defaultValue }) => {
    const [state, setState] = useState({ x: defaultValue ? defaultValue : 10 });

    const handleChange = ({ x }) => {
        setState({ x });
        onChange(x);
    };

    return (
        <div className='Silder'>
            <div className='Slider-name'>{name + " :"}</div>
            <RSlider
                axis="x"
                x={state.x}
                onChange={handleChange}
                styles={{
                    active: {
                        backgroundColor: '#8e44ad'
                    }
                }}
            />
        </div>
    );
};

export default Slider;