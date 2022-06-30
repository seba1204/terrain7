import React from 'react';


import './Pane.css';

const Pane = (props) => {

    return (
        <div className='Pane'>
            <div className='Pane-header'>
                <div className='Pane-icon'>{props.icon}</div>
                <div className='Pane-title'>{props.title}</div>
            </div>
            <div className='Pane-content'>
                {props.children}
            </div>
        </div>
    );
};

export default Pane;