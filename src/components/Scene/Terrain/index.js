import { useTexture } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";
import sand from '../../../assets/textures/freeTexture1.png';
// import grass from '../../../assets/textures/freeTexture2.png';
const Terrain = () => {
    const texture = useTexture(sand);
    if (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10, 10);
        texture.anisotropy = 100;
    }
    const mesh = useRef();
    const line = useRef();
    const isCklicked = useRef(false);
    const isIn = useRef(false);

    const onPointerHover = (e) => {
        const meshPosition = mesh.current.geometry.attributes.position;
        const linePosition = line.current.geometry.attributes.position;

        const { face, shiftKey, nativeEvent } = e;
        linePosition.copyAt(0, meshPosition, face.a);
        linePosition.copyAt(1, meshPosition, face.b);
        linePosition.copyAt(2, meshPosition, face.c);
        linePosition.copyAt(3, meshPosition, face.a);

        if (isCklicked.current & isIn.current & nativeEvent.buttons === 1) {
            let mult = 1;
            if (shiftKey) mult = -1;

            let ind = face.c;
            face.materialIndex = 1;
            meshPosition.array[ind * 3 + 2] = meshPosition.getZ(ind) + 0.1 * mult;
            meshPosition.array[(ind + 1) * 3 + 2] = meshPosition.getZ(ind + 1) + 0.05 * mult;
            meshPosition.array[(ind - 1) * 3 + 2] = meshPosition.getZ(ind - 1) + 0.05 * mult;
            meshPosition.array[(ind + 2) * 3 + 2] = meshPosition.getZ(ind + 2) + 0.01 * mult;
            meshPosition.array[(ind - 2) * 3 + 2] = meshPosition.getZ(ind - 2) + 0.01 * mult;
            meshPosition.needsUpdate = true;
            mesh.current.geometry.computeVertexNormals();
            mesh.current.updateMatrix();
        }
        line.current.geometry.applyMatrix4(mesh.current.matrix);
        line.current.visible = true;
        mesh.current.geometry.groupNeedsUpdate = true;
    };


    const lineGeometry = new THREE.BufferGeometry().setFromPoints(new Float32Array(4 * 3), 3);
    return (
        <group>
            <mesh ref={mesh}
                rotation={[-Math.PI / 3, 0, Math.PI / 10]}
                onPointerMove={onPointerHover}
                onPointerDown={() => isCklicked.current = true}
                onPointerUp={() => isCklicked.current = false}
                onPointerEnter={() => isIn.current = true}
                onPointerLeave={() => isIn.current = false}
            >
                <planeBufferGeometry attach="geometry" args={[25, 25, 100, 100]} />
                <meshPhongMaterial
                    attach="material"
                    side={THREE.DoubleSide}
                    map={texture}
                    wireframe={false}
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
        </group >
    );
};

export default Terrain;

