import * as THREE from 'three';
import { flatColors } from '../../../../constants/colors';


/**
 * Generate a plane of nbVert * nbVert vertices with colors
 * @param {int} nbVert 
 * @returns 
 */
const generateColoredPlane = () => {

    const rowNb = 1;
    const colNb = 1;

    const width = 10;
    const height = 10;

    // const vertexCount = rowNb * colNb * 2 * 3;

    const geometry = new THREE.BufferGeometry();

    const positions = [];
    const colors = [];

    let color;
    let xOffset = 0;
    let yOffset = 0;
    for (let i = 0; i < rowNb * colNb; i++) {

        color = getColor(flatColors, 'random');

        // 2 triangle per square
        for (let k = 0; k < 2; k++) {

            // 3 vertices per triangle
            for (let j = 0; j < 3; j++) {
                if (j <= 1) {
                    xOffset = j;
                    yOffset = 0;
                } else {
                    xOffset = k;
                    yOffset = 1;
                }
                // adding x
                positions.push(width / rowNb * (i % rowNb + xOffset));
                // adding y
                positions.push(height / colNb * (i % (rowNb) + yOffset));
                // adding z
                positions.push(0);

                // adding r,g,b
                colors.push(color.r * 255);
                colors.push(color.g * 255);
                colors.push(color.b * 255);

            }
        }

    }

    const positionAttribute = new THREE.Float32BufferAttribute(positions, 3);
    const colorAttribute = new THREE.Uint8BufferAttribute(colors, 3);

    colorAttribute.normalized = true;

    geometry.setAttribute('position', positionAttribute);
    geometry.setAttribute('color', colorAttribute);

    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        vertexColors: true,
        side: THREE.DoubleSide,
    });
    geometry.setDrawRange(0, 4 * 3 * 2);
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
 * @param {*} colorName if null, return colorName, else return random color
 * @returns a `THREE.Color` color
 */
const getColor = (colors, colorName) => {
    if (colorName === 'random') {
        const keys = Object.keys(colors);
        const random = Math.floor(Math.random() * keys.length);
        return colors[keys[random]];
    } else {
        return colors[colorName];
    }
};


export default generateColoredPlane;
