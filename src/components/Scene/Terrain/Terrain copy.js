// import { useTexture } from "@react-three/drei";
import React from "react";
import * as THREE from 'three';
// import dirt from '../../../assets/textures/dirt-512.jpg';
// import grass from '../../../assets/textures/grass-512.jpg';
// import heightmap from '../../../assets/textures/heightmap.png';
// import rock from '../../../assets/textures/rock-512.jpg';
// import sand from '../../../assets/textures/sand-512.jpg';
// import snow from '../../../assets/textures/snow-512.jpg';

// import { toolsName } from '../../../constants/tools';

const Terrain = () => {
    const NB_VERTICES = 10;
    const colores = {
        grass: new THREE.Color(0x2ecc71),
        dirt: new THREE.Color(0x9b59b6),
        sand: new THREE.Color(0xf1c40f),
        rock: new THREE.Color(0xe74c3c),
        snow: new THREE.Color(0xecf0f1),
        // turq: new THREE.Color(0x1abc9c),
        // blue: new THREE.Color(0x3498db),
        // orange: new THREE.Color(0xe67e22),
        // pink: new THREE.Color(0xec407a),
        // brown: new THREE.Color(0x8d6e63),
    };
    const getCube = () => {
        const geometry = new THREE.PlaneGeometry(25, 25, NB_VERTICES, NB_VERTICES).toNonIndexed();
        let color = new THREE.Color();
        const count = geometry.attributes.position.count;
        geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
        const colors = geometry.attributes.color;
        for (let i = 0; i <= count; i += 3) {
            color = colores.grass;
            colors.setXYZ(i, color.r, color.g, color.b);
            colors.setXYZ(i + 1, color.r, color.g, color.b);
            colors.setXYZ(i + 2, color.r, color.g, color.b);
        }

        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            flatShading: true,
            vertexColors: true,
            shininess: 0
        });
        const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true });

        const mesh = new THREE.Mesh(geometry, material);
        const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
        mesh.add(wireframe);

        return mesh;
    };
    const cube = getCube();
    const onPointerHover = (event) => {
        console.log(event);
    };
    return (
        <primitive
            object={cube}
            onClick={console.log(cube)}
            onPointerMove={onPointerHover}
        />
    );
};

export default Terrain;

