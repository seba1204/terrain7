import { useTexture } from "@react-three/drei";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import dirt from '../../../assets/textures/dirt-512.jpg';
import grass from '../../../assets/textures/grass-512.jpg';
import heightmap from '../../../assets/textures/heightmap.png';
import rock from '../../../assets/textures/rock-512.jpg';
import sand from '../../../assets/textures/sand-512.jpg';
import snow from '../../../assets/textures/snow-512.jpg';

const Terrain = ({ brushSize, brushIntensity, terrainSize, wireFrame, currentTool }) => {
    const NB_VERTICES = terrainSize;
    let size = Math.floor(1 / (105 - (brushSize)) * NB_VERTICES);
    size = size < 1 ? 1 : size;
    // const texture = useTexture(sand);
    // if (texture) {
    //     texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    //     texture.repeat.set(10, 10);
    //     texture.anisotropy = 100;
    // }
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
            console.log(meshPosition);
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

                if (currentTool === 0) {
                    let mult = 1;
                    if (shiftKey) mult = -1;
                    const inten = 1 / 10000 * brushIntensity * NB_VERTICES;
                    meshPosition.array[ind * 3 + 2] = meshPosition.getZ(ind) + inten * mult;
                } else if (currentTool === 1) {
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


    const textures = [
        heightmap,
        dirt,
        sand,
        grass,
        rock,
        snow,
    ];
    const texturesL = useTexture(textures);

    const data = useMemo(
        () => {



            if (texturesL) {
                texturesL.map(t => {
                    t.wrapS = t.wrapT = THREE.RepeatWrapping;
                    t.repeat.set(10, 10);
                    t.anisotropy = 100;
                });
            }


            const fragmentShader = `
uniform sampler2D oceanTexture;
uniform sampler2D sandyTexture;
uniform sampler2D grassTexture;
uniform sampler2D rockyTexture;
uniform sampler2D snowyTexture;

varying vec2 vUV;

varying float vAmount;

void main() 
{
	vec4 water = (smoothstep(0.01, 0.25, vAmount) - smoothstep(0.24, 0.26, vAmount)) * texture2D( oceanTexture, vUV * 10.0 );
	vec4 sandy = (smoothstep(0.24, 0.27, vAmount) - smoothstep(0.28, 0.31, vAmount)) * texture2D( sandyTexture, vUV * 10.0 );
	vec4 grass = (smoothstep(0.28, 0.32, vAmount) - smoothstep(0.35, 0.40, vAmount)) * texture2D( grassTexture, vUV * 20.0 );
	vec4 rocky = (smoothstep(0.30, 0.50, vAmount) - smoothstep(0.40, 0.70, vAmount)) * texture2D( rockyTexture, vUV * 20.0 );
	vec4 snowy = (smoothstep(0.50, 0.65, vAmount))                                   * texture2D( snowyTexture, vUV * 10.0 );
	gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0) + water + sandy + grass + rocky + snowy; //, 1.0);
}  `;

            const vertexShader = `
uniform sampler2D bumpTexture;
uniform float bumpScale;

varying float vAmount;
varying vec2 vUV;

void main() 
{ 
	vUV = uv;
	vec4 bumpData = texture2D( bumpTexture, uv );
	
	vAmount = bumpData.r; // assuming map is grayscale it doesn't matter if you use r, g, or b.
	
	// move the position along the normal
    vec3 newPosition = position ;
	
	gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}`;
            // magnitude of normal displacement
            const bumpScale = 200.0;

            return ({

                uniforms: {
                    bumpTexture: { type: "t", value: texturesL[0] },
                    bumpScale: { type: "f", value: bumpScale },
                    oceanTexture: { type: "t", value: texturesL[1] },
                    sandyTexture: { type: "t", value: texturesL[2] },
                    grassTexture: { type: "t", value: texturesL[3] },
                    rockyTexture: { type: "t", value: texturesL[4] },
                    snowyTexture: { type: "t", value: texturesL[5] },
                },
                fragmentShader,
                vertexShader
            });
        },

        [texturesL]
    );

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

                {wireFrame ?
                    <meshPhongMaterial
                        attach="material"
                        side={THREE.DoubleSide}
                        wireframe={true}
                        color={0xffffff}
                    /> : <shaderMaterial attach="material" {...data} />}

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

