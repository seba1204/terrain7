import React from "react";
import * as Icon from "react-feather";

const toolsName = {
    sculpt: "SCULPTURE",
    text: "TEXTURE",
    move: "MOVE",
};

const tools = [
    { name: toolsName.sculpt, icon: <Icon.Edit2 /> },
    { name: toolsName.text, icon: <Icon.Layers /> },
    { name: toolsName.move, icon: <Icon.Move /> }

];


export default tools;
export { toolsName };
