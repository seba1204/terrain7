
import * as THREE from 'three';
import sculptures from '../../../../constants/sculptures';
import textures from '../../../../constants/textures';
import { toolsName } from '../../../../constants/tools';
import getNearestVertex from './getNearestVertex';

const applyCurrentTool = (e, mesh, props) => {
    const { currentTool, currentTexture, currentSculpture, sculptIntensity, terrainSize, sculptSize, textureSize } = props;
    const nV = getNearestVertex(mesh, e);

    if (!nV) return null;
    if (e.nativeEvent.buttons !== 1) return nV;
    const meshPosition = mesh.current.geometry.attributes.position.array;
    let neighbors = [];
    switch (currentTool) {
        case toolsName.text:
            neighbors = findNeighbors(meshPosition, nV, relative(textureSize / 10, terrainSize), terrainSize);
            const col = new THREE.Color(textures.filter(t => t.name === currentTexture)[0].color);
            const meshColor = mesh.current.geometry.attributes.color.array;
            neighbors.forEach(({ ind }) => {
                meshColor[ind] = col.r * 255;
                meshColor[ind + 1] = col.g * 255;
                meshColor[ind + 2] = col.b * 255;
            });
            mesh.current.geometry.attributes.color.needsUpdate = true;
            break;
        case toolsName.sculpt:
            neighbors = findNeighbors(meshPosition, nV, relative(sculptSize / 10, terrainSize), terrainSize);
            const fun = sculptures.filter(s => s.name === currentSculpture)[0].fun;
            neighbors.forEach(({ ind, dist }) => {
                const coef = fun(dist);
                const intensity = relative(sculptIntensity / 100, terrainSize);
                const plus = e.shiftKey ? -1 : 1;
                meshPosition[ind + 2] += plus * coef * intensity;
            });

            mesh.current.geometry.attributes.position.needsUpdate = true;
        default:
            break;
    }
    return nV;
};

const findNeighbors = (mesh, vertex, selectorSize, terrainSize) => {
    const neighbors = [];
    const l = terrainSize * terrainSize * 2 * 3;
    for (let i = 0; i < l * 3; i += 3) {
        const tempVertex = new THREE.Vector3(mesh[i], mesh[i + 1], mesh[i + 2]);
        const dist = computeDist(tempVertex, vertex);
        if (dist < selectorSize) {
            neighbors.push({ ind: i, dist });
        }
    }
    return neighbors;
};
const relative = (i, abs) => i / (Math.log(abs));


const computeDist = (a, b) => {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

export default applyCurrentTool;