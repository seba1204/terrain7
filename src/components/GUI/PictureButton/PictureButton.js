import React from 'react';

import './PictureButton.css';

const PictureButton = (props) => {
  return (
    <div className="PictureButton">
      <button className={`button ${props.enabled && 'enabled'}`} onClick={props.onClick}>
        {props.image}
      </button>
    </div >
  );
};

export default PictureButton;
