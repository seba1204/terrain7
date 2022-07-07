import React from 'react';
import * as Icon from 'react-feather';

import CheckBox from './CheckBox';
import Pane from './Pane';
import SelectButton from './SelectButton';
import Slider from './Slider';

import tools from '../../constants/tools';

import './GUI.css';

const GUI = (props) => {
    const { onSettingChange, ...settings } = props;

    const displayTools = () => tools.map(({ name, icon }) => (
        <SelectButton
            key={name}
            image={icon}
            enabled={settings.currentTool === name}
            onClick={() => onSettingChange({ currentTool: name })}
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
                    {displayTools()}
                </div>
            </Pane>

            <Pane icon={<Icon.Edit2 />} title="Sculpter">
                {SilderP("Taille", "sculptSize")}
                {SilderP("Intensité", "sculptIntensity")}
            </Pane>
            <Pane icon={<Icon.Layers />} title="Texturer">
                {SilderP("Taille", "textureSize")}
                {SilderP("Intensité", "textureIntensity")}
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