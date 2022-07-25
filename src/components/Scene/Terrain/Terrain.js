// import { useTexture } from "@react-three/drei";
import React, { useMemo, useRef } from "react";
import { flatColors } from "../../../constants/colors";
import { ControlContext } from "../../Controls";
import { applyCurrentTool, coloredPlane } from './helpers';

import * as THREE from 'three';

const Terrain = (props) => {
    const { wireFrame } = props;
    const NB_VERTICES = props.terrainSize;

    const mesh = useRef();
    const cls = useRef();

    const onPointerHover = (e) => {
        if (e.nativeEvent.buttons === 4) return;

        const nV = applyCurrentTool(e, mesh, { ...props });

        if (!nV) return;
        cls.current.position.copy(mesh.current.localToWorld(nV));


    };

    const onPointerDown = (e) => {
        applyCurrentTool(e, mesh, { ...props });
    };

    const planeGeo = useMemo(() => coloredPlane(NB_VERTICES, 20), [NB_VERTICES]);
    const plane = useMemo(() => {
        const mat1 = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            vertexColors: true,
            side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(planeGeo, mat1);
        if (wireFrame) {
            const mat2 = new THREE.MeshBasicMaterial({
                color: flatColors.clouds,
                wireframe: true,
                transparent: true
            });
            mesh.add(new THREE.Mesh(planeGeo, mat2));
        }
        return mesh;
    }, [planeGeo, wireFrame]);
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

const ControledTerrain = (props) => (
    <ControlContext.Consumer>
        {({ keys, buttons }) => (
            <Terrain keys={keys} buttons={buttons} {...props} />
        )}
    </ControlContext.Consumer>
);

export default ControledTerrain;

