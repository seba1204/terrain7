import { Canvas } from "@react-three/fiber";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import './App.css';
import Controls, { ControlContext } from "./components/Controls";
import GUI from "./components/GUI";
import Scene from "./components/Scene";


import defaultSettings from "./constants/defaultSettings.json";

const App = () => {
    const [settings, setSettings] = useState(defaultSettings);
    const [keys, setKeys] = useState([]);
    const [buttons, setButtons] = useState([]);

    const updateSettings = (newSettings) => {
        setSettings({ ...settings, ...newSettings });
    };

    const addKey = useCallback((e) => {
        if (e.repeat) return;
        setKeys(prevKeys => [...prevKeys, e.keyCode]);
    }, []);

    const removeKey = useCallback((e) => {
        setKeys(prevKeys => prevKeys.filter((key) => key !== e.keyCode));
    }, []);

    const addButton = useCallback((e) => {
        if (e.repeat) return;
        setButtons(prevButtons => [...prevButtons, e.buttons]);
    }, []);

    const removeButton = useCallback((e) => {
        if (e.repeat) return;
        setButtons(prevButtons => prevButtons.filter((b) => b !== e.buttons));
    }, []);


    useEffect(() => {
        window.addEventListener("keydown", addKey);
        window.addEventListener("keyup", removeKey);
        window.addEventListener("mousedown", addButton);
        window.addEventListener("mouseup", removeButton);
    });

    return (
        <div className="container">
            <div className="body">
                {/* <div className="toolbar panel">
                    <ToolBar />
                </div> */}
                <div className="sidebar panel">
                    <GUI
                        onSettingChange={updateSettings}
                        {...settings}
                    />
                </div>
                <div className="content panel">
                    {/* enable preserveDrawingBuffer for screenshot */}
                    <Canvas
                        camera={{ zoom: 20, position: [0, 0, 300] }}
                        gl={{ antialias: true, preserveDrawingBuffer: true }}
                    >
                        <Suspense>
                            <ControlContext.Provider value={{ keys, buttons }}>
                                <Controls />
                                <Scene {...settings} />
                            </ControlContext.Provider>
                        </Suspense>
                    </Canvas >
                </div>
            </div>
        </div>
    );
};

export default App; 