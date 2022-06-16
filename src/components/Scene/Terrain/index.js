import { useTexture } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";
import sand from '../../../assets/textures/freeTexture1.png';
import { noise } from "./perlin";
const Terrain = () => {
    const props = useTexture({
        map: [sand],
    });
    const mesh = useRef();
    const line = useRef();
    const didUpdate = (ref) => {
        noise.seed(Math.random());
        let pos = ref.geometry.getAttribute("position");
        let pa = pos.array;
        const hVerts = ref.geometry.parameters.heightSegments + 1;
        const wVerts = ref.geometry.parameters.widthSegments + 1;
        for (let j = 0; j < hVerts; j++) {
            for (let i = 0; i < wVerts; i++) {
                const ex = 1.1;
                pa[3 * (j * wVerts + i) + 2] =
                    (noise.simplex2(i / 100, j / 100) +
                        noise.simplex2((i + 200) / 50, j / 50) * Math.pow(ex, 1) +
                        noise.simplex2((i + 400) / 25, j / 25) * Math.pow(ex, 2) +
                        noise.simplex2((i + 600) / 12.5, j / 12.5) * Math.pow(ex, 3) +
                        +(noise.simplex2((i + 800) / 6.25, j / 6.25) * Math.pow(ex, 4))) /
                    2;
            }
        }

        pos.needsUpdate = true;
    };

    const onPointerHover = (e) => {
        const meshPosition = mesh.current.geometry.attributes.position;
        const linePosition = line.current.geometry.attributes.position;

        const { face } = e;
        linePosition.copyAt(0, meshPosition, face.a);
        linePosition.copyAt(1, meshPosition, face.b);
        linePosition.copyAt(2, meshPosition, face.c);
        linePosition.copyAt(3, meshPosition, face.a);
        // for (const index of enumerate(position.count)) {
        //     position.array[index * 3 + 2] = amplitude * (Math.random() - 0.5);
        // }
        mesh.current.updateMatrix();
        line.current.geometry.applyMatrix4(mesh.current.matrix);
        line.current.visible = true;
    };

    // Raf loop
    // useFrame(() => {
    //     mesh.current.rotation.z += 0.001;
    // }); 

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(new Float32Array(4 * 3), 3);
    return (
        <group>
            <mesh ref={mesh}
                rotation={[-Math.PI / 3, 0, Math.PI / 10]}
                onUpdate={didUpdate}
                onPointerMove={onPointerHover}
            >
                <planeBufferGeometry attach="geometry" args={[25, 25, 75, 75]} />
                <meshPhongMaterial
                    attach="material"
                    side={THREE.DoubleSide}
                    {...props}
                />
            </mesh>



            <line ref={line} geometry={lineGeometry} visible={false}>
                <lineBasicMaterial
                    attach="material"
                    side={THREE.DoubleSide}
                    color={0xff0000}
                    transparent={true}
                />
            </line>
        </group>
    );
};

export default Terrain;

