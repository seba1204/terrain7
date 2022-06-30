import { useTexture } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";
import sand from '../../../assets/textures/freeTexture1.png';
// import grass from '../../../assets/textures/freeTexture2.png';
const Terrain = ({ brushSize, brushIntensity, terrainSize, wireFrame }) => {
    const NB_VERTICES = terrainSize;
    let size = Math.floor(1 / (105 - (brushSize)) * NB_VERTICES);
    size = size < 1 ? 1 : size;
    const texture = useTexture(sand);
    if (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10, 10);
        texture.anisotropy = 100;
    }
    const mesh = useRef();
    const line = useRef();
    const cls = useRef();
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
                let mult = 1;
                if (shiftKey) mult = -1;
                const inten = 1 / 10000 * brushIntensity * NB_VERTICES;
                meshPosition.array[ind * 3 + 2] = meshPosition.getZ(ind) + inten * mult;
                meshPosition.needsUpdate = true;
                mesh.current.geometry.computeVertexNormals();
                mesh.current.updateMatrix();
            }
            const tempVertex = new THREE.Vector3();
            tempVertex.setX(meshPosition.array[ind * 3]);
            tempVertex.setY(meshPosition.array[ind * 3 + 1]);
            tempVertex.setZ(meshPosition.array[ind * 3 + 2]);
            cls.current.position.copy(mesh.current.localToWorld(tempVertex));

            const cond1 = (ind % (NB_VERTICES + 1) - size >= 0);
            const cond2 = (ind % (NB_VERTICES + 1) + size) <= NB_VERTICES;
            const cond3 = ((ind - (ind % (NB_VERTICES))) / (NB_VERTICES));
            const a = cond2 ? ind + size : ind + NB_VERTICES - ind % (NB_VERTICES + 1);
            const b = cond3 <= NB_VERTICES - size ? ind + size * (NB_VERTICES + 1) : ind + (NB_VERTICES - cond3 + 1) * (NB_VERTICES + 1);
            const c = cond1 ? ind - size : ind - ind % (NB_VERTICES + 1);
            const d = cond3 > size ? ind - size * (NB_VERTICES + 1) : ind - (cond3 * (NB_VERTICES + 1));

            linePosition.copyAt(0, meshPosition, a);
            linePosition.copyAt(1, meshPosition, b);
            linePosition.copyAt(2, meshPosition, c);
            linePosition.copyAt(3, meshPosition, d);
            linePosition.copyAt(4, meshPosition, a);

            line.current.geometry.applyMatrix4(mesh.current.matrix);
            line.current.visible = true;
            mesh.current.geometry.groupNeedsUpdate = true;
        }
    };


    const lineGeometry = new THREE.BufferGeometry().setFromPoints(new Float32Array(4 * 3), 3);
    return (
        <group>
            <mesh ref={mesh}
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
            >
                <planeBufferGeometry attach="geometry" args={[25, 25, NB_VERTICES, NB_VERTICES]} />
                <meshPhongMaterial
                    attach="material"
                    side={THREE.DoubleSide}
                    map={texture}
                    wireframe={wireFrame}
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

            <mesh ref={cls} visible={false}>
                <sphereBufferGeometry args={[0.3]} />
            </mesh>

        </group >
    );
};

export default Terrain;

