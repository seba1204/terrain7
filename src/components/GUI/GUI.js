import React from 'react';
import * as Icon from 'react-feather';


import CheckBox from './CheckBox';
import Pane from './Pane';
import SelectButton from './SelectButton';
import Slider from './Slider';

import sculptures from '../../constants/sculptures';
import tools from '../../constants/tools';
import textures from './../../constants/textures';

import './GUI.css';

const GUI = (props) => {
    const { onSettingChange, ...settings } = props;
    const displaySelector = (array, selectorName) => array.map(({ name, icon }) => (
        <SelectButton
            key={name}
            keyName={name}
            image={icon}
            enabled={settings[selectorName] === name}
            onClick={() => onSettingChange({ [selectorName]: name })}
        />
    ));

    const CheckBoxP = (name, settingName) => (
        <CheckBox onChange={v => onSettingChange({ [settingName]: v })} value={settings[settingName]} name={name} />
    );

    const SilderP = (name, settingName) => (
        <Slider onChange={v => onSettingChange({ [settingName]: v })} value={settings[settingName]} name={name} />
    );

    return (
        <div className='gui'>

            <Pane icon={<Icon.Tool />} title="Outils" >
                <div className="tools">
                    {displaySelector(tools, "currentTool")}
                </div>
            </Pane>

            <Pane icon={<Icon.Edit2 />} title="Sculpter">
                {SilderP("Taille", "sculptSize")}
                {SilderP("Intensité", "sculptIntensity")}
                <div className="tools">
                    {displaySelector(sculptures, "currentSculpture")}
                </div>
            </Pane>
            <Pane icon={<Icon.Layers />} title="Texturer">
                {SilderP("Taille", "textureSize")}
                <div className="tools">
                    {displaySelector(textures, "currentTexture")}
                </div>

            </Pane>
            <Pane icon={<Icon.Settings />} title="Paramètres" >
                {SilderP("Taille", "terrainSize")}
                {CheckBoxP("Wireframe", "wireFrame")}
                {CheckBoxP("Stats", "showStats")}
            </Pane>
        </div>
    );
};

export default GUI;