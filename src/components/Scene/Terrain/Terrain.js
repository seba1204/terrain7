// import { useTexture } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";
// import dirt from '../../../assets/textures/dirt-512.jpg';
// import grass from '../../../assets/textures/grass-512.jpg';
// import heightmap from '../../../assets/textures/heightmap.png';
// import rock from '../../../assets/textures/rock-512.jpg';
// import sand from '../../../assets/textures/sand-512.jpg';
// import snow from '../../../assets/textures/snow-512.jpg';

import { toolsName } from '../../../constants/tools';

const Terrain = (props) => {
    const { currentTool, terrainSize } = props;
    const NB_VERTICES = terrainSize;
    const colores = {
        grass: new THREE.Color(0x2ecc71),
        dirt: new THREE.Color(0x9b59b6),
        sand: new THREE.Color(0xf1c40f),
        rock: new THREE.Color(0xe74c3c),
        snow: new THREE.Color(0xecf0f1),

    };
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
            cls.current.position.copy(mesh.current.localToWorld(tempVertex));


            linePosition.copyAt(0, meshPosition, 1);
            linePosition.copyAt(1, meshPosition, 2);
            linePosition.copyAt(2, meshPosition, 3);
            linePosition.copyAt(3, meshPosition, 1);

            line.current.geometry.applyMatrix4(mesh.current.matrix);
            line.current.visible = true;
            mesh.current.geometry.groupNeedsUpdate = true;
        }
    };
    const getCube = () => {
        const geometry = new THREE.PlaneGeometry(25, 25, NB_VERTICES, NB_VERTICES).toNonIndexed();
        let color = new THREE.Color();
        const count = geometry.attributes.position.count;
        geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
        const colors = geometry.attributes.color;
        for (let i = 0; i <= count; i += 3) {
            // color = colores.grass;
            // get random color from colores
            const keys = Object.keys(colores);
            const random = Math.floor(Math.random() * keys.length);
            color = colores[keys[random]];

            colors.setXYZ(i, color.r, color.g, color.b);
            colors.setXYZ(i + 1, color.r, color.g, color.b);
            colors.setXYZ(i + 2, color.r, color.g, color.b);
        }

        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            vertexColors: true
        });
        const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true });

        const mesh = new THREE.Mesh(geometry, material);
        const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
        mesh.add(wireframe);

        return mesh;
    };






    const lineGeometry = new THREE.BufferGeometry().setFromPoints(new Float32Array(4 * 3), 3);
    const cube = getCube();


    // useEffect(() => {
    //     const computeDist = () => {
    //         const geometry = mesh.current.geometry;
    //         const count = geometry.attributes.position.count;
    //         const a = np.zeros([count / 3, count / 3]);

    //         const positions = geometry.attributes.position.array;
    //         for (let i = 0; i < count; i += 3) {
    //             for (let j = 0; j < count; j += 3) {
    //                 const xi = positions[i];
    //                 const yi = positions[i + 1];
    //                 const zi = positions[i + 2];
    //                 const xj = positions[j];
    //                 const yj = positions[j + 1];
    //                 const zj = positions[j + 2];
    //                 const dist = Math.sqrt((xi - xj) ** 2 + (yi - yj) ** 2 + (zi - zj) ** 2);
    //                 a.set(i / 3, j / 3, dist);
    //             }
    //         }
    //         return a;
    //     };

    //     const distances = computeDist();
    //     console.log("" + distances);
    // }, []);


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
                object={cube}
            />



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

