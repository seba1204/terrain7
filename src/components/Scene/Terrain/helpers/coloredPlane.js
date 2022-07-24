import * as THREE from 'three';
import { flatColors, textureColors } from '../../../../assets/colors/colors';


/**
 * Generate a plane of nbVert * nbVert vertices with colors
 * @param {int} nbVert 
 * @returns 
 */
const generateColoredPlane = (nbVert) => {

    let color = new THREE.Color();

    // generate a non indexed plane
    const geometry = new THREE.PlaneGeometry(25, 25, nbVert, nbVert).toNonIndexed();


    const count = geometry.attributes.position.count;
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3));

    const cols = geometry.attributes.color;

    // change colors of each vertex
    for (let i = 0; i <= count; i += 3) {
        color = getColor(textureColors);
        for (let j = 0; j < 3; j++) {
            cols.setXYZ(i + j, color.r, color.g, color.b);
        }
    }

    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        vertexColors: true
    });
    const mesh = new THREE.Mesh(geometry, material);

    // display wireframe over the plane
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: flatColors.pomegranate,
        wireframe: true,
        transparent: true
    });
    const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
    mesh.add(wireframe);

    return mesh;
};


/**
 * Chose a color from the `colors` object
 * @param {*} colors object of colors of type {colorName: THREE.Color}
 * @param {*} type if null, return sand color, else return random color
 * @returns a `THREE.Color` color
 */
const getColor = (colors, type) => {
    if (type === 'random') {
        const keys = Object.keys(colors);
        const random = Math.floor(Math.random() * keys.length);
        return colors[keys[random]];
    } else {
        return colors.sand;
    }
};


export default generateColoredPlane;
