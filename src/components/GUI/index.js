import React, { useState } from 'react';
import * as Icon from 'react-feather';

import Pane from './Pane';
import PictureButton from './PictureButton';
import Slider from './Slider';

import './GUI.css';

const GUI = () => {
    const [state, setState] = useState({
        currentTool: 0
    });
    const enableSculpt = () => {
        setState({ currentTool: 0 });
    };
    const enableTexture = () => {
        setState({ currentTool: 1 });
    };
    const enableMove = () => {
        setState({ currentTool: 2 });
    };

    return (
        <div className='gui'>

            <Pane icon={<Icon.Tool />} title="Outils" >
                <div className="tools">
                    <PictureButton
                        image={<Icon.Edit2 />}
                        onClick={enableSculpt}
                        enabled={state.currentTool === 0} />
                    <PictureButton
                        image={<Icon.Layers />}
                        onClick={enableTexture}
                        enabled={state.currentTool === 1} />
                    <PictureButton
                        image={<Icon.Move />}
                        onClick={enableMove}
                        enabled={state.currentTool === 2} />
                </div>
            </Pane>

            <Pane icon={<Icon.Edit2 />} title="Sculpter">
                <Slider name="Taille" />
                <Slider name="Intensité" />
            </Pane>
            <Pane icon={<Icon.Layers />} title="Texturer">
                <Slider name="Taille" />
                <Slider name="Intensité" />
            </Pane>
        </div>
    );
};

export default GUI;