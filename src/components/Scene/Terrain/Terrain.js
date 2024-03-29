import { useTexture } from "@react-three/drei";
import React, { useMemo, useRef } from "react";
import grass from '../../../assets/textures/pack-1/grass.jpg';
import heightmap from '../../../assets/textures/pack-1/heightmap.png';
import rock from '../../../assets/textures/pack-1/rock.jpg';
import sand from '../../../assets/textures/pack-1/sand.jpg';
import snow from '../../../assets/textures/pack-1/snow.jpg';
import water from '../../../assets/textures/pack-1/water.jpg';
import { flatColors } from "../../../constants/colors";
import { ControlContext } from "../../Controls";
import { applyCurrentTool, coloredPlane } from './helpers';
import fragmentShader from "./shaders/fragmentShader.glsl";
import vertexShader from "./shaders/vertexShader.glsl";

import * as THREE from 'three';

const Terrain = (props) => {
    const { wireFrame, showTexture } = props;
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


    const textures = [
        heightmap,
        water,
        sand,
        grass,
        rock,
        snow,
    ];
    const texturesL = useTexture(textures);

    const planeGeo = useMemo(() => coloredPlane(NB_VERTICES, 20), [NB_VERTICES]);
    const plane = useMemo(() => {
        let mat;
        if (showTexture) {
            if (texturesL) {
                texturesL.map(t => {
                    t.wrapS = t.wrapT = THREE.RepeatWrapping;
                    t.repeat.set(1, 1);
                    t.anisotropy = 100;
                });
            }
            // magnitude of normal displacement
            console.log(planeGeo);
            const data = {
                uniforms: {
                    size: { value: 32 },
                    colors: { value: planeGeo.attributes.color.array.slice(NB_VERTICES) },
                    oceanTexture: { type: "t", value: texturesL[1] },
                    sandyTexture: { type: "t", value: texturesL[2] },
                    grassTexture: { type: "t", value: texturesL[3] },
                    rockyTexture: { type: "t", value: texturesL[4] },
                    snowyTexture: { type: "t", value: texturesL[5] },
                },
                fragmentShader,
                vertexShader
            };
            mat = new THREE.ShaderMaterial({
                side: THREE.DoubleSide,
                ...data
            });
        } else {
            mat = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                vertexColors: true,
                side: THREE.DoubleSide,
            });
        }

        const mesh = new THREE.Mesh(planeGeo, mat);
        if (wireFrame) {
            const mat2 = new THREE.MeshBasicMaterial({
                color: flatColors.wetAsphalt,
                wireframe: true,
                transparent: true
            });
            mesh.add(new THREE.Mesh(planeGeo, mat2));
        }


        return mesh;


    }, [planeGeo, wireFrame, texturesL, showTexture, NB_VERTICES]);




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

