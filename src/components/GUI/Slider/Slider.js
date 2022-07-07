import React from 'react';
import RSlider from 'react-input-slider';

import './Slider.css';

const Slider = ({ name, onChange, value }) => {

    return (
        <div className='Silder'>
            <div className='Slider-name'>{name + " :"}</div>
            <RSlider
                axis="x"
                x={value}
                onChange={({ x }) => onChange(x)}
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