// import { useTexture } from "@react-three/drei";
import React, { useMemo, useRef } from "react";
import { ControlContext } from "../../Controls";
import { applyCurrentTool, coloredPlane } from './helpers';


import { flatColors } from "../../../constants/colors";

const Terrain = ({ terrainSize, currentTool }) => {
    const NB_VERTICES = terrainSize;

    const mesh = useRef();
    const cls = useRef();

    const onPointerHover = (e) => {

        const nV = applyCurrentTool(currentTool, e, mesh);

        if (!nV) return;
        cls.current.position.copy(mesh.current.localToWorld(nV));


    };

    const onPointerDown = (e) => {
        applyCurrentTool(currentTool, e, mesh);
    };

    const plane = useMemo(() => coloredPlane(NB_VERTICES, 20), [NB_VERTICES]);
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

