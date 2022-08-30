import * as THREE from 'three';
import { textureColors } from '../../../../constants/colors';

const MAX_BUFFER_TRIANGLES = 200 * 200 * 2;

/**
 * Generate a plane of nbVert * nbVert vertices with colors
 * @param {int} nbVert 
 * @returns 
 */
const generateColoredPlane = (nbCote, size) => {


    const rowNb = nbCote;
    const colNb = nbCote;

    const width = size;
    const height = size;

    const vertexCount = rowNb * colNb * 2 * 3;

    const geometry = new THREE.BufferGeometry();

    // 3 points per triangle * 3 coords per point
    const positions = Array(MAX_BUFFER_TRIANGLES * 3 * 3).fill(0);
    const colors = Array(MAX_BUFFER_TRIANGLES * 3 * 3).fill(0);

    let color, x, y;



    const coef = [
        [
            [0, 1, 0],
            [0, 0, 1]
        ],
        [
            [1, 1, 0],
            [0, 1, 1]
        ]
    ];

    let index = 0;

    for (let row = 0; row < rowNb; row++) {
        for (let col = 0; col < colNb; col++) {
            color = new THREE.Color(getColor(textureColors, 'sand'));
            for (let parity = 0; parity < 2; parity++) {
                for (let vertNb = 0; vertNb < 3; vertNb++) {
                    x = row + coef[parity][0][vertNb];
                    y = col + coef[parity][1][vertNb];

                    positions[index] = (width / rowNb * x);
                    positions[index + 1] = (height / colNb * y);
                    positions[index + 2] = (0);

                    colors[index] = (color.r * 255);
                    colors[index + 1] = (color.g * 255);
                    colors[index + 2] = (color.b * 255);

                    index += 3;
                }
            }

        }
    }
    const positionAttribute = new THREE.Float32BufferAttribute(positions, 3);
    const colorAttribute = new THREE.Uint8BufferAttribute(colors, 3);

    colorAttribute.normalized = true;

    geometry.setAttribute('position', positionAttribute);
    geometry.setAttribute('color', colorAttribute);
    geometry.setDrawRange(0, vertexCount);
    return geometry;
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
