import * as THREE from 'three';
import { flatColors } from '../../../../constants/colors';


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

    const positions = [];
    const colors = [];

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

    for (let row = 0; row < rowNb; row++) {
        for (let col = 0; col < colNb; col++) {
            color = new THREE.Color(getColor(flatColors, 'wetAsphalt'));
            for (let parity = 0; parity < 2; parity++) {
                for (let vertNb = 0; vertNb < 3; vertNb++) {
                    x = row + coef[parity][0][vertNb];
                    y = col + coef[parity][1][vertNb];

                    positions.push(width / rowNb * x);
                    positions.push(height / colNb * y);
                    positions.push(0);
                    colors.push(color.r * 255);
                    colors.push(color.g * 255);
                    colors.push(color.b * 255);

                }
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
    geometry.setDrawRange(0, vertexCount);
    const mesh = new THREE.Mesh(geometry, material);

    // display wireframe over the plane
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: flatColors.clouds,
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
