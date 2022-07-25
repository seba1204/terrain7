// import { useTexture } from "@react-three/drei";
import React, { useRef } from "react";
import buttonCodes from "../../../constants/buttonCodes.json";
import keyCodes from "../../../constants/keyCodes.json";
import { toolsName } from '../../../constants/tools';
import { ControlContext } from "../../Controls";
import { coloredPlane, getNearestVertex } from './helpers';

import { flatColors } from "../../../constants/colors";

const Terrain = ({ terrainSize, currentTool, keys, buttons }) => {
    const NB_VERTICES = terrainSize;

    const mesh = useRef();
    const cls = useRef();



    const onPointerHover = (e) => {
        const nV = getNearestVertex(mesh, e);
        if (nV) {
            cls.current.position.copy(mesh.current.localToWorld(nV));
        }
    };

    const cannotEdit = () => keys.includes(keyCodes.shift) && buttons.includes(buttonCodes.middle);

    const onPointerDown = (e) => {
        if (cannotEdit()) return;

        const nV = getNearestVertex(mesh, e);

        switch (currentTool) {
            case toolsName.sculpt:
                if (!nV) return;


                break;

            default:
                break;
        }

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

const ControledTerrain = (props) => (
    <ControlContext.Consumer>
        {({ keys, buttons }) => (
            <Terrain keys={keys} buttons={buttons} {...props} />
        )}
    </ControlContext.Consumer>
);

export default ControledTerrain;

