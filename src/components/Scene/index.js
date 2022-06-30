
import React from "react";
import Lights from './Lights';
import Terrain from './Terrain';


const Scene = ({ brushSize, brushIntensity, terrainSize, wireFrame }) => {

    return (
        <>
            <Lights />
            <Terrain brushSize={brushSize} brushIntensity={brushIntensity} terrainSize={terrainSize} wireFrame={wireFrame} />
            {/* <Tree position={[10, 0, 0]} /> */}
        </>
    );
};

export default Scene;
