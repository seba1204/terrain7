import React from "react";
import * as Icon from "react-feather";
import { textureColors } from "./colors";

const textureName = {
    sand: "Sable",
    grass: "Herbe",
    rock: "Pierre",
    snow: "Neige",
    water: "Eau"
};

const texture = [
    { name: textureName.sand, icon: <Icon.Layers />, color: textureColors.sand },
    { name: textureName.grass, icon: <Icon.Loader />, color: textureColors.grass },
    { name: textureName.rock, icon: <Icon.Grid />, color: textureColors.rock },
    { name: textureName.snow, icon: <Icon.CloudSnow />, color: textureColors.snow },
    { name: textureName.water, icon: <Icon.Droplet />, color: textureColors.water }

];


export default texture;
export { textureName };
