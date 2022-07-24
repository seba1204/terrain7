import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import './App.css';
import Controls from "./components/Controls";
import GUI from "./components/GUI";
import Scene from "./components/Scene";

import defaultSettings from "./constants/defaultSettings.json";

const App = () => {
    const [settings, setSettings] = useState(defaultSettings);

    const updateSettings = (newSettings) => {
        setSettings({ ...settings, ...newSettings });
    };

    return (
        <div className="container">
            <div className="body">
                <div className="sidebar panel">
                    <GUI
                        onSettingChange={updateSettings}
                        {...settings}
                    />
                </div>
                <div className="content panel">
                    {/* enable preserveDrawingBuffer for screenshot */}
                    <Canvas camera={{ zoom: 30, position: [0, 0, 500] }} gl={{ antialias: true, preserveDrawingBuffer: false }}>
                        <Suspense>
                            <Controls />
                            <Scene {...settings} />
                        </Suspense>
                    </Canvas >
                </div>
            </div>
        </div>
    );
};

export default App; 