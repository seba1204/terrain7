import { useTexture } from "@react-three/drei";
import React, { useRef } from "react";
import texture from '../../../assets/textures/freeTexture1.png';
import { noise } from "./perlin";
const Terrain = () => {
    const props = useTexture({
        map: texture,
    });
    const mesh = useRef();
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

    // Raf loop
    // useFrame(() => {
    //     mesh.current.rotation.z += 0.001;
    // });

    return (
        <mesh ref={mesh}
            rotation={[-Math.PI / 3, 0, Math.PI / 10]}
            onUpdate={didUpdate}
            onPointerDown={console.log}
        >
            <planeBufferGeometry attach="geometry" args={[25, 25, 75, 75]} />
            <meshPhongMaterial
                attach="material"
                {...props}
            />
        </mesh>
    );
};

export default Terrain;

