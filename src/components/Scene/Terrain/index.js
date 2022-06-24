import { useTexture } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";
import sand from '../../../assets/textures/freeTexture1.png';
const Terrain = () => {
    const texture = useTexture(sand);
    if (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1500, 1500);
        texture.anisotropy = 16;
    }
    const mesh = useRef();
    const line = useRef();
    const isCklicked = useRef(false);
    const isIn = useRef(false);
    // const didUpdate = (ref) => {
    //     noise.seed(Math.random());
    //     let pos = ref.geometry.getAttribute("position");
    //     let pa = pos.array;
    //     const hVerts = ref.geometry.parameters.heightSegments + 1;
    //     const wVerts = ref.geometry.parameters.widthSegments + 1;
    //     for (let j = 0; j < hVerts; j++) {
    //         for (let i = 0; i < wVerts; i++) {
    //             const ex = 1.1;
    //             pa[3 * (j * wVerts + i) + 2] =
    //                 (noise.simplex2(i / 100, j / 100) +
    //                     noise.simplex2((i + 200) / 50, j / 50) * Math.pow(ex, 1) +
    //                     noise.simplex2((i + 400) / 25, j / 25) * Math.pow(ex, 2) +
    //                     noise.simplex2((i + 600) / 12.5, j / 12.5) * Math.pow(ex, 3) +
    //                     +(noise.simplex2((i + 800) / 6.25, j / 6.25) * Math.pow(ex, 4))) /
    //                 2;
    //         }
    //     }

    //     pos.needsUpdate = true;
    // };

    const onPointerHover = (e) => {
        const meshPosition = mesh.current.geometry.attributes.position;
        const linePosition = line.current.geometry.attributes.position;

        const { face, shiftKey, nativeEvent } = e;
        linePosition.copyAt(0, meshPosition, face.a);
        linePosition.copyAt(1, meshPosition, face.b);
        linePosition.copyAt(2, meshPosition, face.c);
        linePosition.copyAt(3, meshPosition, face.a);

        if (isCklicked.current & isIn.current & nativeEvent.r === 1) {
            let mult = 1;
            if (shiftKey) mult = -1;

            let ind = face.c;
            face.materialIndex = 1;
            meshPosition.array[ind * 3 + 2] = meshPosition.getZ(ind) + 0.05 * mult;
            meshPosition.array[(ind + 1) * 3 + 2] = meshPosition.getZ(ind + 1) + 0.01 * mult;
            meshPosition.array[(ind - 1) * 3 + 2] = meshPosition.getZ(ind - 1) + 0.01 * mult;
            meshPosition.needsUpdate = true;
            mesh.current.geometry.computeVertexNormals();
            mesh.current.updateMatrix();
        }
        line.current.geometry.applyMatrix4(mesh.current.matrix);
        line.current.visible = true;
        mesh.current.geometry.groupNeedsUpdate = true;
    };

    // Raf loop
    // useFrame(() => {
    //     mesh.current.rotation.z += 0.001;
    // });

    // const fragmentShader = `
    //     varying vec3 Normal;
    //     varying vec3 Position;

    //     uniform vec3 Ka;
    //     uniform vec3 Kd;
    //     uniform vec3 Ks;
    //     uniform vec4 LightPosition;
    //     uniform vec3 LightIntensity;
    //     uniform float Shininess;

    //     vec3 phong() {
    //         vec3 n = normalize(Normal);
    //         vec3 s = normalize(vec3(LightPosition) - Position);
    //         vec3 v = normalize(vec3(-Position));
    //         vec3 r = reflect(-s, n);

    //         vec3 ambient = Ka;
    //         vec3 diffuse = Kd * max(dot(s, n), 0.0);
    //         vec3 specular = Ks * pow(max(dot(r, v), 0.0), Shininess);

    //         return LightIntensity * (ambient + diffuse + specular);
    //     }

    //     void main() {
    //         vec3 blue = vec3(0.0, 0.0, 1.0);
    //         gl_FragColor = vec4(blue*phong(), 1.0);
    //     }`


    const lineGeometry = new THREE.BufferGeometry().setFromPoints(new Float32Array(4 * 3), 3);
    return (
        <group>
            <mesh ref={mesh}
                rotation={[-Math.PI / 3, 0, Math.PI / 10]}
                // onUpdate={didUpdate}
                onPointerMove={onPointerHover}
                onPointerDown={() => isCklicked.current = true}
                onPointerUp={() => isCklicked.current = false}
                onPointerEnter={() => isIn.current = true}
                onPointerLeave={() => isIn.current = false}
            >
                <planeBufferGeometry attach="geometry" args={[25, 25, 100, 100]} />
                {/* {
                    textures.map((texture) => (
                        <meshPhongMaterial key={texture.uuid} map={texture} side={THREE.DoubleSide} />
                    ))
                } */}
                <meshPhongMaterial
                    attach="material"
                    side={THREE.DoubleSide}
                    map={texture}
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

