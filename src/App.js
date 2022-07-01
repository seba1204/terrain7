import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import './App.css';
import Controls from "./components/Controls";
import GUI from "./components/GUI";
import Scene from "./components/Scene";

const App = () => {
    const [brushSize, setBrushSize] = useState(10);
    const [brushIntensity, setbrushIntensity] = useState(20);
    const [terrainSize, setTerrainSize] = useState(50);
    const [wireFrame, setWireFrame] = useState(true);
    const [currentTool, setCurrentTool] = useState(0);
    const handleBrushSizeChange = (e) => {
        setBrushSize(e);
    };
    return (
        <div className="container">
            <div className="body">
                <div className="sidebar panel">
                    <GUI
                        onBrushSizeChange={handleBrushSizeChange}
                        onBrushIntensityChange={setbrushIntensity}
                        onTerrainChange={setTerrainSize}
                        onWireFrame={setWireFrame}
                        onCurrentToolChange={setCurrentTool}
                        currentTool={currentTool}
                        wireFrame={wireFrame}
                    />
                </div>
                <div className="content panel">
                    <Canvas camera={{ zoom: 30, position: [0, 0, 500] }} gl={{ antialias: true, preserveDrawingBuffer: true }}>
                        <Suspense>
                            <Controls />
                            <Scene brushSize={brushSize} brushIntensity={brushIntensity} terrainSize={terrainSize} wireFrame={wireFrame} currentTool={currentTool} />
                        </Suspense>
                    </Canvas >
                </div>
            </div>
        </div>
    );
};

export default App; 