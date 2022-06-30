import PropTypes from 'prop-types';
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
PictureButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  enabled: PropTypes.bool.optional,
  image: PropTypes.object.isRequired
};

export default PictureButton;
