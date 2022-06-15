import { Canvas } from "@react-three/fiber";
import React from "react";
import * as THREE from 'three';
import './App.css';

function MyRotatingBox() {
    // const myMesh = React.useRef();
    const terrain = React.useRef();
    // const [active, setActive] = useState(false);
    const NB_VERTICES = 50;

    const randomize = () => {
        for (let z = 0; z < 51; z++) {
            for (let x = 0; x < 51; x++) {
                const index = 3 * (z * 51 + x);
                terrain.current.attributes.position.array[index + 2] = 6 / NB_VERTICES * Math.random();
            }
        }
        terrain.current.attributes.position.needsUpdate = true;
        terrain.current.computeVertexNormals();
    };


    return (
        <mesh
            rotation={[2, 0, 3]}
            onClick={() => randomize()}
        >
            <planeGeometry ref={terrain} attach="geometry" args={[5, 5, NB_VERTICES, NB_VERTICES]} />
            <meshBasicMaterial wireframe color="royalblue" side={THREE.DoubleSide} />
        </mesh>
    );
}


export default function App() {
    return (
        <div id="canvas-container">
            <Canvas>
                <MyRotatingBox />
                <ambientLight intensity={0.1} />
                <directionalLight />
            </Canvas>

        </div>
    );
}

