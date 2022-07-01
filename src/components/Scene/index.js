
import React from "react";
import Lights from './Lights';
import Terrain from './Terrain';
// import Tree from './Tree';


const Scene = ({ brushSize, brushIntensity, terrainSize, wireFrame, currentTool }) => {

    return (
        <>
            <Lights />
            <Terrain brushSize={brushSize} brushIntensity={brushIntensity} terrainSize={terrainSize} wireFrame={wireFrame} currentTool={currentTool} />
            {/* <Tree position={[10, 0, 0]} /> */}
        </>
    );
};

export default Scene;
