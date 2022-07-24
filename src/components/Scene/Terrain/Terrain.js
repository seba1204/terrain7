// import { useTexture } from "@react-three/drei";
import React, { useRef } from "react";
import { coloredPlane, getNearestVertex } from './helpers';

import { flatColors } from "../../../constants/colors";

const Terrain = (props) => {
    const { terrainSize } = props;
    const NB_VERTICES = terrainSize;

    const mesh = useRef();
    const cls = useRef();



    const onPointerHover = (e) => {
        const nV = getNearestVertex(mesh, e);
        if (nV) {
            cls.current.position.copy(mesh.current.localToWorld(nV));
        }
    };

    const onPointerDown = (e) => {
        const nV = getNearestVertex(mesh, e);
        console.log(`x: ${nV.x}, y: ${nV.y}, z: ${nV.z}`);
    };

    const plane = coloredPlane(NB_VERTICES, 20);

    return (
        <group>
            <primitive ref={mesh}
                rotation={[-Math.PI / 3, 0, Math.PI / 10]}
                onPointerMove={onPointerHover}
                onPointerDown={onPointerDown}
                object={plane}
            />

            <mesh ref={cls}>
                <sphereBufferGeometry args={[0.3]} />
                <meshBasicMaterial attach="material" color={flatColors.alizarin} />
            </mesh>
        </group >
    );
};

export default Terrain;

