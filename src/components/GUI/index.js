import React from 'react';
import * as Icon from 'react-feather';

import CheckBox from './CheckBox';
import Pane from './Pane';
import PictureButton from './PictureButton';
import Slider from './Slider';

import './GUI.css';

const GUI = ({ onBrushSizeChange, onBrushIntensityChange, onTerrainChange, onWireFrame, wireFrame, onCurrentToolChange, currentTool }) => {


    return (
        <div className='gui'>

            <Pane icon={<Icon.Tool />} title="Outils" >
                <div className="tools">
                    <PictureButton
                        image={<Icon.Edit2 />}
                        onClick={() => onCurrentToolChange(0)}
                        enabled={currentTool === 0} />
                    <PictureButton
                        image={<Icon.Layers />}
                        onClick={() => onCurrentToolChange(1)}
                        enabled={currentTool === 1} />
                    <PictureButton
                        image={<Icon.Move />}
                        onClick={() => onCurrentToolChange(2)}
                        enabled={currentTool === 2} />
                </div>
            </Pane>

            <Pane icon={<Icon.Edit2 />} title="Sculpter">
                <Slider name="Taille" onChange={onBrushSizeChange} />
                <Slider name="Intensité" onChange={onBrushIntensityChange} defaultValue={20} />
            </Pane>
            <Pane icon={<Icon.Layers />} title="Texturer">
                <Slider name="Taille" />
                <Slider name="Intensité" />
            </Pane>
            <Pane icon={<Icon.Settings />} title="Paramètres" >
                <Slider name="Taille" onChange={onTerrainChange} />
                <CheckBox name="Wireframe" onChange={onWireFrame} checked={wireFrame} />
            </Pane>
        </div>
    );
};

export default GUI;