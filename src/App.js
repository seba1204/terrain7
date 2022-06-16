import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Controls from "./components/Controls";
import Scene from "./components/Scene";

const App = () => {
    return (
        <Canvas camera={{ zoom: 30, position: [0, 0, 500] }}>
            <Suspense>
                <Controls />
                <Scene />
            </Suspense>
        </Canvas>
    );
};

export default App; 