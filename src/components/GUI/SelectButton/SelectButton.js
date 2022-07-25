import React from 'react';

import PictureButton from '../PictureButton';


import './SelectButton.css';

const SelectButton = ({ keyName, image, enabled, onClick }) => (
    <PictureButton
        image={image}
        title={keyName}
        enabled={enabled}
        onClick={() => onClick(keyName)}
    />
);

export default SelectButton;