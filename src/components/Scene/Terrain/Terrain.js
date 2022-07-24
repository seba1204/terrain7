// import { useTexture } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";
import { toolsName } from '../../../constants/tools';
import { coloredPlane } from './helpers';

const Terrain = (props) => {
    const { currentTool, terrainSize } = props;
    const NB_VERTICES = terrainSize;

    const mesh = useRef();
    const line = useRef();
    const isCklicked = useRef(false);
    const isIn = useRef(false);


    const onPointerHover = (e) => {
        const meshPosition = mesh.current.geometry.attributes.position;
        const linePosition = line.current.geometry.attributes.position;
        const { face, shiftKey, nativeEvent } = e;
        let vertices = [
            face.a,
            face.b,
            face.c
        ];
        console.log(mesh.current.geometry.attributes.position);
        console.log(vertices);
        if (vertices.length > 0) {
            document.getElementById('root').classList.add('cursor-grabbing');
            const dist = vertices.map((v) => {
                const tempVertex = new THREE.Vector3();
                tempVertex.setX(meshPosition.getX(v));
                tempVertex.setY(meshPosition.getY(v));
                tempVertex.setZ(meshPosition.getZ(v));
                return { dist: e.ray.distanceToPoint(mesh.current.localToWorld(tempVertex)), vertex: v };
            });
            dist.sort((a, b) => {
                return a.dist - b.dist;
            });

            let ind = dist[0].vertex;

            if (isCklicked.current & isIn.current & nativeEvent.buttons === 1) {

                if (currentTool === toolsName.sculpt) {
                    let mult = 1;
                    if (shiftKey) mult = -1;
                    const inten = 1 / 10000 * sculptIntensity * NB_VERTICES;
                    meshPosition.array[ind * 3 + 2] = meshPosition.getZ(ind) + inten * mult;
                } else if (currentTool === toolsName.text) {
                    console.log(mesh.current.geometry);
                }
                meshPosition.needsUpdate = true;
                mesh.current.geometry.computeVertexNormals();
                mesh.current.updateMatrix();
            }
            const tempVertex = new THREE.Vector3();
            tempVertex.setX(meshPosition.array[ind * 3]);
            tempVertex.setY(meshPosition.array[ind * 3 + 1]);
            tempVertex.setZ(meshPosition.array[ind * 3 + 2]);


            linePosition.copyAt(0, meshPosition, 1);
            linePosition.copyAt(1, meshPosition, 2);
            linePosition.copyAt(2, meshPosition, 3);
            linePosition.copyAt(3, meshPosition, 1);

            line.current.geometry.applyMatrix4(mesh.current.matrix);
            line.current.visible = true;
            mesh.current.geometry.groupNeedsUpdate = true;
        }
    };








    const lineGeometry = new THREE.BufferGeometry().setFromPoints(new Float32Array(4 * 3), 3);
    const plane = coloredPlane(NB_VERTICES);

    return (
        <group>
            <primitive ref={mesh}
                rotation={[-Math.PI / 3, 0, Math.PI / 10]}
                onPointerMove={onPointerHover}
                onPointerDown={() => isCklicked.current = true}
                onPointerUp={() => isCklicked.current = false}
                onPointerEnter={() => {
                    document.getElementById('root').classList.add('cursor-grabbing');
                    isIn.current = true;
                }}
                onPointerLeave={() => {
                    document.getElementById('root').classList.remove('cursor-grabbing');
                    isIn.current = false;
                }}
                object={plane}
            />



            <line ref={line} geometry={lineGeometry} visible={false}>
                <lineBasicMaterial
                    attach="material"
                    side={THREE.DoubleSide}
                    color={0xff0000}
                    transparent={true}
                />
            </line>
        </group >
    );
};

export default Terrain;

