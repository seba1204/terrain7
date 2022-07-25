
import * as THREE from 'three';
import { toolsName } from '../../../../constants/tools';
import getNearestVertex from './getNearestVertex';

import { textureColors } from "../../../../constants/colors";

const changeVertexColor = (mesh, e, color) => {
    const meshColor = mesh.current.geometry.attributes.color;
    const { face } = e;
    let vertices = [
        face.a,
        face.b,
        face.c
    ];
    vertices.forEach(ind => {
        meshColor.array[ind * 3] = color.r * 255;
        meshColor.array[ind * 3 + 1] = color.g * 255;
        meshColor.array[ind * 3 + 2] = color.b * 255;
    });
    meshColor.needsUpdate = true;
};

const applyCurrentTool = (currentTool, e, mesh) => {

    const nV = getNearestVertex(mesh, e);
    switch (currentTool) {
        case toolsName.text:
            if (!nV) return;
            if (e.nativeEvent.buttons !== 1) break;
            changeVertexColor(mesh, e, new THREE.Color(textureColors.grass));
            break;

        default:
            break;
    }
    return nV;
};

export default applyCurrentTool;