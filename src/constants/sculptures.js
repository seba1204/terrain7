import React from "react";
import * as Icon from "react-feather";

const sculptureName = {
    capacitor: "Condo",
    gaussian: "Gaussien",
    linear: "Linéaire",
};

const sculpture = [
    { name: sculptureName.capacitor, icon: <Icon.Layers />, fun: (x) => Math.exp(-((x))) },
    { name: sculptureName.gaussian, icon: <Icon.Layers />, fun: (x) => Math.exp(-((x) * (x))) },
    { name: sculptureName.linear, icon: <Icon.Layers />, fun: (x) => x },


];


export default sculpture;
export { sculptureName };
