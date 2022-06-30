import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import './App.css';
import Controls from "./components/Controls";
import GUI from "./components/GUI";
import Scene from "./components/Scene";

const App = () => (
    <div className="container">
        <div className="body">
            <div className="sidebar panel">
                <GUI />
            </div>
            <div className="content panel">
                <Canvas camera={{ zoom: 30, position: [0, 0, 500] }} gl={{ antialias: true, preserveDrawingBuffer: true }}>
                    <Suspense>
                        <Controls />
                        <Scene />
                    </Suspense>
                </Canvas >
            </div>
        </div>
    </div>
);

export default App; 