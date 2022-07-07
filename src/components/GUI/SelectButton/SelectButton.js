import React from 'react';

import PictureButton from '../PictureButton';


import './SelectButton.css';

const SelectButton = ({ key, image, enabled, onClick }) => (
    <PictureButton
        image={image}
        title={key}
        enabled={enabled}
        onClick={() => onClick(key)}
    />
);

export default SelectButton;